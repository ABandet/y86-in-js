"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Memory {
    constructor() {
        this.content = [];
    }
    writeRegister(address, register) {
        for (var i = 0; i < Word.SIZE; i++) {
            this._writeByteInMemory(address + i, register.getByte(i));
        }
    }
    readRegister(address) {
        let register = new Word();
        for (var i = 0; i < Word.SIZE; i++) {
            register.setByte(i, this.readByte(address + i));
        }
        return register;
    }
    readByte(address) {
        const byteOffset = address % Word.SIZE;
        return this._getWordView(address).getByte(byteOffset);
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
                    const instruction = Number("0x" + instructionsWithAddressSplitted[1].trim());
                    if (!Number.isNaN(address) && !Number.isNaN(instruction)) {
                        const bytes = Byte.numberToBytes(instruction);
                        let addressOffset = 0;
                        for (let i = bytes.length - 1; i >= 0; i--) {
                            this._writeByteInMemory(address + addressOffset, bytes[i]);
                            addressOffset++;
                        }
                    }
                }
            }
        });
    }
    _writeByteInMemory(address, byte) {
        const byteOffset = address % Word.SIZE;
        this._getWord(address).setByte(byteOffset, byte);
    }
    _getWord(address) {
        Memory._checkPositionIsValid(address);
        const wordPosition = Math.floor(address / Word.SIZE);
        let wordAtAddress = this.content[wordPosition];
        if (!wordAtAddress) {
            wordAtAddress = new Word();
            this.content[wordPosition] = wordAtAddress;
        }
        return wordAtAddress;
    }
    _getWordView(address) {
        Memory._checkPositionIsValid(address);
        const wordPosition = Math.floor(address / Word.SIZE);
        let wordAtAddress = this.content[wordPosition];
        if (!wordAtAddress) {
            wordAtAddress = new Word();
        }
        return wordAtAddress;
    }
    static _checkPositionIsValid(address) {
        let position = Math.floor(address / Word.SIZE);
        let maxPosition = Math.floor(Memory.LAST_ADDRESS / Word.SIZE);
        if (position < 0 || position > maxPosition) {
            throw "The address must be in [0;" + (Memory.LAST_ADDRESS + Word.SIZE - 1) + "] (current = " + address.toString(16) + ")";
        }
    }
}
exports.Memory = Memory;
Memory.LAST_ADDRESS = 0x1ffc;
class Word {
    constructor(value = 0) {
        this._value = 0;
        if (value < 0 || value > Word.MAX_VALUE) {
            throw "Value is expected to be in [0;0xFFFFFFFF] (current : " + value.toString(16) + ")";
        }
        this._value = value;
    }
    toNumber() {
        return this._value;
    }
    setByte(position, value) {
        Word._checkPositionIsValid(position);
        const offsetInBits = position * 8;
        const mask = shiftLeft(0xff, offsetInBits);
        const byteToSet = shiftLeft(value.toNumber(), offsetInBits);
        this._value |= mask;
        this._value ^= byteToSet;
        this._value ^= mask;
    }
    getByte(position) {
        Word._checkPositionIsValid(position);
        const offsetInBits = position * 8;
        return new Byte((this._value >>> offsetInBits) & 0xff);
    }
    equals(other) {
        for (let i = 0; i < Word.SIZE; i++) {
            if (this.getByte(i).toNumber() != other.getByte(i).toNumber()) {
                return false;
            }
        }
        return true;
    }
    static add(left, right) {
        return new Word(left._value + right._value);
    }
    static substract(left, right) {
        return new Word(left._value - right._value);
    }
    static xor(left, right) {
        return new Word(left._value ^ right._value);
    }
    static and(left, right) {
        return new Word(left._value & right._value);
    }
    static _checkPositionIsValid(position) {
        if (position < 0 || position >= Word.SIZE) {
            throw "Position must be in [0;" + (Word.SIZE - 1) + "]";
        }
    }
}
exports.Word = Word;
Word.MAX_VALUE = 0xFFFFFFFF;
Word.SIZE = 4;
class Byte {
    constructor(value = 0) {
        this._value = 0;
        Byte._checkNumberIsByte(value);
        this._value = value;
    }
    toNumber() {
        return this._value;
    }
    HI4() {
        return (this._value >> 4) & 0xf;
    }
    LO4() {
        return this._value & 0xf;
    }
    static isByte(value) {
        return value >= 0 && value <= 0xff;
    }
    static numberToBytes(value) {
        let bytes = [];
        while (value != 0) {
            const byte = value & 0xff;
            bytes.push(new Byte(byte));
            value = (value - byte) / 256;
        }
        return bytes;
    }
    static _checkNumberIsByte(value) {
        if (!Byte.isByte(value)) {
            throw "A byte must be in [0;255] (current = " + value;
        }
    }
}
exports.Byte = Byte;
function shiftLeft(value, nBits) {
    return value * Math.pow(2, nBits);
}
//# sourceMappingURL=memory.js.map