export class Word {
    static MAX_VALUE : number = 0xFFFFFFFF
    static SIZE : number = 4

    // Let's suppose word is 0xaabbccdd.
    // We'll have bytes[0] === 0xdd, bytes[1] === 0xcc, etc...
    private _bytes : number[] = [0, 0, 0, 0]

    constructor(value : number = 0) {
        if(value > Word.MAX_VALUE) {
            throw "Value is expected to be lower than 0xFFFFFFFF"
        }

        for(var i = 0; i < Word.SIZE; i++) {
            const byte = value & 0xFF
            this._bytes[i] = byte
            value = value >> 8
        }
    }

    setBytes(newBytes : number[]) {
        if(newBytes.length != Word.SIZE) {
            throw "A word must have " + Word.SIZE + " bytes (current = " + newBytes.length
        }
        for(var i = 0; i < Word.SIZE; i++) {
            const value = newBytes[i]

            Word._checkNumberIsByte(value)
            this._bytes[i] = value
        }
    } 

    setByte(position : number, value : number) {
        Word._checkPositionIsValid(position)
        Word._checkNumberIsByte(value)
        this._bytes[position] = value
    }

    getByte(position : number) {
        Word._checkPositionIsValid(position)
        return this._bytes[position]
    }

    getBytes() : number[] {
        return this._bytes
    }

    private static _checkNumberIsByte(value : number) {
        if(value < 0 || value > 0xff) {
            throw "A byte must be in [0;255] (current = " + value
        }
    }

    private static _checkPositionIsValid(position : number) {
        if(position < 0 || position >= Word.SIZE) {
            throw "Position must be in [0;" + (Word.SIZE - 1) + "]"
        }
    }
}

export class Memory {
    content : Word[] = []

    writeRegister(address : number, register : Word) {
        for(var i = 0; i < Word.SIZE; i++) {
            this._writeByteInMemory(address + i, register.getByte(i))
        }
    }

    readRegister(address : number) : Word {
        let register = new Word()
        
        for(var i = 0; i < Word.SIZE; i++) {
            register.setByte(i, this._readByteInMemory(address + i))
        }

        return register
    }

    private _writeByteInMemory(address : number, byte : number) {
        const byteOffset = address % Word.SIZE

        this._getWord(address).setByte(byteOffset, byte)
    }

    private _readByteInMemory(address : number) : number {
        const byteOffset = address % Word.SIZE

        return this._getWord(address).getByte(byteOffset)
    }

    private _getWord(address : number) {
        const wordPosition = Math.floor(address / Word.SIZE)
        let wordAtAddress = this.content[wordPosition]
        
        if(!wordAtAddress) {
            wordAtAddress = new Word()
            this.content[wordPosition] = wordAtAddress
        }

        return wordAtAddress
    }
}