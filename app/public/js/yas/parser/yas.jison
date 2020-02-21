/* Code used when parsing. Grammar is below. */
%{
    const ADDR_INSTR_SIZE = 23

    function pushInList(postEvaluatedValue, line) {
        yasUtility.list.push({
            addr = yasUtility.virtualAddress,
            postEvaluatedValue = postEvaluatedValue,
            line = line
        }) 
    }
%}

/* lexical grammar */
%lex
%%

\s+                         /* skip whitespace */
[ \r\t\f]               
[\n]                        { yasUtility.lineNumber += 1 }
#.*\n                       /* skip comments   */
":"                         return 'COLON'
(0x[0-9a-fA-F]+)|(\-?[0-9]+) return 'NUMBER'
\.pos                       return 'D_POS'
\.align                     return 'D_ALIGN'
\.long                      return 'D_LONG'
\%[a-b]+                    return 'REGISTER'
\,                          return 'COMMA'
[^\ ,:]+                    return 'IDENTIFIER'
<<EOF>>                     return 'EOF'
.                           return "INVALID"

/lex

%start expression

%% /* language grammar */

expression
    : expression label NEW_LINE
    | expression directive NEW_LINE
    | expression instruction NEW_LINE
    | expression EOF
        {
            // Here we post evaluate things
            const list = yasUtility.list
            let output = ""

            list.forEach((item) => {
                output += item.addr + ": " + item.postEvaluatedValue() + " | " + item.line + "\n"
            })

            $$ = output
            return output
        }
    ;

label
    : IDENTIFIER COLON
        {
            const address = yasUtility.virtualAddress
            const name = $1
            yasUtility.labelsMap[name] = address
            pushInList(() => { return "" }, $1  + $2)
        }
    ;

directive
    : D_POS NUMBER NEW_LINE
        { 
            pushInList(() => { return "" }, $1 + " " + $2)

            yasUtility.virtualAddress = parseInt($2)
        }
    | D_ALIGN NUMBER
        {
            pushInList(() => { return "" }, $1 + " " + $2)

            let vaddr = yasUtility.virtualAddress
            const align = $2

            while(vaddr % align != 0) {
                const oldVaddr = vaddr
                vaddr += 1
                if(vaddr < oldVaddr) { // Overflow
                    throw "yas : Error on line " + yasUtility.lineNumber
                }
                vaddr = va
            }
            yasUtility.virtualAddress = vaddr
        }
    | D_LONG NUMBER
        {
            const value = parseInt($2).toString(16)
            pushInList(() => { return value },
                       $1 + " " + $2)

            yasUtility.virtualAddress += 4
        }
    ;

instruction
    : IDENTIFIER arg_list
        {
            const instruction = $1
            const argList = $2

            if(!yasUtility.instructionSet.hasOwnProperty(instruction)) {
                throw "yas : line " + lineNumber + " : the instruction " + instruction + " does not exist"
            }

            argList.forEach((item) => {
                if(item.type === "constant") {
                    
                }
            })
            pushInList(() => {
                () => { }
            },
            $1 + " " + $2);

            yasUtility.virtualAddress += 6 // TODO
        }
    ;

arg_list
    : arg
    | arg_list COMMA arg
    ;

arg
    : IDENTIFIER
        { 
            const name = $1
            $$ = []
            $$.push({
                type = "label",
                value = () => { return yasUtility.labelsMap[name] },
            })
        }
    | NUMBER
        { 
            $$ = []
            $$.push({
                type = "constant",
                value = parseInt($1).toString(16),
            })
        }
    | REGISTER
        { 
            $$ = []
            $$.push({
                type = "register",
                value = yasUtility.registers[$1],
            })
        }
    ;
