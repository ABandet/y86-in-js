class Memory {
    /**
     * The last reachable address.
     */
    static LAST_ADDRESS : number = 0x1ffc
    content : Word[] = []

    /**
     * Inserts a word starting at the given address.
     * If the register is 0xddccbbaa and we write it at 0x6,
     * the memory will be :
     * ...
     * 0x4 : 00 00 aa bb
     * 0x8 : cc dd 00 00
     * ...
     * @param address 
     * @param register
     */
    writeRegister(address : number, register : Word) {
        for(var i = 0; i < Word.SIZE; i++) {
            this._writeByteInMemory(address + i, register.getByte(i))
        }
    }

    /**
     * Returns a word starting at the given address.
     * If the memory is :
     * ...
     * 0x4 : aa bb cc dd
     * 0x8 : ee ff 00 11
     * ...
     * and we read at 0x4, we will get the 0xddccbbaa word.
     * @param address 
     */
    readRegister(address : number) : Word {
        let register = new Word()
        
        for(var i = 0; i < Word.SIZE; i++) {
            register.setByte(i, this.readByte(address + i))
        }

        return register
    }

    /**
     * Returns the byte at the given address.
     * @param address 
     */
    readByte(address : number) : Byte {
        const byteOffset = address % Word.SIZE

        return this._getWordView(address).getByte(byteOffset)
    }

    /**
     * Loads in memory a .yo program.
     * The given string is supposed to be correct.
     * Therefore, the format is not checked and incorrect
     * lines are not used.
     * @param yo 
     */
    loadProgram(yo : string) {
        const lines = yo.split("\n")

        lines.forEach((line, index) => {
            const splittedLine = line.split("|")

            if(splittedLine.length != 2 && splittedLine.length != 1) {
                throw "Line " + index + " : Invalid format"
            }

            if(splittedLine.length == 2) {
                const instructionsWithAddress = splittedLine[0]
                const instructionsWithAddressSplitted = instructionsWithAddress.split(":")
                
                if(instructionsWithAddressSplitted.length != 2 && instructionsWithAddressSplitted.length != 1) {
                    throw "Line " + index + " : Invalid format"
                }
    
                if(instructionsWithAddressSplitted.length == 2) {
                    const address = Number(instructionsWithAddressSplitted[0])
                    const instruction = Number("0x" + instructionsWithAddressSplitted[1].trim())
        
                    if(!Number.isNaN(address) && !Number.isNaN(instruction)) {
                        const bytes = Byte.numberToBytes(instruction)
                        let addressOffset = 0
        
                        for(let i = bytes.length - 1; i >= 0; i--) {
                            this._writeByteInMemory(address + addressOffset, bytes[i])
                            addressOffset++
                        }
                    }
                }
            }
        })
    }

    /**
     * Writes a byte at the given address.
     * @param address 
     * @param byte 
     */
    private _writeByteInMemory(address : number, byte : Byte) {
        const byteOffset = address % Word.SIZE

        this._getWord(address).setByte(byteOffset, byte)
    }

    /**
     * Returns the word holding the byte contained at 
     * the given address.
     * @param address 
     */
    private _getWord(address : number) {        
        Memory._checkPositionIsValid(address)
        const wordPosition = Math.floor(address / Word.SIZE)

        let wordAtAddress = this.content[wordPosition]
        
        if(!wordAtAddress) {
            wordAtAddress = new Word()
            this.content[wordPosition] = wordAtAddress
        }

        return wordAtAddress
    }

    /**
     * Returns the word holding the byte contained at 
     * the given address.
     * If there is no word instanciated for this byte, returns
     * an empty word and does not insert it into the memory.
     * @param address 
     */
    private _getWordView(address : number) {        
        Memory._checkPositionIsValid(address)
        const wordPosition = Math.floor(address / Word.SIZE)

        let wordAtAddress = this.content[wordPosition]
        
        if(!wordAtAddress) {
            wordAtAddress = new Word()
        }

        return wordAtAddress
    }

    /**
     * Checks if an address in memory can be accessed.
     * @param address 
     */
    private static _checkPositionIsValid(address : number) {
        let position = Math.floor(address / Word.SIZE)
        let maxPosition = Math.floor(Memory.LAST_ADDRESS / Word.SIZE)
        
        if(position < 0 || position > maxPosition) {
            throw "The address must be in [0;" + (Memory.LAST_ADDRESS + Word.SIZE - 1) + "] (current = " + address.toString(16) + ")"
        }
    }
}

/**
 * Represents an ordered set of bytes.
 */
class Word {
    /**
     * The maximum value a word can hold.
     */
    static MAX_VALUE : number = 0xFFFFFFFF

    /**
     * The number of bytes a word contains.
     */
    static SIZE : number = 4

    private _value : number = 0

    constructor(value : number = 0) {
        if(value < 0 || value > Word.MAX_VALUE) {
            throw "Value is expected to be in [0;0xFFFFFFFF] (current : " + value.toString(16) + ")"
        }

        this._value = value
    }

    /**
     * Returns the number representation of the given word.
     */
    toNumber() : number {
        return this._value
    }

    /**
     * Insert a byte at the given position.
     * If the position is out of bound, an exception is thrown.
     * @param position The position of the byte. Must be in [0; Word.SIZE[
     * @param value The byte to set
     */
    setByte(position : number, value : Byte) {
        Word._checkPositionIsValid(position)
        
        const offsetInBits = position * 8
        const mask = shiftLeft(0xff, offsetInBits)
        const byteToSet = shiftLeft(value.toNumber(), offsetInBits)

        this._value |= mask
        this._value ^= byteToSet
        this._value ^= mask
    }

    /**
     * Returns the byte at the given position.
     * If the position is out of bound, an exception is thrown.
     * @param position The position of the byte. Must be in [0; Word.SIZE[
     */
    getByte(position : number) : Byte {
        Word._checkPositionIsValid(position)
        
        const offsetInBits = position * 8
        
        return new Byte((this._value >>> offsetInBits) & 0xff)
    }

    /**
     * Checks if the given word is equals to the given word.
     * @param other The other word to compare.
     */
    equals(other : Word) {
        for(let i = 0; i < Word.SIZE; i++) {
            if(this.getByte(i).toNumber() != other.getByte(i).toNumber()) {
                return false
            }
        }
        return true
    }
    
    /**
     * Performs 'plus' operation on two words.
     * @param left 
     * @param right 
     */
    static add(left : Word, right : Word) : Word {
        return new Word(left._value + right._value)
    }

    /**
     * Performs 'minus' operation on two words.
     * @param left 
     * @param right 
     */
    static substract(left : Word, right : Word) : Word {
        return new Word(left._value - right._value)
    }

    /**
     * Performs bitwise XOR on two words.
     * @param left 
     * @param right 
     */
    static xor(left : Word, right : Word) : Word {
        return new Word(left._value ^ right._value)
    }

    /**
     * Performs bitwise AND on two words.
     * @param left 
     * @param right 
     */
    static and(left : Word, right : Word) : Word {
        return new Word(left._value & right._value)
    }

    /**
     * Throw an exception if the given position is out of bound
     * of the word.
     * @param position The position to check
     */
    private static _checkPositionIsValid(position : number) {
        if(position < 0 || position >= Word.SIZE) {
            throw "Position must be in [0;" + (Word.SIZE - 1) + "]"
        }
    }
}

/**
 * Represents a byte, which is a number in [0;255]
 */
class Byte {
    private _value : number = 0

    constructor(value : number = 0) {
        Byte._checkNumberIsByte(value)
        this._value = value
    }

    /**
     * Returns the number representation of the current byte.
     */
    toNumber() : number {
        return this._value
    }

    /**
     * Returns the 4 HSB of the current byte.
     */
    HI4() : number {
        return (this._value >> 4) & 0xf
    }

    /**
     * Returns the 4 LSB of the current byte.
     */
    LO4() : number {
        return this._value & 0xf
    }

    /**
     * Can the given number be considered as a byte ?
     * @param value 
     */
    static isByte(value : number) : boolean {
        return value >= 0 && value <= 0xff
    }

    /**
     * Converts a given number to a byte array.
     * The LSB is at position 0.
     * @param value the number to convert
     */
    static numberToBytes(value : number) : Byte[] {
        let bytes : Byte[] = []

        while(value != 0) {
            const byte = value & 0xff
            bytes.push(new Byte(byte))
            value = (value - byte) / 256
        }

        return bytes
    }

    /**
     * Throw an exception if the number can not
     * be considered as a byte.
     * @param value The number to check
     */
    private static _checkNumberIsByte(value : number) {
        if(!Byte.isByte(value)) {
            throw "A byte must be in [0;255] (current = " + value
        }
    }
}

/**
 * As JavaScript does not support shift on integers > 32 bits,
 * we use this to perform shift left operation.
 * @param value The value to shift
 * @param nBits The number of bits to shift
 */
function shiftLeft(value : number, nBits : number) {
    return value * Math.pow(2, nBits)
}

export { Byte, Word, Memory }