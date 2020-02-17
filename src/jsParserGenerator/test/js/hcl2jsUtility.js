/*
 * The following variables are used by the parser.
 * They've been instanciated here because their values are not
 * reset if we call the parse function many times.
 * They must not be accessed from outside of these script.
 * ---
 * It is the only fix found at the moment to avoid the problem.
 */
let hcl2jsUtility = new function() {
  this.quoteList = [];

  this.intsigs = []; // Pairs intsig <-> value
  this.boolsigs = []; // Pairs boolsig <-> value

  this.intDefinitions = []; // Pairs int function <-> instruction list
  this.boolDefinitions = []; // Pairs bool function <-> instruction

  this.identifiersList = [];

  this.cleanParser = function() {
    this.quoteList = [];
    this.intsigs = [];
    this.boolsigs = [];
    this.intDefinitions = [];
    this.boolDefinitions = [];
    this.identifiersList = [];
  }
};

function hcl2js(hclCode) {
  hcl2jsUtility.cleanParser()
  let jsCode = hcl2jsParser.parse(hclCode);
  return jsCode;
}
