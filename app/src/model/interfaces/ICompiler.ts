/**
 * Interface of every compilers.
 */
interface ICompiler {

    /**
     * Launch the compilation using the given src.
     * If an error occured, it will be written in the 
     * returned CompilationResult.
     * @param src The source to compile
     */
    assemble(src : string) : CompilationResult
}

/**
 * Represents the output of a compilation.
 */
class CompilationResult {
    /**
     * The compilation output.
     */
    output : string

    /**
     * List of compilation errors.
     * If the list is non empty, the output can not be
     * considered as valid.
     */
    errors : CompilationError[]

    /**
     * Potential additional data extracted during compilation
     */
    data : any

    constructor(output = "", errors = [], data = {}) {
        this.output = output
        this.errors = errors
        this.data = data
    }
}

/**
 * Represents a node created when parsing the grammar.
 */
interface ICompilationNode {
    /**
     * Evaluates the node. 
     * In case the node can not been evaluated directly, a function is returned in order to perform operations
     * later in time, after all nodes 'evaluate' functions have been called.
     * @param ctx The context given by the compiler
     */
    evaluate(ctx : any) : void;

    postEvaluate() : void;
}

function isCompilationNode(obj : any) : obj is ICompilationNode {
    return obj.constructor.prototype.hasOwnProperty('toCode')
}

/**
 * Represents an error which occured at compile-time.
 */
class CompilationError {
    /**
     * The line where the error happened.
     */
    line : number

    /**
     * A text explaining what's wrong.
     */
    message : string

    constructor(line = 0, message = "Unknown error") {
        this.line = line,
        this.message = message
    }
}

class CompilationToken {
    line    : number
    column  : number
    
    constructor(line : number, column : number = -1) {
        this.line = line
        this.column = column
    }
}

export { ICompiler, CompilationError, CompilationResult, ICompilationNode, CompilationToken, isCompilationNode }