import { ICompiler, CompilationResult, CompilationError } from "./interfaces/ICompiler";
import * as parser from "./hcl2jsParser"

export class Hcl2js implements ICompiler {
    
    assemble(src: string): CompilationResult {
        let result = new CompilationResult()

        try {
            result.output = parser.parse(src)
        } catch(error) {
            result.errors.push(new CompilationError(0, error));
        }

        return result
    }
    
}