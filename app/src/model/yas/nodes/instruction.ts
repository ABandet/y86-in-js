import { CompilationToken, ICompilationNode, CompilationError } from '../../interfaces/ICompiler'
import { Instruction, InstructionArgType } from '../../instructionSet'
import { stringToNumber, numberToByteArray } from '../../integers'
import { createObjectLine } from '../yas'
import { YasNode } from './yasNode'

const REG_POSITION = 1
const VALC_POSITION = REG_POSITION + 1

export class InstructionLine extends YasNode {
    name : string
    args : string[]

    constructor(name : string, args : string[] = [], line : number) {
        super(line)
        this.name = name
        this.args = args
    }

    evaluate(ctx : any) : () => void {
        try{
            if(!ctx.instructionSet.getHandle().has(this.name)) {
                throw "The instruction '" + this.name + "' does not exist"
            }
            const instruction = ctx.instructionSet.getHandle().get(this.name) as Instruction
    
            if(instruction.args.length != this.args.length) {
                throw "The instruction expects " + instruction.args.length + " arguments"
            }
            
            this.statementAsText = this._getRepresentation(instruction)
            this.vaddr = ctx.vaddr
            ctx.vaddr += instruction.length

            return () => {
                let sizeInBytes = 1
                sizeInBytes += instruction.useRegisters ? 1 : 0
                sizeInBytes += instruction.useValC ? ctx.wordSize : 0
                
                this.instructionBytes = new Array<number>(0)
                
                for(let i = 0; i < sizeInBytes; i++) {
                    this.instructionBytes.push(0)
                }

                this.instructionBytes[0] |= instruction.icode << 4
                this.instructionBytes[0] |= instruction.ifun

                if(instruction.useRegisters) {
                    this.instructionBytes[REG_POSITION] = 0xff
                }

                let oneRegisterAlreadyWritten = false

                instruction.args.forEach((arg, index) => {
                    const userArg = this.args[index]

                    switch(arg.type) {
                        case InstructionArgType.REG: {
                            this._processRegister(ctx, this.instructionBytes, userArg, oneRegisterAlreadyWritten)
                            oneRegisterAlreadyWritten = true
                            break
                        }
                        case InstructionArgType.MEM: {
                            this._processMem(ctx, this.instructionBytes, userArg)
                            oneRegisterAlreadyWritten = true
                            break
                        }
                        case InstructionArgType.LABEL: {
                            this._processLabel(ctx, this.instructionBytes, userArg)
                            break
                        }
                        case InstructionArgType.CONST: {
                            this._processConst(ctx, this.instructionBytes, userArg)
                            break
                        }
                        default: {

                        }
                    }
                })
            }

            // return () : string => {
            //     let instructionBytes = new Array<number>(instruction.length) // Hold icode/ifun by default
            //     instructionBytes[0] = instruction.icode << 4
            //     instructionBytes[0] |= instruction.ifun
            //     let isRegisterAlreadyWritten = false

            //     orderedIndexes.forEach((argIndex) => {
            //         const argTemplate = instruction.args[argIndex]
            //         const userArg = this.args[argIndex]
                    
            //         switch(argTemplate.type) {
            //             case InstructionArgType.CONST: {
            //                 let value = 0
            //                 if(Number.isNaN(Number(userArg))) {
            //                     if(!ctx.labels.has(userArg)) {
            //                         new CompilationError(this.line, "The label '" + userArg + "' does not exist")
            //                     }
            //                     value = ctx.labels.get(userArg) as number
            //                 } else {
            //                     value = stringToNumber(userArg)
            //                 }
            //                 const bytes = numberToByteArray(value, argTemplate.length, true)
            //                 instructionBytes = instructionBytes.concat(bytes)
            //                 break;
            //             }
            //             case InstructionArgType.LABEL: {
            //                 if(!ctx.labels.has(userArg)) {
            //                     throw new CompilationError(this.line,"The label '" + userArg + "' does not exist")
            //                 }
            //                 const bytes = numberToByteArray(ctx.labels.get(userArg) as number, argTemplate.length, true)
            //                 instructionBytes = instructionBytes.concat(bytes)
            //                 break;
            //             }
            //             case InstructionArgType.MEM: {
            //                 const value = stringToNumber(userArg)
            //                 if(value < 0) {
            //                     throw new CompilationError(this.line,"A memory address must be positive")
            //                 }
            //                 const bytes = numberToByteArray(value, argTemplate.length, true)
            //                 instructionBytes = instructionBytes.concat(bytes)
            //                 break;
            //             }
            //             case InstructionArgType.REG: {
            //                 if(!ctx.registersEnum.hasOwnProperty(userArg)) {
            //                     throw new CompilationError(this.line,"Register '" + userArg + "' does not exist")
            //                 }
            //                 let value = ctx.registersEnum[userArg] as number 

            //                 if(!isRegisterAlreadyWritten) {
            //                     instructionBytes.push(0xff)
            //                     isRegisterAlreadyWritten = true
            //                 }
                            
            //                 if(argTemplate.length == 1) {
            //                     value <<= 4
            //                     value |= 0xf
            //                 } else {
            //                     value |= 0xf0
            //                 }

            //                 instructionBytes[instructionBytes.length - 1] &= value
            //                 break;
            //             }
            //             default:
            //                 throw new CompilationError(this.line,"Unknown argument type")
            //         }
            //     })

                //return// createObjectLine(currentVaddr, instructionBytes, this._getRepresentation(instruction) + ' ' + this.comment)
            //}

        } catch(error) {
            if(error instanceof CompilationError) {
                throw error
            } else {
                throw new CompilationError(this.line, error)
            }
        }
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

    private _processConst(ctx : any, instructionBytes : Array<number>, userArg : string) {
        let value = 0
        
        if(Number.isNaN(Number(userArg))) {
            if(!ctx.labels.has(userArg)) {
                new CompilationError(this.line, "The label '" + userArg + "' does not exist")
            }
            value = ctx.labels.get(userArg) as number
        } else {
            value = stringToNumber(userArg)
        }

        const bytes = numberToByteArray(value, ctx.wordSize, true)
        bytes.forEach((byte, index) => {
            instructionBytes[VALC_POSITION + index] = byte
        })
    }

    private _processLabel(ctx : any, instructionBytes : Array<number>, userArg : string) {
        if(!ctx.labels.has(userArg)) {
            throw new CompilationError(this.line,"The label '" + userArg + "' does not exist")
        }
        const bytes = numberToByteArray(ctx.labels.get(userArg) as number, ctx.wordSize, true)
        bytes.forEach((byte, index) => {
            instructionBytes[VALC_POSITION + index] = byte
        })
    }

    private _processMem(ctx : any, instructionBytes : Array<number>, userArg : string) {
        const value = stringToNumber(userArg)
        if(value < 0) {
            throw new CompilationError(this.line,"A memory address must be positive")
        }
        const bytes = numberToByteArray(value, ctx.wordSize, true)
        bytes.forEach((byte, index) => {
            instructionBytes[VALC_POSITION + index] = byte
        })
    }

    private _processRegister(ctx : any, instructionBytes : Array<number>, userArg : string, oneRegisterAlreadyWritten : boolean) {
        if(!ctx.registersEnum.hasOwnProperty(userArg)) {
            throw new CompilationError(this.line, "Register '" + userArg + "' does not exist")
        }
        let registerID = ctx.registersEnum[userArg] as number 
        
        if(oneRegisterAlreadyWritten) {
            registerID <<= 4
            registerID |= 0x0f
        } else {
            registerID |= 0xf0
        }

        instructionBytes[REG_POSITION] &= registerID
    }
}
