import { Memory } from "../../../model/kernel-seq/memory";

test("Word test", () => {
    let word = Memory.byteArrayToWord()

    expect(word).toBe(0)

    expect(() => {
        Memory.byteArrayToWord([45, 45, 75, 78, 7])
    }).toThrow()

    expect(() => {
        Memory.byteArrayToWord([-129, 45, 75, 78])
    }).toThrow()

    expect(() => {
        Memory.byteArrayToWord([4, 45, 75, 256])
    }).toThrow()

    expect(() => {
        Memory.byteArrayToWord([-127, 45, 75, 255])
    }).not.toThrow()

    word = Memory.byteArrayToWord([0x00, 0xef, 0xcd, 0xff])

    expect(word & 0xff).toBe(0x00)
    expect(word >> 8  & 0xff).toBe(0xef)
    expect(word >> 16 & 0xff).toBe(0xcd)
    expect(word >> 24 & 0xff).toBe(0xff)
})

test("Memory access test", () => {
    let memory = new Memory()
    
    let word = Memory.byteArrayToWord([0xdd, 0xcc, 0xbb, 0xaa])

    // Write at address 0
    memory.writeRegister(0x0, word)
    
    expect(memory.readByte(0)).toBe(0xdd)
    expect(memory.readByte(1)).toBe(0xcc)
    expect(memory.readByte(2)).toBe(0xbb)
    expect(memory.readByte(3)).toBe(0xaa)

    expect(memory.readRegister(0x0)).toBe(word)

    // Write at 0x2. It will should write on two differents words.
    const address = Memory.WORD_SIZE / 2
    memory.writeRegister(address, word)
    expect(memory.readRegister(address)).toBe(word)

    expect(memory.readRegister(0x0)).toBe(Memory.byteArrayToWord([0xdd, 0xcc, 0xdd, 0xcc]))
    expect(memory.readRegister(address)).toBe(Memory.byteArrayToWord([0xdd, 0xcc, 0xbb, 0xaa]))
    expect(memory.readRegister(address + Memory.WORD_SIZE / 2)).toBe(Memory.byteArrayToWord([0xbb, 0xaa]))

    expect(() => {
        memory.readByte(-1)
    }).toThrow()

    expect(() => {
        memory.readByte(Memory.LAST_ADDRESS)
    }).not.toThrow()

    expect(() => {
        memory.readByte(Memory.LAST_ADDRESS + 1)
    }).toThrow()

    expect(() => {
        memory.readRegister(Memory.LAST_ADDRESS - Memory.WORD_SIZE)
    }).not.toThrow()

    expect(() => {
        memory.readRegister(Memory.LAST_ADDRESS - Memory.WORD_SIZE + 1)
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
        expect(memory.readByte(i)).toBe(result[i])
    }
})