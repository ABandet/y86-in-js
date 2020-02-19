export { assemble }

function assemble(raw : string) : YasResult {
    let result = new YasResult()

    return result
}

class YasResult {
    objectCode = ""
    errors : YasError[] = []
}

class YasError {
    line    : number
    message : string

    constructor(line : number, message : string) {
        this.line = line
        this.message = message
    }
}