import { MemoryException } from "../exceptions/simulatorException"

class Memory {
    /**
     * The last reachable address.
     */
    static LAST_ADDRESS = 0x1ffc
    static WORD_SIZE    = 4
    
    private _content    = new Uint8Array(Memory.LAST_ADDRESS)

    /**
     * Inserts a word starting at the given address.
     * If the register is 0xddccbbaa and we write it at 0x6,
     * the memory will be :
     * ...
     * 0x4 : 00 00 aa bb
     * 0x8 : cc dd 00 00
     * ...
     * @param address 
     * @param word
     */
    writeWord(address : number, word : number) {
        if(address < 0 || address + Memory.WORD_SIZE > Memory.LAST_ADDRESS) {
            throw new MemoryException(address)
        }

        for(var i = 0; i < Memory.WORD_SIZE; i++) {
            this._content[address + i] = word & 0xff
            word >>>= 8
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
    readWord(address : number) : number {
        Memory._checkAddress(address, Memory.WORD_SIZE)

        let register = this._content[address]

        for(let i = 1; i < Memory.WORD_SIZE; i++) {
            register |= this._content[address + i] << (i * 8)
        }

        return register
    }

    /**
     * Returns the byte at the given address.
     * @param address 
     */
    readByte(address : number) : number {
        Memory._checkAddress(address, 0)

        return this._content[address]
    }

    static byteArrayToWord(bytes : number[]) {
        if(bytes.length > Memory.WORD_SIZE) {
            throw "A word can not hold more than " + Memory.WORD_SIZE + " bytes (current : " + bytes.length + ")"
        }

        let value = 0
        for(let i = 0; i < bytes.length; i++) {
            if(!Memory.isByte(bytes[i])) {
                throw "Can not insert something else than a byte on a word (byte : " + bytes[i] + ")"
            }
            value |= bytes[i] << (i * 8)
        }

        return value
    }

    static numberToByteArray(value : number) : number[] {
        let bytes : number[] = []

        while(value != 0) {
            const byte = value & 0xff
            bytes.push(byte)
            value = (value - byte) / 256
        }

        return bytes
    }

    static isByte(value : number) : boolean {
        return value >= -128 && value <= 255
    }

    /**
     * Returns the 4 HSB of the current byte.
     */
    static HI4(value : number) : number {
        if(!Memory.isByte(value)) {
            throw "Memory.HI4() was expecting a byte as argument (current : " + value + ")"
        }
        return (value >> 4) & 0xf
    }

    /**
     * Returns the 4 LSB of the current byte.
     */
    static LO4(value : number) : number {
        if(!Memory.isByte(value)) {
            throw "Memory.LO4() was expecting a byte as argument (current : " + value + ")"
        }
        return value & 0xf
    }

    private static _checkAddress(address : number, size : number) {
        if(address < 0 || address + size > Memory.LAST_ADDRESS) {
            throw new MemoryException(address)
        }
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
                    const firstAddress = Number(instructionsWithAddressSplitted[0])
                    let instruction = Number("0x" + instructionsWithAddressSplitted[1].trim())
        
                    if(!Number.isNaN(firstAddress) && !Number.isNaN(instruction)) {
                        const bytes = Memory.numberToByteArray(instruction)

                        for(let i = 0; i < bytes.length; i++) {
                            const address = firstAddress + bytes.length - i - 1
                            Memory._checkAddress(address, 0)
                            this._content[address] = bytes[i]
                        }
                    }
                }
            }
        })
    }
}

export { Memory }