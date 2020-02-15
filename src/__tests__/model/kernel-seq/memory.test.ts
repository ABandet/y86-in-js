import { Word, Memory } from "../../../model/kernel-seq/memory";

test("Memory access test", function() {
    let memory = new Memory()
    
    let word = new Word()

    // register is 0xaabbccdd
    word.setBytes([0xdd, 0xcc, 0xbb, 0xaa])

    // Write at address 0
    memory.writeRegister(0x0, word)
    expect(memory.readRegister(0x0).getBytes()).toStrictEqual(word.getBytes())

    // Write at 0x2. It will should write on two differents words.
    const address = Word.SIZE / 2
    memory.writeRegister(address, word)
    expect(memory.readRegister(address).getBytes()).toStrictEqual(word.getBytes())

    expect(memory.readRegister(0x0).getBytes()).toStrictEqual([0xdd, 0xcc, 0xdd, 0xcc])
    expect(memory.readRegister(address).getBytes()).toStrictEqual([0xdd, 0xcc, 0xbb, 0xaa])
    expect(memory.readRegister(address + 2).getBytes()).toStrictEqual([0xbb, 0xaa, 0, 0])
})