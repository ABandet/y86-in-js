%parse-param data

/* lexical grammar */
%lex
%%

/**
 * https://stackoverflow.com/questions/37550567/how-to-detect-new-line-in-jison
 * Used to make the new line tokens work.
 */
\n                          return 'NEW_LINE'
[^\S\n]+                    /* ignore whitespace other than newlines */

[ \r\t\f]                   /* ignore */
\#[^\n]+                     return 'COMMENT'
":"                         return 'COLON'
"("                         return 'LPAREN'
")"                         return 'RPAREN'
(0x[0-9a-fA-F]+)|(\-?[0-9]+) return 'NUMBER'
\.[0-9a-zA-Z_]+           return 'DIRECTIVE'
\%([a-z]+)                 return 'REGISTER'
","                          return 'COMMA'
<<EOF>>                     return 'EOF'
[^\ ,:\n#\.]+                  return 'IDENTIFIER'
.                           return 'INVALID'

/lex

%start document

%% /* language grammar */

document
    : line_list EOF
    ;

line_list
    : line
    | line line_list
    ;

line
    : labelized_statement comment NEW_LINE
        { 
            $$ = new data.Line(@1.first_line, $1, $2)
            data.out.push($$)
        }
    | statement comment NEW_LINE
        { 
            $$ = new data.Line(@1.first_line, [$1], $2)
            data.out.push($$)
        }
    | comment NEW_LINE
        { 
            $$ = new data.Line(@1.first_line, [], $1)
            data.out.push($$)
        }
    ;

labelized_statement
    : label statement
        {
            $$ = []
            $$.push($1)
            $$.push($2)
        }
    | label
        {
            $$ = []
            $$.push($1)
        }
    ;

statement
    : directive
        { $$ = $1 }
    | instruction
        { $$ = $1 }
    ;

label
    : IDENTIFIER COLON
        { $$ = new data.Label($1, @1.first_line) }
    ;

directive
    : DIRECTIVE NUMBER
        { $$ = new data.Directive($1.substr(1), $2, @1.first_line) }
    ;

instruction
    : IDENTIFIER arg_list
        { $$ = new data.InstructionLine($1, $2, @1.first_line) }
    ;

arg_list
    : arg
        {
            $$ = []
            $$.push($1)
        }
    | arg_list COMMA arg
        {
            $$ = $1
            $$.push($3)
        }
    | { $$ = [] }
    ;

arg
    : IDENTIFIER
        { $$ = $1 }
    | NUMBER
        { $$ = $1 }
    | register
        { $$ = $1}
    | addressFromRegister 
        { $$ = $1 }
    ;

addressFromRegister
    : LPAREN register RPAREN
        { $$ = new data.AddressFromRegister($2) }
    | NUMBER LPAREN register RPAREN
        { $$ = new data.AddressFromRegister($3, $1) }
    ;

register
    : REGISTER
        { $$ = $1.substring(1, $1.length) }
    ;

comment
    : COMMENT
        { $$ = $1 }
    | 
        { $$ = '' }
    ;