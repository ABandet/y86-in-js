import { ICompiler, CompilationResult, CompilationError, CompilationToken, ICompilationNode, isCompilationNode } from "./interfaces/ICompiler";
import * as yasParser from "./yasParser";
import { IInstructionSet } from "./interfaces/IInstructionSet";
import { stringToNumber, numberToByteArray, changeEndianess } from "./integers"
import { Instruction, InstructionArgType } from "./instructionSet";

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

        try {
            yasParser.parse(src, {
                out: this.parserOutput,
                line: 0,
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
                console.log(error)
                throw "An unknown error happened when parsing in yas : " + error
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

function byteArrayToString(bytes : number[], radix : number = 16) : string {
    let result = ''

    for(let i = bytes.length - 1; i >= 0; i--) {
        result += bytes[i].toString(radix)
    }

    return result
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

function createObjectLine(address : number, bytes : number[], ys : string) : string {
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

function createEmptyObjectLine(ys = '') : string {
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

class InstructionLine extends CompilationToken implements ICompilationNode {
    name : string
    args : string[]

    constructor(name : string, args : string[] = [], line : number) {
        super(line)
        this.name = name
        this.args = args
    }

    toCode(ctx : any) : () => string {
        try{
            if(!ctx.instructionSet.getHandle().has(this.name)) {
                throw "The instruction '" + this.name + "' does not exist"
            }
            const instruction = ctx.instructionSet.getHandle().get(this.name) as Instruction
    
            if(instruction.args.length != this.args.length) {
                throw "The instruction expects " + instruction.args.length + " arguments"
            }
            
            let orderedIndexes = this._getSortedArgsIndexes(instruction)

            const currentVaddr = ctx.vaddr
            ctx.vaddr += instruction.length

            return () : string => {
                let instructionBytes = new Array<number>(instruction.length) // Hold icode/ifun by default
                instructionBytes[0] = instruction.icode << 4
                instructionBytes[0] |= instruction.ifun
                let isRegisterAlreadyWritten = false

                orderedIndexes.forEach((argIndex) => {
                    const argTemplate = instruction.args[argIndex]
                    const userArg = this.args[argIndex]
                    
                    switch(argTemplate.type) {
                        case InstructionArgType.CONST: {
                            let value = 0
                            if(Number.isNaN(Number(userArg))) {
                                if(!ctx.labels.has(userArg)) {
                                    new CompilationError(this.line, "The label '" + userArg + "' does not exist")
                                }
                                value = ctx.labels.get(userArg) as number
                            } else {
                                value = stringToNumber(userArg)
                            }
                            const bytes = numberToByteArray(value, argTemplate.length, true)
                            instructionBytes = instructionBytes.concat(bytes)
                            break;
                        }
                        case InstructionArgType.LABEL: {
                            if(!ctx.labels.has(userArg)) {
                                throw new CompilationError(this.line,"The label '" + userArg + "' does not exist")
                            }
                            const bytes = numberToByteArray(ctx.labels.get(userArg) as number, argTemplate.length, true)
                            instructionBytes = instructionBytes.concat(bytes)
                            break;
                        }
                        case InstructionArgType.MEM: {
                            const value = stringToNumber(userArg)
                            if(value < 0) {
                                throw new CompilationError(this.line,"A memory address must be positive")
                            }
                            const bytes = numberToByteArray(value, argTemplate.length, true)
                            instructionBytes = instructionBytes.concat(bytes)
                            break;
                        }
                        case InstructionArgType.REG: {
                            if(!ctx.registersEnum.hasOwnProperty(userArg)) {
                                throw new CompilationError(this.line,"Register '" + userArg + "' does not exist")
                            }
                            let value = ctx.registersEnum[userArg] as number 

                            if(!isRegisterAlreadyWritten) {
                                instructionBytes.push(0xff)
                                isRegisterAlreadyWritten = true
                            }
                            
                            if(argTemplate.length == 1) {
                                value <<= 4
                                value |= 0xf
                            } else {
                                value |= 0xf0
                            }

                            instructionBytes[instructionBytes.length - 1] &= value
                            break;
                        }
                        default:
                            throw new CompilationError(this.line,"Unknown argument type")
                    }
                })

                return createObjectLine(currentVaddr, instructionBytes, this._getRepresentation(instruction))
            }

        } catch(error) {
            if(error instanceof CompilationError) {
                throw error
            } else {
                throw new CompilationError(this.line, error)
            }
        }
    }

    private _getSortedArgsIndexes(instruction : Instruction) : Array<number> {
        let orderedIndexes = new Array<number>()
        
        instruction.args.forEach((_, index) => {
            orderedIndexes.push(index) // Fill the array
        })

        orderedIndexes.sort((left : number, right : number) : number => {
            let leftArg = instruction.args[left]
            let rightArg = instruction.args[right]

            return leftArg.position - rightArg.position
        })

        return orderedIndexes
    }

    private _getRepresentation(instruction : Instruction) {
        let output = '    ' + this.name + ' '

        this.args.forEach((arg, index) => {
            const argTemplate = instruction.args[index]

            if(argTemplate.type === InstructionArgType.REG) {
                output += '%'
            }

            output += arg + ', '
        })

        const offset = this.args.length === 0 ? 0 : 2
        return output.substr(0, output.length - offset)
    }
}

enum DirectiveType {
    POS,
    ALIGN,
    LONG,
}

class Directive extends CompilationToken implements ICompilationNode {
    type : DirectiveType
    value : string

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
                    while(ctx.vaddr % value != 0) {
                        ctx.vaddr++
                    }
                    return() => {
                        return createObjectLine(currentVaddr, [], '.align ' + this.value)
                    }
                    break;
                }
                case DirectiveType.LONG: {
                    const bytes = numberToByteArray(stringToNumber(this.value), ctx.wordSize, true)
                    ctx.vaddr += bytes.length
    
                    return () => {
                        return createObjectLine(currentVaddr, bytes, ".long " + this.value)
                    }
                    break;
                }
                case DirectiveType.POS: {
                    if(value < 0) {
                        throw this.line, "An address is expected to be positive"
                    }
                    ctx.vaddr = value
                    return () => {
                        return createObjectLine(currentVaddr, [], ".pos " + this.value)
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

class Label extends CompilationToken implements ICompilationNode {
    name : string 

    constructor(name : string, line : number) {
        super(line)
        this.name = name
    }

    toCode(ctx : any) : () => string {
        const currentVaddr = ctx.vaddr
        ctx.labels.set(this.name, currentVaddr)

        return () => {
            return createObjectLine(currentVaddr, [], this.name + ':')
        }
    }
}

class Comment extends CompilationToken implements ICompilationNode {
    comment : string

    constructor(comment : string, line : number) {
        super(line)
        this.comment = comment
    }

    toCode(ctx : any) : () => string {
        return () => { return createEmptyObjectLine(this.comment) }
    }
}