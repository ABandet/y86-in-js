interface ICompiler {
    assemble(src : string) : CompilationResult
}

class CompilationResult {
    output : string
    errors : CompilationError[]

    constructor(output = "", errors = []) {
        this.output = output
        this.errors = errors
    }
}

class CompilationError {
    line : number
    message : string

    constructor(line = 0, message = "Unknown error") {
        this.line = line,
        this.message = message
    }
}

export { ICompiler, CompilationError, CompilationResult }