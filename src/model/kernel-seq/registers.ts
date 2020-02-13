enum registers {
    eax,
    ebx,
    ecx,
    edx,
    esp,
    esi,
    ebp,
    edi
}

/**
 * Class who contains all the registers of the CPU.
 * Based on the registers enumerate, it create automatically all the registers and init them at 0.
 */
class Registers {
    content!: number[];

    constructor() {
        this.init();
    }

    /**
     * Create all registers and set them to the default value 0.
     */
    init(){
        for (let key in registers) {
            this.content[key] = 0;
        }
    }

    /**
     * Just a Registers.init wrapper.
     */
    reset(){
        this.init()
    }


    /**
     * Write value in register @param register.
     * @param register
     * @param value
     */
    write(register: registers, value: number) {
        if (value < 0) {
            throw "Forbiden value in Registers.write(): Must be greater than 0."
        }

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