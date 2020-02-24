import * as simSeq from "../model/kernel-seq/sim"
import * as registersSeq from "../model/kernel-seq/registers"
import * as yasDefault from "../model/yas"
import * as hcl2jsDefault from "../model/hcl2js"
import { ICompiler } from "../model/interfaces/ICompiler"

let simulators = []

class Kernel {
    sim : any // TODO : set up ISimulator interface
    yas : ICompiler
    hcl2js : ICompiler

    constructor(sim : any, yas : ICompiler, hcl2js : ICompiler = new hcl2jsDefault.Hcl2js()) {
        this.sim = sim
        this.yas = yas
        this.hcl2js = hcl2js
    }
}

// Add here different kernels
simulators["seq"] = new Kernel(
    new simSeq.Sim(),
    new yasDefault.Yas(registersSeq.registers_enum, {/* TODO : instruction set */})
)
