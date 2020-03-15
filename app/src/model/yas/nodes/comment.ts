import { CompilationToken, ICompilationNode } from '../../interfaces/ICompiler'
import { createEmptyObjectLine } from '../yas'

export class Comment extends CompilationToken implements ICompilationNode {
    comment : string

    constructor(comment : string, line : number) {
        super(line)
        this.comment = comment
    }

    evaluate(ctx : any) : () => string {
        return () => { return createEmptyObjectLine(this.comment) }
    }
}