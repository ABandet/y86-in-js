import { Registers } from "./registers"
import { Context } from "./context";
import { alufct } from "./aluEnum";
import { Word, Memory } from "./memory";
import * as stages from "./stages";
import { simStatus } from "./status"

export class Sim {
    context: Context = new Context();
    registers: Registers = new Registers();
    memory : Memory = new Memory();
    status : simStatus = simStatus.AOK
    errorMessage : string = ""

    constructor() {

    }

    step() : simStatus {
        try {
            stages.decode(this)
            stages.fetch(this)
            stages.execute(this)
            stages.memory(this)
            stages.writeBack(this)
        } catch(error) {
            this.status = simStatus.HALT
            this.errorMessage = error
        }

        return this.status
    }

    alu(){
        if (this.context.ifun > 4 || this.context.ifun < 0) {
            throw "Invalid ifun in Sim.alu()"
        }

        if (this.context.ifun == alufct.A_ADD) {
            this.context.valE = Word.add(this.context.aluA, this.context.aluB)
        }
        else if (this.context.ifun == alufct.A_AND) {
            this.context.valE = Word.and(this.context.aluA, this.context.aluB)
        }
        else if (this.context.ifun == alufct.A_SUB) {
            this.context.valE = Word.substract(this.context.aluA, this.context.aluB)
        }
        else if (this.context.ifun == alufct.A_XOR) {
            this.context.valE = Word.xor(this.context.aluA, this.context.aluB)
        }
        else if (this.context.ifun == alufct.A_NONE) {
            throw "A_NONE constante setted."
        }

        throw "Error, alu function (ifun) not founded."
    }
}