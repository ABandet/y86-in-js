/*
 * The following variables are used by the parser.
 * They've been instanciated here because their values are not 
 * reset if we call the parse function many times.
 * They must not be accessed from outside of these script.
 * ---
 * It is the only fix found at the moment to avoid the problem.
 */

let quoteList = [] 
    
let intsigs = [] // Pairs intsig <-> value
let boolsigs = [] // Pairs boolsig <-> value

let intDefinitions = [] // Pairs int function <-> instruction list 
let boolDefinitions = [] // Pairs bool function <-> instruction

function hcl2js(hclCode) {
    cleanParser()
    let jsCode = hcl2jsParser.parse(hclCode);
    return jsCode
}

function cleanParser() {
    quoteList       = []
    intsigs         = []
    boolsigs        = []
    intDefinitions  = []
    boolDefinitions = []
}