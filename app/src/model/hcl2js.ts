import { ICompiler, CompilationResult, CompilationError } from "./interfaces/ICompiler";
import * as hclParser from "./hcl2jsParser"

export class Hcl2js implements ICompiler {
    
    assemble(src: string): CompilationResult {
        let result = new CompilationResult()

        try {
            (<any>hclParser.parser.yy).parseError = (msg : string, hash : any) => {
                throw new CompilationError(hash.line, msg)
            };
            result.output = hclParser.parse(src, {
                line: 1,
                quoteList: [],
                intsigs: [],
                boolsigs: [],
                intDefinitions: [],
                boolDefinitions: [],
                identifiersList: [],
                CompilationError: CompilationError
            })
        } catch(error) {
            if(error instanceof CompilationError) {
                result.errors.push(error);
            } else {
                console.log(error)
                throw new Error("An unknown error happened when parsing in hcl2js : " + error)
            }
        }

        return result
    }
    
}