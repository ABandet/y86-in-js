import { InstructionSet, Instruction, InstructionArg, InstructionArgType } from "../../model/instructionSet";

test('No overlap between fields', () => {
    let is = new InstructionSet()
    is.clear()

    is.addInstruction(new Instruction("instr", 0, 0, 1, []))

    // Same instruction name 
    expect(() => {
        is.addInstruction(new Instruction("instr", 1, 0, 1, []))
    }).toThrow()

    // Same instruction icode/ifun pair
    expect(() => {
        is.addInstruction(new Instruction("instr2", 0, 0, 1, []))
    }).toThrow()

    // Same icode but not ifun
    is.addInstruction(new Instruction("instr2", 0, 1, 1, []))
})

test('Instructions sizes', () => {
    let is = new InstructionSet()
    is.clear()

    // 0-sized instructions are allowed
    is.addInstruction(new Instruction("instr", 0, 0, 1, []))
    is.clear()

    // Negative lengths are forbiden
    expect(() => {
        is.addInstruction(new Instruction("instr", 0, 0, -1, []))
    }).toThrow()

    // 4 bytes and 1 byte arguments must feet in a 6 bytes instruction
    is.addInstruction(new Instruction("instr", 0, 0, 6,
    [InstructionArg.newConst(2, 4), InstructionArg.newReg()]))
    is.clear()

    // 4 bytes and 1 byte arguments must not feet in a 5 bytes instruction
    expect(() => {
        is.addInstruction(new Instruction("instr", 0, 0, 5,
        [InstructionArg.newConst(2, 4), InstructionArg.newReg()]))
    }).toThrow()

    // 4 bytes and 1 byte arguments must not feet in a 7 bytes instruction
    expect(() => {
        is.addInstruction(new Instruction("instr", 0, 0, 7,
        [InstructionArg.newConst(2, 4), InstructionArg.newReg()]))
    }).toThrow()

    // An instruction can not have more than 2 arguments
    expect(() => {
        is.addInstruction(new Instruction("instr", 0, 0, 8,
        [InstructionArg.newConst(2, 4), InstructionArg.newReg(), InstructionArg.newMem(3)]))
    }).toThrow()
})

test('icode / ifun', () => {
    let is = new InstructionSet()
    is.clear()

    // Negative icode
    expect(() => {
        is.addInstruction(new Instruction("instr", -1, 0, 1, []))
    }).toThrow()

    // Higher than 4 bits icode
    expect(() => {
        is.addInstruction(new Instruction("instr", 16, 0, 1, []))
    }).toThrow()

    // Negative ifun
    expect(() => {
        is.addInstruction(new Instruction("instr", 0, -1, 1, []))
    }).toThrow()

    // Higher than 4 bits ifun
    expect(() => {
        is.addInstruction(new Instruction("instr", 0, 16, 1, []))
    }).toThrow()
})

test('Instruction name', () => {
    let is = new InstructionSet()
    is.clear()

    // Empty name
    expect(() => {
        is.addInstruction(new Instruction("", 0, 0, 1, []))
    }).toThrow()
})

test('Instruction arguments position', () => {
    let is = new InstructionSet()
    is.clear()

    // The given arg type does not exist
    expect(() => {
        is.addInstruction(new Instruction("instr", 0, 0, 5,
        [new InstructionArg(12, 1, 4)]))
    }).toThrow()

    // Two arguments can not be at the same position
    expect(() => {
        is.addInstruction(new Instruction("instr", 0, 0, 6,
        [new InstructionArg(InstructionArgType.CONST, 1, 4), new InstructionArg(InstructionArgType.REG, 1, 1)]))
    }).toThrow()

    // Two registers can be at the same position
    is.addInstruction(new Instruction("instr", 0, 0, 2,
    [new InstructionArg(InstructionArgType.REG, 1, 0), new InstructionArg(InstructionArgType.REG, 1, 1)]))
    is.clear()

    // Two register can not be at the same inner position
    expect(() => {
        is.addInstruction(new Instruction("instr", 0, 0, 2,
        [new InstructionArg(InstructionArgType.REG, 1, 1), new InstructionArg(InstructionArgType.REG, 1, 1)]))
    }).toThrow()

    // There is a maximum of two registers
    expect(() => {
        is.addInstruction(new Instruction("instr", 0, 0, 3,
        [new InstructionArg(InstructionArgType.REG, 1, 1), new InstructionArg(InstructionArgType.REG, 1, 1), new InstructionArg(InstructionArgType.REG, 2, 0)]))
    }).toThrow()

    // An argument can not have a position lower than 1
    expect(() => {
        is.addInstruction(new Instruction("instr", 0, 0, 2,
        [new InstructionArg(InstructionArgType.REG, 0, 0), new InstructionArg(InstructionArgType.REG, 1, 1)]))
    }).toThrow()

    // An argument can not have a position higher than 2
    expect(() => {
        is.addInstruction(new Instruction("instr", 0, 0, 2,
        [new InstructionArg(InstructionArgType.REG, 3, 0), new InstructionArg(InstructionArgType.REG, 1, 1)]))
    }).toThrow()

    // An argument can not be at position 2 if there is no other argument
    expect(() => {
        is.addInstruction(new Instruction("instr", 0, 0, 2,
        [new InstructionArg(InstructionArgType.REG, 2, 0)]))
    }).toThrow()

    // An argument can not be at position 2 if there is no other argument
    expect(() => {
        is.addInstruction(new Instruction("instr", 0, 0, 2,
        [new InstructionArg(InstructionArgType.REG, 2, 0)]))
    }).toThrow()
})