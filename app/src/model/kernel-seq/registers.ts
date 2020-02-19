/**
 * Enum wich contains all the registers plus the special register "none".
 */
enum registers_enum {
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
    content: Array<number> = [];

    /**
     * Set all registers to the default value 0.
     */
    constructor() {
        for (let key in registers_enum) {
            this.content.push(0);
        }
    }

    /**
     * Reset all registers with an empty value.
     */
    reset(){
        for (let key in registers_enum) {
            this.content[key] = 0;
        }
    }


    /**
     * Write Word in register @param register.
     * @param register
     * @param value
     */
    write(register: registers_enum, value: number) {
        this.content[register] = value;
    }

    /**
     * Return value contains in one register.
     * @param register
     */
    read(register: registers_enum) {
        return this.content[register];
    }
}


export {Registers, registers_enum};