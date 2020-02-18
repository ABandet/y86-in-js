import { Word } from "./memory";

/**
 * Enum wich contains all the registers plus the special register "none".
 */
enum registers {
    eax,
    ebx,
    ecx,
    edx,
    esp,
    esi,
    ebp,
    edi,
    none,
}

/**
 * Class who contains all the registers of the CPU.
 * Based on the registers enumerate, it create automatically all the registers and init them with an empty word.
 * Registers works with Word type. They have no treatment on data. They just store word.
 */
class Registers {
    /**
     * Array for all registers. Size based on the size of "registers" enumerate.
     */
    content: Array<Word> = [];

    /**
     * Set all registers to the default value 0.
     */
    constructor() {
        for (let key in registers) {
            let empty_word = new Word();
            this.content.push(empty_word);
        }
    }

    /**
     * Reset all registers with an empty value.
     */
    reset(){
        for (let key in registers) {
            let empty_word = new Word();
            this.content[key] = empty_word;
        }
    }


    /**
     * Write Word in register @param register.
     * @param register
     * @param value
     */
    write(register: registers, value: Word) {
        this.content[register] = value;
    }

    /**
     * Return value contains in one register.
     * @param register
     */
    read(register: registers) {
        return this.content[register];
    }
}


export {Registers, registers};