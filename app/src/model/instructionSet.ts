import { IInstructionSet } from './interfaces/IInstructionSet'

/**
 * Represents the different types an instruction argument can be.
 *  - REG : Register
 *  - MEM : A memory address
 *  - CONST : A constant integer value
 *  - LABEL : The address of a label
 */
export enum InstructionArgType {
    REG     = 0,
    MEM     = 1,
    CONST   = 2,
    LABEL   = 3,
}

/**
 * Represents an instruction argument.
 */
export class InstructionArg {
    /**
     * The type the argument represents.
     */
    type: InstructionArgType

    /**
     * The position of the argument in the encoded instruction.
     * The position starts at 1 (because of icode and ifun).
     */
    position: number

    /**
     * The length in bytes of the argument in the encoded instruction.
     */
    length: number

    constructor(type: InstructionArgType, position: number, length: number) {
        this._checkType(type)
        this._checkPosition(position)
        this._checkLength(length, type)

        this.type = type
        this.position = position
        this.length = length
    }

    private _checkType(type: InstructionArgType) {
        for (const possibleType in InstructionArgType) {
            if (type === Number(InstructionArgType[possibleType])) {
                return
            }
        }
        throw "The given arg type does not exist"
    }

    private _checkPosition(position: number) {
        if (position < 1) {
            throw "An instruction argument position must be in [1;2]"
        }
    }

    private _checkLength(length: number, type: InstructionArgType) {
        if (length < 0 || length > wordSize) {
            throw "An instruction argument must have a length in [0;" + wordSize + "]. Current : " + length
        }
        if (type === InstructionArgType.REG && length != 0 && length != 1) {
            throw "A register argument must have a length of 0 or 1. Current : " + length
        }
    }

    /**
     * Creates a register argument using predifined parameters.
     * @param innerPosition The position in the register byte. It can be 0 or 1.
     */
    static newReg(innerPosition : number = 0) : InstructionArg {
        return new InstructionArg(InstructionArgType.REG, 1, innerPosition)
    }

    /**
     * Creates a memory argument using predifined parameters.
     * @param position The position in the encoded instruction
     * @param length The length of the argument in the encoded instruction
     */
    static newMem(position : number, length : number = wordSize) : InstructionArg {
        return new InstructionArg(InstructionArgType.MEM, position, length)
    }

    /**
     * Creates a constant argument using predifined parameters.
     * @param position The position in the encoded instruction
     * @param length The length of the argument in the encoded instruction
     */
    static newConst(position : number, length : number = wordSize) : InstructionArg {
        return new InstructionArg(InstructionArgType.CONST, position, length)
    }

    /**
     * Creates a label argument using predifined parameters.
     * @param position The position in the encoded instruction
     * @param length The length of the argument in the encoded instruction
     */
    static newLabel(position : number, length : number = wordSize) : InstructionArg {
        return new InstructionArg(InstructionArgType.LABEL, position, length)
    }
}

/**
 * Represents an instruction.
 */
export class Instruction {
    /**
     * How many arguments an instruction can have ?
     */
    private static MAX_ARGS = 2

    /**
     * The name of the instruction. It can not be empty.
     */
    name: string

    /**
     * The code representing the instruction. It must be in [0; 15] (encoded on 4 bits).
     */
    icode: number

    /**
     * The code representing the function of the instruction. It must be in [0; 15] (encoded on 4 bits).
     */
    ifun: number

    /**
     * Length in bytes of the encoded instructions.
     */
    length: number

    /**
     * Expected arguments for this instruction.
     */
    args: InstructionArg[] = []

    constructor(name: string, icode: number, ifun: number, length: number, args: InstructionArg[]) {
        try {
            this._checkName(name)
            this._checkCodes(icode, ifun)
            this._checkArgsPosition(args)
            this._checkRegisters(args)
            this._checkLengths(length, args)
        } catch (e) {
            throw name + " : " + e
        }

        this.name = name
        this.icode = icode
        this.ifun = ifun
        this.length = length
        this.args = args
    }

    private _checkName(name: string) {
        if (name.length === 0) {
            throw "An instruction name can not be empty"
        }
    }

    private _checkCodes(icode: number, ifun: number) {
        if (icode < 0 || ifun < 0 || icode > 15 || ifun > 15) {
            throw "icode and ifun must be in [0;15]. icode = " + icode + ", ifun = " + ifun
        }
    }

    private _checkArgsPosition(args: InstructionArg[]) {
        let bitset = Array<boolean>(args.length)
        let firstRegisterPosition = -1

        bitset = bitset.map((item) => {
            return false
        })

        args.forEach((arg, index) => {
            const position = arg.position
            const isRegister = arg.type === InstructionArgType.REG

            if (position > args.length) {
                throw "The arg #" + index + " is at position " + position + ". Maximum position is at " + args.length
            }

            if (bitset[position] && !(firstRegisterPosition == position  && isRegister)) {
                throw "The position " + position + " is already occuped by another argument"
            }

            bitset[position] = true
            if(isRegister) {
                firstRegisterPosition = position
            }
        })
    }

    private _checkRegisters(args: InstructionArg[]) {
        let numberOfRegisters = 0
        let registerInnerPositions : number[] = []

        args.forEach((arg) => {
            if (arg.type === InstructionArgType.REG) {
                numberOfRegisters++
                registerInnerPositions.push(arg.length)
            }
            if (numberOfRegisters > 2) {
                throw "There are more than 2 registers"
            }
        })

        if(numberOfRegisters == 2 && registerInnerPositions[0] == registerInnerPositions[1]) {
            throw "Registers can not have the same inner position (current : " + registerInnerPositions[0] + " and " + registerInnerPositions[1] + ")"
        }
    }

    private _checkLengths(length: number, args: InstructionArg[]) {
        if (length < 0) {
            throw "An instruction can not have a negative length"
        }
        if (args.length > Instruction.MAX_ARGS) {
            throw "An instruction can not have more than " + Instruction.MAX_ARGS + " arguments. Current : " + args.length
        }

        let lengthSum = 1 // Start at 1 because of icode / ifun byte
        let useRegisters = false

        args.forEach((arg) => {
            if (arg.type === InstructionArgType.REG) {
                if (!useRegisters) {
                    useRegisters = true
                    lengthSum += 1
                }
            } else {
                lengthSum += arg.length
            }
        })
        if(length != lengthSum) {
            throw "Instruction length and arguments lengths do not match (length : " + length + ", args length : " + lengthSum + ")"
        }
    }
}

export let wordSize = 4

/**
 * Represents a set of instructions.
 * This class takes the responsability to check the coherency 
 * of all its instructions.
 * When instanciating the class, it is by default filled with
 * the default instructions.
 */
export class InstructionSet implements IInstructionSet {
    /**
     * Handler of all the instructions of the set.
     * To each instruction name is associated its instruction
     * representation.
     */
    handle = new Map<string, Instruction>()

    constructor(instructions : Instruction[] = defaultInstructions) {
        this.addInstructions(instructions)
    }

    getHandle(): Map<string, Instruction> {
        return this.handle
    }

    addInstructions(instructions: Instruction[]) {
        instructions.forEach((item) => {
            this.addInstruction(item)
        })
    }

    addInstruction(instruction: Instruction) {
        this.handle.forEach((item) => {
            if (item.name === instruction.name) {
                throw "An instruction '" + item.name + "' already exists"
            }
            if (item.icode === instruction.icode && item.ifun === instruction.ifun) {
                throw "The pair of (icode, ifun) (" + item.icode + ", " + item.ifun + ") already exists"
            }
        })
        this.handle.set(instruction.name, instruction)
    }

    getDefaultInstructions() : Instruction[] {
        return defaultInstructions
    }

    clear() {
        this.handle.clear()
    }
}

/**
 * Default instructions
 */
const defaultInstructions: Instruction[] = [
    new Instruction("nop", 0, 0, 1,
        []),
    new Instruction("halt", 1, 0, 1,
        []),
    new Instruction("rrmovl", 2, 0, 2,
        [InstructionArg.newReg(1), InstructionArg.newReg(0)]),
    new Instruction("irmovl", 3, 0, wordSize + 2,
        [InstructionArg.newConst(2), InstructionArg.newReg(0)]),
    new Instruction("rmmovl", 4, 0, wordSize + 2,
        [InstructionArg.newReg(1),  InstructionArg.newMem(2)]),
    new Instruction("mrmovl", 5, 0, 6,
        [ InstructionArg.newMem(2), InstructionArg.newReg(0)]),
    new Instruction("addl", 6, 0, 2,
        [ InstructionArg.newReg(1), InstructionArg.newReg(0)]),
    new Instruction("subl", 6, 1, 2,
        [ InstructionArg.newReg(1), InstructionArg.newReg(0)]),
    new Instruction("andl", 6, 2, 2,
        [ InstructionArg.newReg(1), InstructionArg.newReg(0)]),
    new Instruction("xorl", 6, 3, 2,
        [ InstructionArg.newReg(1), InstructionArg.newReg(0)]),
    new Instruction("sall", 6, 4, 2,
        [ InstructionArg.newReg(1), InstructionArg.newReg(0)]),
    new Instruction("sarl", 6, 5, 2,
        [ InstructionArg.newReg(1), InstructionArg.newReg(0)]),
    new Instruction("jmp", 7, 0, 5,
        [ InstructionArg.newConst(1)]),
    new Instruction("jle", 7, 1, 5,
        [ InstructionArg.newConst(1)]),
    new Instruction("jl", 7, 2, 5,
        [ InstructionArg.newConst(1)]),
    new Instruction("je", 7, 3, 5,
        [ InstructionArg.newConst(1)]),
    new Instruction("jne", 7, 4, 5,
        [ InstructionArg.newConst(1)]),
    new Instruction("jge", 7, 5, 5,
        [ InstructionArg.newConst(1)]),
    new Instruction("jg", 7, 6, 5,
        [ InstructionArg.newConst(1)]),
    new Instruction("call", 8, 0, 5,
        [ InstructionArg.newConst(1)]),
    new Instruction("ret", 9, 0, 1,
        []),
    new Instruction("pushl", 10, 0, 2,
        [ InstructionArg.newReg(1)]),
    new Instruction("popl", 11, 0, 2,
        [ InstructionArg.newReg(1)]),
    new Instruction("iaddl", 12, 0, 6,
        [ InstructionArg.newConst(2),  InstructionArg.newReg(1)]),
    new Instruction("isubl", 12, 1, 6,
        [ InstructionArg.newConst(2),  InstructionArg.newReg(1)]),
    new Instruction("iandl", 12, 2, 6,
        [ InstructionArg.newConst(2),  InstructionArg.newReg(1)]),
    new Instruction("ixorl", 12, 3, 6,
        [ InstructionArg.newConst(2),  InstructionArg.newReg(1)]),
    new Instruction("isall", 12, 4, 6,
        [ InstructionArg.newConst(2),  InstructionArg.newReg(1)]),
    new Instruction("isarl", 12, 5, 6,
        [ InstructionArg.newConst(2),  InstructionArg.newReg(1)]),
    new Instruction("leave", 13, 0, 1,
        []),
    new Instruction("jreg", 14, 0, 2,
        [ InstructionArg.newReg(1)]),
    new Instruction("jmem", 15, 0, wordSize + 1,
        [InstructionArg.newMem(1)]),
]
