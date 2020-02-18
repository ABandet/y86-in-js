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


}