import { ICompiler, CompilationResult, CompilationError } from "./interfaces/ICompiler";
import * as parser from "./yasParser";

export class Yas implements ICompiler {
    registersEnum : any
    instructionSet : any

    constructor(registersEnum : any, instructionSet : any) {
        this.registersEnum = registersEnum
        this.instructionSet = instructionSet
    }

    assemble(src: string): CompilationResult {
        let result = new CompilationResult()

        try {
            result.output = parser.parse(src, {
                registers: this.registersEnum, 
                instructionSet: this.instructionSet,
            })
        } catch(error) {
            result.errors.push(new CompilationError(0, error));
        }

        return result
    }
}