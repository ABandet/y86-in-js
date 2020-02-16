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
    content: Array<number> = [];

    constructor() {
        this.init();
    }

    /**
     * Create all registers and set them to the default value 0.
     */
    init(){
        for (let key in registers) {
            this.content.push(0);
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
        if (value > 0xffffffff) {
            throw "Forbiden value in Registers.write(): Must be on 32 bits."
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