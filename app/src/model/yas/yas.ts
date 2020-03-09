import { ICompiler, CompilationResult, CompilationError, isCompilationNode } from "../interfaces/ICompiler";
import * as yasParser from "../yasParser";
import { IInstructionSet } from "../interfaces/IInstructionSet";
import { InstructionLine } from "./nodes/instruction";
import { DirectiveType, Directive } from "./nodes/directive";
import { Label } from "./nodes/label";
import { Comment } from './nodes/comment'

export class Yas implements ICompiler {
    registersEnum: any
    instructionSet: IInstructionSet
    wordSize : number
    
    parserOutput : any[] = []

    constructor(registersEnum: any, instructionSet: IInstructionSet, wordSize : number) {
        this.registersEnum = registersEnum
        this.instructionSet = instructionSet
        this.wordSize = wordSize
    }

    assemble(src: string): CompilationResult {
        let result = new CompilationResult()
        this.parserOutput = []

        try {
            (<any>yasParser.parser.yy).parseError = (msg : string, hash : any) => {
                throw new CompilationError(hash.line, msg)
            };
            yasParser.parse(src, {
                out: this.parserOutput,
                CompilationError: CompilationError,
                InstructionLine: InstructionLine,
                DirectiveType: DirectiveType,
                Directive: Directive,
                Label: Label,
                Comment: Comment,
            })
            result.output = this._compile()
        } catch (error) {
            if(error instanceof CompilationError) {
                result.errors.push(error);
            } else {
                throw new Error("An unknown error happened when parsing in yas : " + error)
            }
        }

        return result
    }

    private _compile() : string {
        let compilationOutputGenerators : Array<() => string> = []
        
        let ctx = {
            vaddr : 0,
            labels: new Map(),
            compilationOutputGenerators: compilationOutputGenerators,
            registersEnum: this.registersEnum,
            instructionSet: this.instructionSet,
            wordSize: this.wordSize,
        }

        this.parserOutput.forEach((item) => {
            if(item === undefined) {
                compilationOutputGenerators.push(() => {
                    return createEmptyObjectLine()
                })
            } else if(isCompilationNode(item)) {
                compilationOutputGenerators.push(item.toCode(ctx))
            } else {
                throw new Error("An unknown type has been returned by the yas parser")
            }
        })

        let output = "\n"

        compilationOutputGenerators.forEach((generator) => {
            output += generator() + "\n"
        })

        return output
    }
}

function padStringNumber(value : string, digits : number, pad : string = '0') {
    if(pad.length === 0) {
        throw new Error("Can not pad with an empty character")
    }

    let newValue = ""
    
    while(newValue.length + value.length < digits) {
        newValue += pad
    }

    return newValue + value
}

const ADDRESS_PADDING_SIZE = 2
const MIDDLE_PADDING_SIZE = 25
const YS_PADDING_SIZE = 5

export function createObjectLine(address : number, bytes : number[], ys : string) : string {
    let output = ''

    for(let i = 0; i < ADDRESS_PADDING_SIZE; i++) {
        output += ' '
    }

    output += '0x' + padStringNumber(address.toString(16), 4, '0') + ': '
    
    bytes.forEach((byte) => {
        output += padStringNumber(byte.toString(16), 2, '0')
    })

    while(output.length < MIDDLE_PADDING_SIZE) {
        output += ' '
    }

    output += '|'

    for(let i = 0; i < YS_PADDING_SIZE; i++) {
        output += ' '
    }

    output += ys

    return output
}

export function createEmptyObjectLine(ys = '') : string {
    let output = ''

    for(let i = 0; i < MIDDLE_PADDING_SIZE; i++) {
        output += ' '
    }

    output += '|'

    for(let i = 0; i < YS_PADDING_SIZE; i++) {
        output += ' '
    }

    output += ys

    return output
}


