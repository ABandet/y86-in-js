import { Sim } from "./sim"
import { Byte, Word } from "./memory"
import { registers } from "./registers"

// Declaration of HCL functions
// Used at compile-time and for unit tests
import * as hcl from "./hcl"

var gen_srcA        = hcl.gen_srcA
var gen_srcB        = hcl.gen_srcB
var gen_dstE        = hcl.gen_dstE
var gen_dstM        = hcl.gen_dstM
var gen_aluA        = hcl.gen_aluA
var gen_aluB        = hcl.gen_aluB
var gen_alufun      = hcl.gen_alufun
var gen_mem_addr    = hcl.gen_mem_addr
var gen_mem_data    = hcl.gen_mem_data
var gen_new_pc      = hcl.gen_new_pc
var gen_need_regids = hcl.gen_need_regids;
var gen_need_valC   = hcl.gen_need_valC;
var gen_instr_valid = hcl.gen_instr_valid
var gen_set_cc      = hcl.gen_set_cc
var gen_mem_read    = hcl.gen_mem_read
var gen_mem_write   = hcl.gen_mem_write

//
// End of HCL declaration
//

export let ctx : any = {}

function fetch(sim : Sim) {
    let valp = sim.context.pc
    let byte = sim.memory.readByte(valp)
    valp++
    
    sim.context.icode = byte.HI4()
    sim.context.ifun = byte.LO4()

    ctx = {
        instructionSet: sim.context.instructionSet,
        icode: sim.context.icode,
    }

    if(gen_need_regids()) {
        byte = sim.memory.readByte(valp)
        valp++

        sim.context.ra = byte.HI4()
        sim.context.rb = byte.LO4()
    } else {
        sim.context.ra = registers.none
        sim.context.rb = registers.none
    }

    if(gen_need_valC()) {
        sim.context.valC = sim.memory.readRegister(valp)
        valp += Word.SIZE
    } else {
        sim.context.valC = new Word(0)
    }

    // TODO : status (AOK, STOP, etc...)
    // TODO : Manage exceptions (errors can happen while accessing memory)
    // TODO : Edit hcl2js to generate a TS file instead of a JS one. If not,
    //        we'll not be able to perform any call to HCL functions from here.
}

function decode(sim : Sim) {
    sim.context.srcA = gen_srcA();
    if (sim.context.srcA != registers.none) {
        sim.context.valA = new Word(sim.context.srcA);
    }
    else {
        sim.context.valA = new Word(0);
    }

    sim.context.srcB = gen_srcB();
    if (sim.context.srcB != registers.none) {
        sim.context.valB = new Word(sim.context.srcB);
    }
    else {
        sim.context.valB = new Word(0);
    }

    sim.context.dstE = gen_dstE();
    sim.context.dstM = gen_dstM();
}

function execute(sim : Sim) {
    // TODO : Finish that part
    
}

function memory(sim : Sim) {

}

function writeBack(sim : Sim) {

}

function updatePC(sim : Sim) {
    sim.context.pc = gen_new_pc();
}

export { decode, fetch, execute, memory, writeBack, updatePC }