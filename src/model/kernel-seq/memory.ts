export class Word {
    static MAX_VALUE : number = 0xFFFFFFFF
    static SIZE : number = 4

    // Let's suppose word is aabbccdd.
    // We'll have bytes[0] === 0xdd, bytes[1] === 0xcc, etc...
    bytes : number[] = [0, 0, 0, 0]

    constructor(value : number = 0) {
        if(value > Word.MAX_VALUE) {
            throw "Value is expected to be lower than 0xFFFFFFFF"
        }

        for(var i = 0; i < Word.SIZE; i++) {
            const byte = value & 0xFF
            this.bytes[i] = byte
            value = value >> 8
        }
    }

    shiftOneRight() {
        for(var i = 0; i < Word.SIZE - 1; i++) {
            this.bytes[i] = this.bytes[i + 1]
        }
        this.bytes[Word.SIZE - 1] = 0
    }   

    shiftOneLeft() {
        for(var i = Word.SIZE - 1; i > 0; i--) {
            this.bytes[i] = this.bytes[i - 1]
        }
        this.bytes[0] = 0
    }
    
    shiftRight(nBytes : number) {
        if(nBytes < 0) {
            throw "nBytes must be positive (current : " + nBytes + ")"
        }

        const bytesToShift = Math.min(nBytes, Word.SIZE)
        for(var i = 0; i < bytesToShift; i++) {
            this.shiftOneRight()
        }
    } 

    shiftLeft(nBytes : number) {
        if(nBytes < 0) {
            throw "nBytes must be positive (current : " + nBytes + ")"
        }

        const bytesToShift = Math.min(nBytes, Word.SIZE)
        for(var i = 0; i < bytesToShift; i++) {
            this.shiftOneLeft()
        }
    } 

    // Writes from register (uses little endianness).
    // If word input is aabbccdd, it'll write ddccbbaa.
    writeFromRegister(offset : number, length : number, register : Word) {
        this.checkWriteArgs(offset, length)

        const from = Word.SIZE - offset - 1
        const to = from - length

        for(var i = from; i > to; i--) {
            this.bytes[i] = register.bytes[0]
            register.shiftOneRight() // Prepare the next byte to read
        }
    }

    // Writes from memory.
    // If word input is aabbccdd, it'll write aabbccdd.
    writeFromMemory(offset : number, length : number, word : Word) {
        this.checkWriteArgs(offset, length)

        const from = Word.SIZE - offset - 1
        const to = from - length

        const byteIndex = Word.SIZE - 1
        for(var i = from; i > to; i--) {
            this.bytes[i] = word.bytes[byteIndex]
            word.shiftOneLeft() // Prepare the next byte to read
        }
    }

    writeToRegister(offset : number, length : number, register : Word) {
        this.checkWriteArgs(offset, length)

        const from = Word.SIZE - offset - 1
        const to = from - length

        for(var i = from; i > to; i--) {
            register.bytes[0] = this.bytes[i]
            register.shiftOneLeft()
        }
    }

    checkWriteArgs(offset : number, length : number) {
        if(offset < 0 || offset >= Word.SIZE) {
            throw "Offset must be in [0;" + Word.SIZE + "[ (current : " + offset + ")"
        }
        
        const maxLength = Word.SIZE - offset
        if(length  < 0 || length > maxLength) {
            throw "Length must be in [0;" + maxLength + "] (current : " + length + ")"
        }
    }
}



export class Memory {
    content : Word[] = []

    write(address : number, register : Word) {
        const wordPosition = Math.floor(address / Word.SIZE)
        const byteOffset = address % Word.SIZE
        
        this._getWord(wordPosition).writeFromRegister(byteOffset, Word.MAX_VALUE - byteOffset, register)
        this._getWord(wordPosition + 1).writeFromRegister(0, byteOffset, register)
    }

    read(address : number) : Word {
        const wordPosition = Math.floor(address / Word.SIZE)
        const byteOffset = address % Word.SIZE
        
        let register = new Word()
        
        this._getWord(wordPosition).writeFromRegister(byteOffset, Word.MAX_VALUE - byteOffset, register)
        this._getWord(wordPosition + 1).writeFromRegister(0, byteOffset, register)

        return register
    }

    private _getWord(position : number) {
        let wordAtAddress = this.content[position]
        
        if(!wordAtAddress) {
            wordAtAddress = new Word()
            this.content[position] = wordAtAddress
        }

        return wordAtAddress
    }
}