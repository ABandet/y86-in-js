import { CompilationToken, ICompilationNode } from '../../interfaces/ICompiler'
import { createObjectLine } from '../yas'

export class Label extends CompilationToken implements ICompilationNode {
    name : string 
    comment = ""

    constructor(name : string, line : number) {
        super(line)
        this.name = name
    }

    toCode(ctx : any) : () => string {
        const currentVaddr = ctx.vaddr
        ctx.labels.set(this.name, currentVaddr)

        return () => {
            return createObjectLine(currentVaddr, [], this.name + ': ' + this.comment)
        }
    }
}