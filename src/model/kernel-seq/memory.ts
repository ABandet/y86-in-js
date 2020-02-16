class Memory {
    static LAST_ADDRESS : number = 0x1ffc
    content : Word[] = []

    writeRegister(address : number, register : Word) {
        for(var i = 0; i < Word.SIZE; i++) {
            this._writeByteInMemory(address + i, register.getByte(i))
        }
    }

    readRegister(address : number) : Word {
        let register = new Word()
        
        for(var i = 0; i < Word.SIZE; i++) {
            register.setByte(i, this.readByte(address + i))
        }

        return register
    }

    readByte(address : number) : Byte {
        const byteOffset = address % Word.SIZE

        return this._getWord(address).getByte(byteOffset)
    }

    private _writeByteInMemory(address : number, byte : Byte) {
        const byteOffset = address % Word.SIZE

        this._getWord(address).setByte(byteOffset, byte)
    }

    private _getWord(address : number) {        
        const wordPosition = Math.floor(address / Word.SIZE)
        Memory._checkPositionIsValid(wordPosition)

        let wordAtAddress = this.content[wordPosition]
        
        if(!wordAtAddress) {
            wordAtAddress = new Word()
            this.content[wordPosition] = wordAtAddress
        }

        return wordAtAddress
    }

    private static _checkPositionIsValid(position : number) {
        let maxPosition = Math.floor(Memory.LAST_ADDRESS / Word.SIZE)
        
        if(position < 0 || position > maxPosition) {
            throw "The address must be in [0;" + (Memory.LAST_ADDRESS + Word.SIZE - 1) + "]"
        }
    }
}

class Word {
    static MAX_VALUE : number = 0xFFFFFFFF
    static SIZE : number = 4

    private _value : number = 0

    constructor(value : number = 0) {
        if(value < 0 || value > Word.MAX_VALUE) {
            throw "Value is expected to be in [0;0xFFFFFFFF] (current : " + value.toString(16) + ")"
        }

        this._value = value
    }

    toNumber() : number {
        return this._value
    }

    setByte(position : number, value : Byte) {
        Word._checkPositionIsValid(position)
        
        const offsetInBits = position * 8
        const mask = shiftLeft(0xff, offsetInBits)
        const byteToSet = shiftLeft(value.toNumber(), offsetInBits)

        this._value |= mask
        this._value ^= byteToSet
        this._value ^= mask
    }

    getByte(position : number) : Byte {
        Word._checkPositionIsValid(position)
        
        const offsetInBits = position * 8
        
        return new Byte((this._value >>> offsetInBits) & 0xff)
    }

    equals(other : Word) {
        for(let i = 0; i < Word.SIZE; i++) {
            if(this.getByte(i).toNumber() != other.getByte(i).toNumber()) {
                return false
            }
        }
        return true
    }

    static add(left : Word, right : Word) : Word {
        return new Word(left._value + right._value)
    }

    static substract(left : Word, right : Word) : Word {
        return new Word(left._value - right._value)
    }

    static xor(left : Word, right : Word) : Word {
        return new Word(left._value ^ right._value)
    }

    static and(left : Word, right : Word) : Word {
        return new Word(left._value & right._value)
    }

    private static _checkPositionIsValid(position : number) {
        if(position < 0 || position >= Word.SIZE) {
            throw "Position must be in [0;" + (Word.SIZE - 1) + "]"
        }
    }
}

class Byte {
    private _value : number = 0

    constructor(value : number = 0) {
        Byte._checkNumberIsByte(value)
        this._value = value
    }

    toNumber() : number {
        return this._value
    }

    HI4() : number {
        return (this._value >> 4) & 0xf
    }

    LO4() : number {
        return this._value & 0xf
    }

    static isByte(value : number) : boolean {
        return value >= 0 && value <= 0xff
    }

    private static _checkNumberIsByte(value : number) {
        if(!Byte.isByte(value)) {
            throw "A byte must be in [0;255] (current = " + value
        }
    }
}

function shiftLeft(value : number, nBits : number) {
    return value * Math.pow(2, nBits)
}

export { Byte, Word, Memory }