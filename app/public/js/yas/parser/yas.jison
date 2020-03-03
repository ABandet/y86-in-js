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
    : expression_list EOF
    ;

expression_list
    : expression
    | expression expression_list
    ;

expression
    : statement NEW_LINE
        { 
            data.line++ 
            data.out.push($1)
        }
    | NEW_LINE
        { 
            data.line++ 
            data.out.push(undefined)
        }
    ;

statement
    : label
        { $$ = $1 }
    | directive
        { $$ = $1 }
    | instruction
        { $$ = $1 }
    ;

label
    : IDENTIFIER COLON
        { $$ = new data.Label($1, $1.last_line) }
    ;

directive
    : D_POS NUMBER
        { $$ = new data.Directive(data.DirectiveType.POS, $2, data.line) }
    | D_ALIGN NUMBER
        { $$ = new data.Directive(data.DirectiveType.ALIGN, $2, data.line) }
    | D_LONG NUMBER
        { $$ = new data.Directive(data.DirectiveType.LONG, $2, data.line) }
    ;

instruction
    : IDENTIFIER arg_list
        { $$ = new data.InstructionLine($1, $2, data.line) }
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
