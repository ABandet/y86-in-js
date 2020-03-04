import { CompilationToken, ICompilationNode, CompilationError } from '../../interfaces/ICompiler'
import { Instruction, InstructionArgType } from '../../instructionSet'
import { stringToNumber, numberToByteArray } from '../../integers'
import { createObjectLine } from '../yas'

export class InstructionLine extends CompilationToken implements ICompilationNode {
    name : string
    args : string[]
    comment = ""

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

                return createObjectLine(currentVaddr, instructionBytes, this._getRepresentation(instruction) + ' ' + this.comment)
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
