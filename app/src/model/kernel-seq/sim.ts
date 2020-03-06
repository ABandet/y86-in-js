import {Registers, registers_enum} from "./registers"
import {Context} from "./context";
import {Memory} from "./memory";
import * as stages from "./stages";
import {simStatus} from "../status"
import {Alu} from "./alu";
import * as hcl from "./hcl"
import {ISimulator} from "model/interfaces/ISimulator";
import {IInstructionSet} from "model/interfaces/IInstructionSet";
import {InstructionSet} from "../instructionSet";

export class Sim implements ISimulator {
    context: Context = new Context();
    registers: Registers = new Registers();
    memory : Memory = new Memory();
    alu : Alu = new Alu();
    status : simStatus = simStatus.AOK
    errorMessage : string = ""

    constructor() {
        this.reset()
        this.setInstructionSet(new InstructionSet())
    }

    step() : simStatus {
        try {
            hcl.setCtx(this.context)
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

    reset(): void {
        this.context = new Context();
        this.registers = new Registers();
        this.memory = new Memory();
        this.alu = new Alu();
        this.status = simStatus.AOK
        this.errorMessage = ""
    }

    getStageView() {
        throw new Error("Method not implemented.");
    }

    getRegistersView() {
        return {
            "eax" : this.registers.read(registers_enum.eax),
            "ebx" : this.registers.read(registers_enum.ebx),
            "ecx" : this.registers.read(registers_enum.ecx),
            "edx" : this.registers.read(registers_enum.edx),
            "esi" : this.registers.read(registers_enum.esi),
            "edi" : this.registers.read(registers_enum.edi),
            "esp" : this.registers.read(registers_enum.esp),
            "ebp" : this.registers.read(registers_enum.ebp),
        }
    }

    getMemoryView(beginAddress: number, endAddres: number) {
        throw new Error("Method not implemented.");
    }
    
    getStatusView() {
        return {
            "status" : this.status
        }
    }

    loadProgram(yo: string): void {
        this.memory.loadProgram(yo)
    }

    insertHclCode(js: string): void {
        hcl.setHclCode(js)
    }

    getErrorMessage() : string {
        return this.errorMessage
    }

    setInstructionSet(set : IInstructionSet) {
        hcl.setInstructionSet(set)
    }
}