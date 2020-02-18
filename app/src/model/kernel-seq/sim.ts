import { Registers } from "./registers"
import { Context } from "./context";
import { alufct } from "./aluEnum";
import { Memory } from "./memory";
import * as stages from "./stages";
import { simStatus } from "./status"
import {Alu} from "./alu";

export class Sim {
    context: Context = new Context();
    registers: Registers = new Registers();
    memory : Memory = new Memory();
    alu : Alu = new Alu();
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