%parse-param data

/* lexical grammar */
%lex
%%

\n\s*                       return 'NEW_LINE';
[^\S\n]+                    /* ignore whitespace other than newlines */
[ \r\t\f]               
\#.*\n                       /* skip comments   */
":"                         return 'COLON'
(0x[0-9a-fA-F]+)|(\-?[0-9]+) return 'NUMBER'
\.pos                      return 'D_POS'
\.align                     return 'D_ALIGN'
\.long                      return 'D_LONG'
\%([a-z]+)                 return 'REGISTER'
","                          return 'COMMA'
<<EOF>>                     return 'EOF'
[^\ ,:\n]+                  return 'IDENTIFIER'
.                           return 'INVALID'

/lex

%start final_expression

%% /* language grammar */

final_expression
    : tmp_expression EOF
    | NEW_LINE final_expression
    ;

tmp_expression
    : label NEW_LINE
    | directive NEW_LINE
    | instruction NEW_LINE
    | label NEW_LINE tmp_expression
    | directive NEW_LINE tmp_expression
    | instruction NEW_LINE tmp_expression
    ;

label
    : IDENTIFIER COLON
        {
            console.log("label ===> " + $1)
            data.out.push(new data.Label($1, $1.last_line))
        }
    ;

directive
    : D_POS NUMBER
        { 
            console.log(".pos ===> " + $2)
            data.out.push(new data.Directive(data.DirectiveType.POS, $2, $1.last_line))
        }
    | D_ALIGN NUMBER
        {
            console.log(".align ===> " + $2)
            data.out.push(new data.Directive(data.DirectiveType.ALIGN, $2, $1.last_line))
        }
    | D_LONG NUMBER
        {
            console.log(".long ===> " + $2)
            data.out.push(new data.Directive(data.DirectiveType.LONG, $2, $1.last_line))
        }
    ;

instruction
    : IDENTIFIER arg_list
        {
            console.log("instr ===> " + $1)
            data.out.push(new data.InstructionLine($1, $2, $1.last_line))
        }
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
    ;

arg
    : IDENTIFIER
        { 
            $$ = $1
        }
    | NUMBER
        { 
            $$ = $1
        }
    | REGISTER
        { 
            $$ = $1.substring(1, $1.length)
        }
    ;
