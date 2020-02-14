import { Word } from "../../../model/kernel-seq/memory";

// This unit test is just here to test the lib
test("Word creation test", () =>{
    let word = new Word(0xFFFFFFFF)
    expect(word.bytes[0]).toBe(255)
    expect(word.bytes[1]).toBe(255)
    expect(word.bytes[2]).toBe(255)
    expect(word.bytes[3]).toBe(255)

    word = new Word(0)
    expect(word.bytes[0]).toBe(0)
    expect(word.bytes[1]).toBe(0)
    expect(word.bytes[2]).toBe(0)
    expect(word.bytes[3]).toBe(0)

    word = new Word(255)
    expect(word.bytes[0]).toBe(255)
    expect(word.bytes[1]).toBe(0)
    expect(word.bytes[2]).toBe(0)
    expect(word.bytes[3]).toBe(0)

    word = new Word(256)
    expect(word.bytes[0]).toBe(0)
    expect(word.bytes[1]).toBe(1)
    expect(word.bytes[2]).toBe(0)
    expect(word.bytes[3]).toBe(0)
});