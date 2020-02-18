import { Word, Memory, Byte } from "../../../model/kernel-seq/memory";

test("Word test", () => {
    let word = new Word(0)

    expect(word.getByte(0).toNumber()).toBe(0)
    expect(word.getByte(1).toNumber()).toBe(0)
    expect(word.getByte(2).toNumber()).toBe(0)
    expect(word.getByte(3).toNumber()).toBe(0)

    expect(() => {
        new Word(Word.MAX_VALUE + 1)
    }).toThrow()
    
    expect(() => {
        new Word(-1)
    }).toThrow()

    word = new Word(0xabcdef12)

    expect(word.getByte(0).toNumber()).toBe(0x12)
    expect(word.getByte(1).toNumber()).toBe(0xef)
    expect(word.getByte(2).toNumber()).toBe(0xcd)
    expect(word.getByte(3).toNumber()).toBe(0xab)

    expect(() => {
        word.getByte(-1)
    }).toThrow()

    expect(() => {
        word.getByte(Word.SIZE)
    }).toThrow()

    for(let i = 0; i < Word.SIZE / 2; i++) {
        let lowByte = word.getByte(i)
        let highByte = word.getByte(Word.SIZE - 1 - i)

        word.setByte(i, highByte)
        word.setByte(Word.SIZE - 1 - i, lowByte)
    }

    expect(word.getByte(3).toNumber()).toBe(0x12)
    expect(word.getByte(2).toNumber()).toBe(0xef)
    expect(word.getByte(1).toNumber()).toBe(0xcd)
    expect(word.getByte(0).toNumber()).toBe(0xab)
})

test("Memory access test", () => {
    let memory = new Memory()
    
    let word = new Word(0xaabbccdd)

    // Write at address 0
    memory.writeRegister(0x0, word)
    
    expect(memory.readRegister(0x0).equals(word)).toBeTruthy()

    // Write at 0x2. It will should write on two differents words.
    const address = Word.SIZE / 2
    memory.writeRegister(address, word)
    expect(memory.readRegister(address).equals(word)).toBeTruthy()

    expect(memory.readRegister(0x0).equals(new Word(0xccddccdd))).toBeTruthy()
    expect(memory.readRegister(address).equals(new Word(0xaabbccdd))).toBeTruthy()
    expect(memory.readRegister(address + 2).equals(new Word(0xaabb))).toBeTruthy()

    expect(() => {
        memory.readByte(-1)
    }).toThrow()

    expect(() => {
        memory.readByte(Memory.LAST_ADDRESS + Word.SIZE - 1)
    }).not.toThrow()

    expect(() => {
        memory.readByte(Memory.LAST_ADDRESS + Word.SIZE)
    }).toThrow()

    expect(() => {
        memory.readRegister(Memory.LAST_ADDRESS + 1)
    }).toThrow()
})

test("Memory load program test", () => {
    let memory = new Memory()
    let program = `
    | 
    | # Support commentary ?
    0x0000:              | .pos 0
    0x0000:              | Init:
    0x0000: 400fec010000 |     rmmovl %eax, 0x1ec
                         |     
    0x0006:              | .pos 0x100
    0x0100:              | Stack:
                         |       
    `
    
    memory.loadProgram(program)
    let result = 
    [0x40, 0x0f, 0xec, 0x01, 
     0x00, 0x00, 0x00, 0x00]

    for(let i = 0; i < result.length; i++) {
        expect(memory.readByte(i).toNumber()).toBe(result[i])
    }
})