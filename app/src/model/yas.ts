import { ICompiler, CompilationResult, CompilationError, CompilationToken } from "./interfaces/ICompiler";
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
                CompilationError: CompilationError,
                InstructionLine: InstructionLine,
                DirectiveType: DirectiveType,
                Directive: Directive,
                Label: Label
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

    private _vaddr : number = 0
    private _labels : Map<string, number> = new Map()
    private _compilationOutputGenerators : Array<() => string> = []

    private _compile() : string {
        this._vaddr = 0
        this._labels = new Map()

        this.parserOutput.forEach((item) => {
            if(item instanceof InstructionLine) {
                this._compileInstruction(item)
            } else if(item instanceof Directive) {
                this._compileDirective(item)
            } else if(item instanceof Label) {
                this._compileLabel(item)
            } else if(item instanceof CompilationToken) {
                throw new CompilationError(item.line, "Failed to parse this line. Not recognized as instruction, directive or label")
            } else {
                throw "An unexpected type was given to yas"
            }
        })

        let output = ""

        this._compilationOutputGenerators.forEach((generator) => {
            output += generator()
        })

        return output
    }

    private _compileInstruction(instructionLine : InstructionLine) {
        try{
            if(!this.instructionSet.getHandle().has(instructionLine.name)) {
                throw "The instruction '" + instructionLine.name + "' does not exist"
            }
            const instruction = this.instructionSet.getHandle().get(instructionLine.name) as Instruction
    
            if(instruction.args.length != instructionLine.args.length) {
                throw "The instruction expects " + instruction.args.length + " arguments"
            }
            
            let orderedIndexes = new Array<number>()
            instruction.args.forEach((_, index) => {
                orderedIndexes.push(index) // Fill the array
            })
            orderedIndexes.sort((left : number, right : number) : number => {
                let leftArg = instruction.args[left]
                let rightArg = instruction.args[right]

                if(leftArg.position < rightArg.position) {
                    return left
                } else if(leftArg.position === rightArg.position &&
                          leftArg.type === rightArg.type && leftArg.type === InstructionArgType.REG) {
                    if(leftArg.length === rightArg.length) {
                        throw "InstructionSet : Both registers have the same inner position (" + leftArg.length + ")"
                    }
                    return leftArg.length < rightArg.length ? left : right
                } else if (leftArg.position > rightArg.position) {
                    return right
                }
                throw "Two arguments share the same position but are not registers"
            })

            const argsValues = orderedIndexes.map((argIndex) : () => string => {
                const argTemplate = instruction.args[argIndex]
                const userArg = instructionLine.args[argIndex]
            
                switch(argTemplate.type) {
                    case InstructionArgType.CONST: {
                        return () => { 
                            // TODO : add checks
                            const value = this._labels.has(userArg) ? this._labels.get(userArg) as number : stringToNumber(userArg)
                            const bytes = numberToByteArray(value, argTemplate.length, true).reverse()
                            return padString(byteArrayToString(bytes), this.wordSize * 2) 
                        }
                        break;
                    }
                    case InstructionArgType.LABEL: {
                        return () => {
                            if(!this._labels.has(userArg)) {
                                throw "The label '" + userArg + "' does not exist"
                            }
                            const bytes = numberToByteArray(this._labels.get(userArg) as number, argTemplate.length, true).reverse()
                            return padString(byteArrayToString(bytes), this.wordSize * 2)
                        }
                        break;
                    }
                    case InstructionArgType.MEM: {
                        const value = stringToNumber(userArg)
                        if(value < 0) {
                            throw "A memory address must be positive"
                        }
                        const bytes = numberToByteArray(value).reverse()
                        return () => { return padString(byteArrayToString(bytes), this.wordSize * 2) }
                        break;
                    }
                    case InstructionArgType.REG: {
                        if(!this.registersEnum.hasOwnProperty(userArg)) {
                            throw "Register '" + userArg + "' does not exist"
                        }
                        const value = this.registersEnum[userArg] as number
                        return () => { return value.toString(16) }
                        break;
                    }
                    default:
                        throw "Unknown argument type"
                }
            })
            
            const currentVaddr = this._vaddr
            this._compilationOutputGenerators.push(() : string => {
                let output = currentVaddr.toString(16) + ": "
                argsValues.forEach((fct) => {
                    output += fct()
                })
                return output + " |\n"
            })
            this._vaddr += instruction.length

        } catch(error) {
            if(error instanceof CompilationError) {
                throw error
            } else {
                throw new CompilationError(instructionLine.line, error)
            }
        }
    }

    private _compileDirective(directive : Directive) {
        const currentVaddr = this._vaddr

        try {
            let value = stringToNumber(directive.value)

            switch(directive.type) {
                case DirectiveType.ALIGN: {
                    this._compilationOutputGenerators.push(() => {
                        return currentVaddr.toString(16) + ": |\n"
                    })
                    while(this._vaddr % value != 0) {
                        this._vaddr++
                    }
                    break;
                }
                case DirectiveType.LONG: {
                    const bytes = numberToByteArray(stringToNumber(directive.value), this.wordSize, true).reverse()
                    this._vaddr += bytes.length
    
                    this._compilationOutputGenerators.push(() => {
                        let str = currentVaddr + ": "
                        bytes.forEach((byte) => {
                            str += byte.toString(16)
                        })
                        str += " |\n"
                        return str
                    })
                    break;
                }
                case DirectiveType.POS: {
                    if(value < 0) {
                        throw directive.line, "An address is expected to be positive"
                    }
                    this._vaddr = value
                    this._compilationOutputGenerators.push(() => {
                        return currentVaddr + ": |\n"
                    })
                    break;
                }
                default:
                    throw "The given directive does not exist"
            }
        } catch (error) {
            if(error instanceof CompilationError) {
                throw error
            } else {
                throw new CompilationError(directive.line, error)
            }
        }
    }

    private _compileLabel(label : Label) {
        const currentVaddr = this._vaddr
        this._labels.set(label.name, currentVaddr)

        this._compilationOutputGenerators.push(() => {
            return currentVaddr.toString(16) + ": |\n"
        })
    }
}

function byteArrayToString(bytes : number[], radix : number = 16) : string {
    let result = ''

    for(let i = bytes.length - 1; i >= 0; i--) {
        result += bytes[i].toString(radix)
    }

    return result
}

function padString(value : string, digits : number, pad : string = '0') {
    if(pad.length === 0) {
        throw new Error("Can not pad with an empty character")
    }

    let newValue = ""
    
    while(newValue.length + value.length < digits) {
        newValue += pad
    }

    return newValue + value
}

class InstructionLine extends CompilationToken {
    name : string
    args : string[]

    constructor(name : string, args : string[] = [], line : number) {
        super(line)
        this.name = name
        this.args = args
    }
}

enum DirectiveType {
    POS,
    ALIGN,
    LONG,
}

class Directive extends CompilationToken {
    type : DirectiveType
    value : string

    constructor(type : DirectiveType, value : string, line : number) {
        super(line)
        this.type = type
        this.value = value
    }
}

class Label extends CompilationToken {
    name : string 

    constructor(name : string, line : number) {
        super(line)
        this.name = name
    }
}