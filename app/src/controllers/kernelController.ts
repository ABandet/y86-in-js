import * as simSeq from "../model/kernel-seq/sim"
import * as registersSeq from "../model/kernel-seq/registers"
import * as yasDefault from "../model/yas"
import * as hcl2jsDefault from "../model/hcl2js"
import * as instructionSetDefault from "../model/instructionSet"
import { ICompiler } from "../model/interfaces/ICompiler"
import { ISimulator } from "../model/interfaces/ISimulator"
import { IInstructionSet } from "../model/interfaces/IInstructionSet"
import { IKernelController } from "./interfaces/IKernelController"

class Toolchain {
    simulator       : ISimulator
    yas             : ICompiler
    hcl2js          : ICompiler
    instructionSet  : IInstructionSet 

    constructor(simulator : ISimulator, yas : ICompiler, hcl2js : ICompiler, instructionSet : IInstructionSet) {
        this.simulator = simulator
        this.yas = yas
        this.hcl2js = hcl2js
        this.instructionSet = instructionSet
    }
}

let toolchainsGenerator : Map<string, () => Toolchain> = new Map<string, () => Toolchain>()

export class KernelController implements IKernelController {
    private static DEFAULT_TOOLCHAIN = "seq"
    currentToolchain : Toolchain
    
    constructor(name : string = KernelController.DEFAULT_TOOLCHAIN) {
        if(toolchainsGenerator.has(name)) {
            this.currentToolchain = toolchainsGenerator.get(name)!()
        } else {
            throw "The toolchain for the kernel '" + name + "' does not exist.\nAvailable : " + this.getAvailableKernelNames()
        }
    }

    useKernel(name: string): void {
        if(toolchainsGenerator.has(name)) {
            this.currentToolchain = toolchainsGenerator.get(name)!()
        } else {
            throw "The toolchain for the kernel '" + name + "' does not exist.\nAvailable : " + this.getAvailableKernelNames()
        }
    }    
    
    getAvailableKernelNames(): string[] {
        let names : string[] = []

        toolchainsGenerator.forEach((_, name) => {
            names.push(name)
        })

        return names
    }

    getSim(): ISimulator {
        return this.currentToolchain.simulator
    }
    getYas(): ICompiler {
        return this.currentToolchain.yas
    }
    getHcl2js(): ICompiler {
        return this.currentToolchain.hcl2js
    }
    getInstructionSet(): IInstructionSet {
        return this.currentToolchain.instructionSet
    }
}

/*
 * Toolchain generation functions below
 */

toolchainsGenerator.set("seq", () => {
    let instructionSet = new instructionSetDefault.InstructionSet()

    let sim = new simSeq.Sim()
    sim.setInstructionSet(instructionSet)
    
    let yas = new yasDefault.Yas(registersSeq.registers_enum, instructionSet)

    let hcl2js = new hcl2jsDefault.Hcl2js()

    return new Toolchain(
        sim,
        yas,
        hcl2js,
        instructionSet
    )
})