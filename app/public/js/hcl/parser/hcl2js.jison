%parse-param data

/* Code used when parsing. Grammar is below. */
%{
    /*
     * The parser use few variables not instanciated here.
     * Here is the needed code :
     *
     * let quoteList = [] 
     *
     * let intsigs = [] // Pairs intsig <-> value
     * let boolsigs = [] // Pairs boolsig <-> value
     *
     * let intDefinitions = [] // Pairs int function <-> instruction list 
     * let boolDefinitions = [] // Pairs bool function <-> instruction
     * 
     * In order to use the parser many times, we must be able to reset these
     * variables. The only solution found at the moment is to clean them
     * manually outside of the parser.
     */

    // Checks if both intsig and boolsig have not any
    // value associated to the given identifier
    function checkSigUnicity(identifier, data, line) {
        if(data.intsigs[identifier]) {
            throw new data.CompilationError(line, identifier + " is already declared as an intsig")
        }
        if(data.boolsigs[identifier]) {
            throw new data.CompilationError(line, identifier + " is already declared as a boolsig")
        }
    }

    // Checks if both int definitions and bool definitions have not any
    // value associated to the given identifier
    function checkDefinitionUnicity(identifier, data, line) {
        if(data.intDefinitions[identifier]) {
            throw new data.CompilationError(line, identifier + " is already defined as an int defintion")
        }
        if(data.boolDefinitions[identifier]) {
            throw new data.CompilationError(line, identifier + " is already defined as an bool defintion")
        }
    }

    // HCL strings are parsed as 'text'.
    // This function returns text, without the ' character
    // It assumes the given string is of the form 'text'.
    function cleanHclString(str) {
        return str.substring(1, str.length - 1)
    }

    function sanitizeString(str) {
        return str.replace(/"/g, "'")
    }

    // Returns a intsig or boolsig value
    // using the given identifier as key.
    // If there is no sig associated to the identifier,
    // an exception is thrown.
    function getSigValue(identifier, data, line) {
        let jsSigName

        if(data.intsigs[identifier]) {
            jsSigName = data.intsigs[identifier]
        } else if(data.boolsigs[identifier]) {
            jsSigName = data.boolsigs[identifier]
        } else {
            throw new data.CompilationError(line, identifier + " is not declared")
        }

        let finalValue = cleanHclString(jsSigName)
        data.identifiersList.push(finalValue)

        return finalValue
    }

    function generateIdentifiersVerificationJs(identifiersList, functionName) {
        if(identifiersList.length === 0) {
            return ""
        }

        jsOutput  = "   // Checks if some identifiers are undefined\n"

        identifiersList.forEach((identifier) => {
            jsOutput += "   try { if(" + identifier + " === undefined) { throw '' } } catch(e) { throw \"HCL : " 
            + sanitizeString(identifier) + " is not accessible in function '" + functionName + "'\" }\n"
        })
        jsOutput += "   // End of checks\n\n"
        
        return jsOutput
    }
%}

/* lexical grammar */
%lex
%%

\n                      /* ignore */
[^\S\n]+                /* ignore whitespace other than newlines */

[ \r\t\f]               /* ignore */              
\#[^\n]+                /* skip comments   */
quote                   return 'QUOTE'
boolsig                 return 'BOOLSIG'
bool                    return 'BOOL'
intsig                  return 'INTSIG'
int                     return 'INT'
in                      return 'IN'
"'".+?(?="'")"'"        return 'STRING'
[a-zA-Z][a-zA-Z0-9_]*   return 'IDENTIFIER'
[0-9][0-9]*             return 'P_INTEGER'
"-"[0-9][0-9]*          return 'N_INTEGER'
";"                     return 'SEMI'
":"                     return 'COLON'
","                     return 'COMMA'
"("                     return 'LPAREN'
")"                     return 'RPAREN'
"{"                     return 'LBRACE'
"}"                     return 'RBRACE'
"["                     return 'LBRACK'
"]"                     return 'RBRACK'
"&&"                    return 'BOOL_OP'
"^^"                    return 'BOOL_OP'
"||"                    return 'BOOL_OP'
"!="                    return 'COMP'
"=="                    return 'COMP'
"<"                     return 'COMP'
"<="                    return 'COMP'
">"                     return 'COMP'
">="                    return 'COMP'
"!"                     return 'NOT'
"="                     return 'ASSIGN'
<<EOF>>                 return 'EOF'
.                       return 'INVALID'

/lex

%start final_expression

%% /* language grammar */

final_expression
    : expression EOF 
        {
            /*
            * The js file is generated here in 3 steps.
            */

            let jsOutput = "new function() {\n\n"

            // Render user's quotes --- step 1
            data.quoteList.forEach(function (item) {
                jsOutput += item + "\n\n"
            })

            // Render int definitions --- step 2
            for(let name in data.intDefinitions) {
                const instrList = data.intDefinitions[name].definition
                const identifiersList = data.intDefinitions[name].identifiersList

                jsOutput += "this." + name + " = () => {\n\n"

                jsOutput += generateIdentifiersVerificationJs(identifiersList, name)

                instrList.forEach(function (instr) {
                    jsOutput += "   " + instr + "\n"
                }) 

                jsOutput += "}\n\n"
            }

            // Render bool defintions --- step 3
            for(let name in data.boolDefinitions) {
                const instr = data.boolDefinitions[name].definition
                const identifiersList = data.boolDefinitions[name].identifiersList

                jsOutput += "this." + name + " = () => {\n"
                jsOutput += generateIdentifiersVerificationJs(identifiersList, name)
                jsOutput += "   return " + instr + ";\n}\n\n"
            }

            jsOutput += "}"
            $$ = jsOutput 
            return $$
        }
    ;

expression
    : quote expression
    | declaration expression
    | definition expression
    | quote
    | declaration
    | definition
    ;

quote
    : QUOTE STRING 
        { data.quoteList.push(cleanHclString($2)) }
    ;

declaration
    : INTSIG IDENTIFIER STRING 
        { 
            checkSigUnicity($2, data, @2.first_line)
            data.intsigs[$2] = $3
        }
    | BOOLSIG IDENTIFIER STRING
        { 
            checkSigUnicity($2, data, @2.first_line)
            data.boolsigs[$2] = $3
        }
    ;

definition
    : INT IDENTIFIER ASSIGN instruction_list
        {
            checkDefinitionUnicity($2, data, @2.first_line)
            var content = {
                definition: $4,
                identifiersList: data.identifiersList,
            }
            data.intDefinitions[$2] = content

            data.identifiersList = []
        }
    | BOOL IDENTIFIER ASSIGN bool_expression SEMI
        {
            checkDefinitionUnicity($2, data, @2.first_line)
            var content = {
                definition: $4,
                identifiersList: data.identifiersList,
            }
            data.boolDefinitions[$2] = content

            data.identifiersList = []
        }
    ;

instruction_list
    : LBRACK instruction_list_rec RBRACK SEMI
        { $$ = $2 }
    | instruction
        { 
            $$ = []
            $$.push($1)
        }
    ;

instruction_list_rec
    : instruction
        { 
            $$ = []
            $$.push($1)
        }
    | instruction_list_rec instruction 
        {
            $$ = $1
            $$.push($2)
        }
    ;

instruction
    : bool_expression COLON expression SEMI
        {   
            $$ = "if(" + $1 + ") { return " + $3 + "; } \n"
        }
    | P_INTEGER COLON expression SEMI
        {   
            $$ = "if(" + $1 + ") { return " + $3 + "; } \n" 
        }
    | IDENTIFIER COLON expression SEMI
        { 
            $$ = "if(" + getSigValue($1, data, @1.first_line) + ") { return " + $3 + "; } \n" 
        }
    ;

bool_expression
    : bool_expression BOOL_OP expression
        { $$ = $1 + " " + $2 + " " + $3 }
    | bool_expression COMP expression 
        { $$ = $1 + " " + $2 + " " + $3 }
    | expression IN list
        { 
            let exp = "(" + $1 + ")"
            let list = $3
            let condition = ""
            
            let i
            for(i = 0; i < list.length; i++) {
                condition += "(" + exp + " === (" + list[i] +"))"
                if(i != list.length - 1) {
                    condition += " || "
                }
            }

            $$ = condition
        }
    | expression BOOL_OP expression
        { $$ = $1 + " " + $2 + " " + $3 }
    | expression COMP expression
        { $$ = $1 + " " + $2 + " " + $3 }
    ;

expression
    : IDENTIFIER
        { $$ = getSigValue($1, data, @1.first_line) }
    | P_INTEGER
        { $$ = $1 }
    | N_INTEGER
        { $$ = $1 }
    | LPAREN expression RPAREN
        { $$ = "(" + $2 + ")" }
    ;

list
    : LBRACE tuple RBRACE
        { 
            $$ = $2
        }
    ;

tuple
    : expression
        { 
            $$ = []
            $$.push($1)
        }
    | tuple COMMA expression
        { 
            $$ = $1
            $$.push($3)
        }
    ;
