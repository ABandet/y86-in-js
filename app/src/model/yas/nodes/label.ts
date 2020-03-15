import { ICompilationNode } from '../../interfaces/ICompiler'
import { createObjectLine } from '../yas'
import { YasNode } from './yasNode'

export class Label extends YasNode {
    name : string 

    constructor(name : string, line : number) {
        super(line)
        this.name = name
    }

    evaluate(ctx : any) : () => void {
        const currentVaddr = ctx.vaddr
        ctx.labels.set(this.name, currentVaddr)

        return () => {
            this.vaddr = currentVaddr
            this.instructionBytes = []
            this.statementAsText = this.name + ': '
        }
    }
}