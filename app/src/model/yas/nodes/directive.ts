import { CompilationToken, ICompilationNode, CompilationError } from '../../interfaces/ICompiler'
import { stringToNumber, numberToByteArray } from '../../integers'
import { createObjectLine } from '../yas'

export enum DirectiveType {
    POS,
    ALIGN,
    LONG,
}

export class Directive extends CompilationToken implements ICompilationNode {
    type : DirectiveType
    value : string
    comment = ""

    constructor(type : DirectiveType, value : string, line : number) {
        super(line)
        this.type = type
        this.value = value
    }

    toCode(ctx : any) : () => string {
        const currentVaddr = ctx.vaddr

        try {
            let value = stringToNumber(this.value)

            switch(this.type) {
                case DirectiveType.ALIGN: {
                    if(value < 1) {
                        throw "Alignement value must be higher than 1"
                    }
                    while(ctx.vaddr % value != 0) {
                        ctx.vaddr++
                    }
                    return() => {
                        return createObjectLine(currentVaddr, [], '.align ' + this.value + ' ' + this.comment)
                    }
                    break;
                }
                case DirectiveType.LONG: {
                    const bytes = numberToByteArray(stringToNumber(this.value), ctx.wordSize, true)
                    ctx.vaddr += bytes.length
    
                    return () => {
                        return createObjectLine(currentVaddr, bytes, ".long " + this.value + ' ' + this.comment)
                    }
                    break;
                }
                case DirectiveType.POS: {
                    if(value < 0) {
                        throw "An address is expected to be positive"
                    }
                    ctx.vaddr = value
                    return () => {
                        return createObjectLine(currentVaddr, [], ".pos " + this.value + ' ' + this.comment)
                    }
                    break;
                }
                default:
                    throw "The given directive does not exist"
            }
        } catch (error) {
            if(error instanceof CompilationError) {
                throw error
            } else {
                throw new CompilationError(this.line, error)
            }
        }
    }
}