"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const simulatorException_1 = require("../exceptions/simulatorException");
class Memory {
    constructor() {
        this._content = new Uint8Array(Memory.LAST_ADDRESS);
    }
    writeRegister(address, register) {
        if (address < 0 || address + Memory.WORD_SIZE > Memory.LAST_ADDRESS) {
            throw new simulatorException_1.MemoryException(address);
        }
        for (var i = 0; i < Memory.WORD_SIZE; i++) {
            this._content[address + i] = register & 0xff;
            register >>>= 8;
        }
    }
    readRegister(address) {
        Memory._checkAddress(address, Memory.WORD_SIZE);
        let register = this._content[address];
        for (let i = 1; i < Memory.WORD_SIZE; i++) {
            register |= this._content[address + i] << (i * 8);
        }
        return register;
    }
    readByte(address) {
        Memory._checkAddress(address, 0);
        return this._content[address];
    }
    static byteArrayToWord(bytes = []) {
        if (bytes.length > Memory.WORD_SIZE) {
            throw "A word can not hold more than " + Memory.WORD_SIZE + " bytes (current : " + bytes.length + ")";
        }
        let value = 0;
        for (let i = 0; i < bytes.length; i++) {
            if (!Memory.isByte(bytes[i])) {
                throw "Can not insert something else than a byte on a word (byte : " + bytes[i] + ")";
            }
            value |= bytes[i] << (i * 8);
        }
        return value;
    }
    static numberToByteArray(value) {
        let bytes = [];
        while (value != 0) {
            const byte = value & 0xff;
            bytes.push(byte);
            value = (value - byte) / 256;
        }
        return bytes;
    }
    static isByte(value) {
        return value >= -128 && value <= 255;
    }
    static HI4(value) {
        if (!Memory.isByte(value)) {
            throw "Memory.HI4() was expecting a byte as argument (current : " + value + ")";
        }
        return (value >> 4) & 0xf;
    }
    static LO4(value) {
        if (!Memory.isByte(value)) {
            throw "Memory.LO4() was expecting a byte as argument (current : " + value + ")";
        }
        return value & 0xf;
    }
    static _checkAddress(address, offset) {
        if (address < 0 || address + offset > Memory.LAST_ADDRESS) {
            throw new simulatorException_1.MemoryException(address);
        }
    }
    loadProgram(yo) {
        const lines = yo.split("\n");
        lines.forEach((line, index) => {
            const splittedLine = line.split("|");
            if (splittedLine.length != 2 && splittedLine.length != 1) {
                throw "Line " + index + " : Invalid format";
            }
            if (splittedLine.length == 2) {
                const instructionsWithAddress = splittedLine[0];
                const instructionsWithAddressSplitted = instructionsWithAddress.split(":");
                if (instructionsWithAddressSplitted.length != 2 && instructionsWithAddressSplitted.length != 1) {
                    throw "Line " + index + " : Invalid format";
                }
                if (instructionsWithAddressSplitted.length == 2) {
                    const address = Number(instructionsWithAddressSplitted[0]);
                    let instruction = Number("0x" + instructionsWithAddressSplitted[1].trim());
                    if (!Number.isNaN(address) && !Number.isNaN(instruction)) {
                        const bytes = Memory.numberToByteArray(instruction);
                        for (let i = 0; i < bytes.length; i++) {
                            this._content[address + bytes.length - i - 1] = bytes[i];
                        }
                    }
                }
            }
        });
    }
}
exports.Memory = Memory;
Memory.LAST_ADDRESS = 0x1ffc;
Memory.WORD_SIZE = 4;
//# sourceMappingURL=memory.js.map