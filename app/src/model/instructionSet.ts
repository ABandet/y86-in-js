import { IInstructionSet } from './interfaces/IInstructionSet'

export enum InstructionArgType {
    REG = 0,
    MEM = 1,
    CONST = 2,
}



export class InstructionArg {
    type        : InstructionArgType
    position    : number
    length      : number

    constructor(type : InstructionArgType, position : number, length : number) {
        this._checkType(type)
        this._checkPosition(position)
        this._checkLength(length, type)

        this.type = type
        this.position = position
        this.length = length
    }

    private _checkType(type : InstructionArgType) {
        for(const possibleType in InstructionArgType) {
            if(type === Number(InstructionArgType[possibleType])) {
                return
            }
        }
        throw "The given arg type does not exist"
    }

    private _checkPosition(position : number) {
        if(position < 0) {
            throw "An instruction argument position can be negative"
        }
    }

    private _checkLength(length: number, type : InstructionArgType) {
        if(length < 0 || length > Default.MAX_BYTES) {
            throw "An instruction argument must have a length in [0;" + Default.MAX_BYTES + "]. Current : " + length
        }
        if(type === InstructionArgType.REG && length != 0 && length != 1) {
            throw "A register argument must have a length of 0 or 1. Current : " + length
        }
    }
}

export class Instruction {
    name    : string
    icode   : number
    ifun    : number
    length  : number
    args    : InstructionArg[] = []

    constructor(name : string, icode : number, ifun : number, length : number, args : InstructionArg[]) {
        try{
            this._checkName(name)
            this._checkCodes(icode, ifun)
            this._checkArgsPosition(args)
            this._checkNumberOfRegisters(args)
            this._checkLengths(length, args)
        } catch(e) {
            throw name + " : " + e
        }

        this.name = name
        this.icode = icode
        this.ifun = ifun
        this.length = length
        this.args = args
    }

    private _checkName(name : string) {
        if(name.length === 0) {
            throw "An instruction name can not be empty"
        }
    }

    private _checkCodes(icode : number, ifun : number) {
        if(icode < 0 || ifun < 0 || icode > 15 || ifun > 15) {
            throw "icode and ifun must be in [0;15]. icode = " + icode + ", ifun = " + ifun
        }
    }

    private _checkArgsPosition(args : InstructionArg[]) {
        let bitset = Array<boolean>(args.length)

        bitset = bitset.map((item) => {
            return false
        })

        args.forEach((arg, index) => {
            const position = arg.position

            if(position > args.length) {
                throw "The arg #" + index + " is at position " + position + ". Maximum position is at " + args.length
            }

            if(bitset[position] && arg.type !== InstructionArgType.REG) {
                throw "The position " + position + " is already occuped by another argument"
            }

            bitset[position] = true
        })
    }

    private _checkNumberOfRegisters(args : InstructionArg[]) {
        let numberOfRegisters = 0

        args.forEach((arg) => {
            if(arg.type === InstructionArgType.REG) {
                numberOfRegisters++
            }
            if(numberOfRegisters > 2) {
                throw "There are more than 2 registers"
            }
        })
    }

    private _checkLengths(length : number, args : InstructionArg[]) {
        if(args.length > 2) {
            throw "An instruction can not have more than 2 arguments. Current : " + args.length
        }

        let sum = 0
        let useRegisters = false

        args.forEach((arg) => {
            if(arg.type === InstructionArgType.REG) {
                if(!useRegisters) {
                    useRegisters = true
                    sum += 1
                }
            } else {
                sum += arg.length
            }
        })
    }
}

export namespace Default {
    export const MAX_BYTES = 4
    
    export class InstructionSet implements IInstructionSet {
        handle = new Map<string, Instruction>()

        constructor() {
            this.setInstructions(defaultInstructions)
        }
    
        getHandle() : Map<string, Instruction> {
            return this.handle
        }
    
        setInstructions(instructions : Instruction[]) {
            this.handle.clear()
            
            instructions.forEach((item) => {
                this.addInstruction(item)
            })
        }

        addInstruction(instruction : Instruction) {
            this.handle.forEach((item) => {
                if(item.name === instruction.name) {
                    throw "An instruction '" + item.name + "' already exists"
                }
                if(item.icode === instruction.icode && item.ifun === instruction.ifun) {
                    throw "The pair of (icode, ifun) (" + item.icode + ", " + item.ifun + " already exists"
                }
            })
            this.handle.set(instruction.name, instruction)
        }

        clear() {
            this.handle.clear()
        }
    }

    const defaultInstructions : Instruction[] = [
        new Instruction("nop", 0, 0, 1,
            []),
        new Instruction("halt", 1, 0,  1,
            []),
        new Instruction("rrmovl", 2, 0, 2,
            [new InstructionArg(InstructionArgType.REG, 1, 1), new InstructionArg(InstructionArgType.REG, 1, 0)]),
        new Instruction("irmovl", 3, 0, MAX_BYTES + 2,
            [new InstructionArg(InstructionArgType.CONST, 2, MAX_BYTES), new InstructionArg(InstructionArgType.REG, 1, 0)]),
        new Instruction("rmmovl", 4, 0, MAX_BYTES + 2,
            [new InstructionArg(InstructionArgType.REG, 1, 1), new InstructionArg(InstructionArgType.MEM, 2, MAX_BYTES)]),
        new Instruction("mrmovl", 5, 0, 6,
            [new InstructionArg(InstructionArgType.MEM, 2, MAX_BYTES), new InstructionArg(InstructionArgType.REG, 1, 0)]),
        new Instruction("addl", 6, 0, 2,
            [new InstructionArg(InstructionArgType.REG, 1, 1), new InstructionArg(InstructionArgType.REG, 1, 0)]),
        new Instruction("subl", 6, 1, 2,
            [new InstructionArg(InstructionArgType.REG, 1, 1), new InstructionArg(InstructionArgType.REG, 1, 0)]),
        new Instruction("andl", 6, 2, 2,
            [new InstructionArg(InstructionArgType.REG, 1, 1), new InstructionArg(InstructionArgType.REG, 1, 0)]),
        new Instruction("xorl", 6, 3, 2,
            [new InstructionArg(InstructionArgType.REG, 1, 1), new InstructionArg(InstructionArgType.REG, 1, 0)]),
        new Instruction("sall", 6, 4, 2,
            [new InstructionArg(InstructionArgType.REG, 1, 1), new InstructionArg(InstructionArgType.REG, 1, 0)]),
        new Instruction("sarl", 6, 5, 2,
            [new InstructionArg(InstructionArgType.REG, 1, 1), new InstructionArg(InstructionArgType.REG, 1, 0)]),
        new Instruction("jmp", 7, 0, 5,
            [new InstructionArg(InstructionArgType.CONST, 1, MAX_BYTES)]),
        new Instruction("jle", 7, 1, 5,
            [new InstructionArg(InstructionArgType.CONST, 1, MAX_BYTES)]),
        new Instruction("jl", 7, 2, 5,
            [new InstructionArg(InstructionArgType.CONST, 1, MAX_BYTES)]),
        new Instruction("je", 7, 3, 5,
            [new InstructionArg(InstructionArgType.CONST, 1, MAX_BYTES)]),
        new Instruction("jne", 7, 4, 5,
            [new InstructionArg(InstructionArgType.CONST, 1, MAX_BYTES)]),
        new Instruction("jge", 7, 5, 5,
            [new InstructionArg(InstructionArgType.CONST, 1, MAX_BYTES)]),
        new Instruction("jg", 7, 6, 5,
            [new InstructionArg(InstructionArgType.CONST, 1, MAX_BYTES)]),
        new Instruction("call", 8, 0, 5,
            [new InstructionArg(InstructionArgType.CONST, 1, MAX_BYTES)]),
        new Instruction("ret", 9, 0, 1,
            []),
        new Instruction("pushl", 10, 0, 2,
            [new InstructionArg(InstructionArgType.REG, 1, 1)]),
        new Instruction("popl", 11, 0, 2,
            [new InstructionArg(InstructionArgType.REG, 1, 1)]),
        new Instruction("iaddl", 12, 0, 6,
            [new InstructionArg(InstructionArgType.CONST, 2, MAX_BYTES), new InstructionArg(InstructionArgType.REG, 1, 1)]),
        new Instruction("isubl", 12, 1, 6,
            [new InstructionArg(InstructionArgType.CONST, 2, MAX_BYTES), new InstructionArg(InstructionArgType.REG, 1, 1)]),       
        new Instruction("iandl", 12, 2, 6,
            [new InstructionArg(InstructionArgType.CONST, 2, MAX_BYTES), new InstructionArg(InstructionArgType.REG, 1, 1)]),
        new Instruction("ixorl", 12, 3, 6,
            [new InstructionArg(InstructionArgType.CONST, 2, MAX_BYTES), new InstructionArg(InstructionArgType.REG, 1, 1)]),
        new Instruction("isall", 12, 4, 6,
            [new InstructionArg(InstructionArgType.CONST, 2, MAX_BYTES), new InstructionArg(InstructionArgType.REG, 1, 1)]),
        new Instruction("isarl", 12, 5, 6,
            [new InstructionArg(InstructionArgType.CONST, 2, MAX_BYTES), new InstructionArg(InstructionArgType.REG, 1, 1)]),
        new Instruction("leave", 13, 0, 1,
            []),
        new Instruction("jreg", 14, 0, 2,
            [new InstructionArg(InstructionArgType.REG, 1, 1)]),
        new Instruction("jmem", 15, 0, 6,
            [new InstructionArg(InstructionArgType.MEM, 1, MAX_BYTES)]),
    ]
}
