import { Sim } from "./sim"
import { Memory } from "./memory"
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
    
    sim.context.icode = Memory.HI4(byte)
    sim.context.ifun = Memory.LO4(byte)

    ctx = {
        instructionSet: sim.context.instructionSet,
        icode: sim.context.icode,
    }

    if(gen_need_regids()) {
        byte = sim.memory.readByte(valp)
        valp++

        sim.context.ra = Memory.HI4(byte)
        sim.context.rb = Memory.LO4(byte)
    } else {
        sim.context.ra = registers.none
        sim.context.rb = registers.none
    }

    if(gen_need_valC()) {
        sim.context.valC = sim.memory.readRegister(valp)
        valp += Memory.WORD_SIZE
    } else {
        sim.context.valC = 0
    }

    // TODO : status (AOK, STOP, etc...)
    // TODO : Manage exceptions (errors can happen while accessing memory)
    // TODO : Edit hcl2js to generate a TS file instead of a JS one. If not,
    //        we'll not be able to perform any call to HCL functions from here.
}

/**
 * Decode stage. Update srcA, srcB, dstE and dstM values, depending of function generated by hcl.
 * @param sim
 */
function decode(sim : Sim) {
    sim.context.srcA = gen_srcA();
    if (sim.context.srcA != registers.none) {
        sim.context.valA = sim.registers.read(sim.context.srcA);
    }
    else {
        sim.context.valA = 0;
    }

    sim.context.srcB = gen_srcB();
    if (sim.context.srcB != registers.none) {
        sim.context.valB = sim.registers.read(sim.context.srcB);
    }
    else {
        sim.context.valB = 0;
    }

    sim.context.dstE = gen_dstE();
    sim.context.dstM = gen_dstM();
}

/**
 * Execute stage. Call alu_compute function.
 * @param sim
 */
function execute(sim : Sim) {
    sim.context.aluA = gen_aluA();
    sim.context.aluB = gen_aluB();
    let alu_fun = gen_alufun();

    // compute in valE from aluA and aluB
    try {
        sim.context.valE = sim.alu.compute_alu(sim.context.aluA, sim.context.aluB, alu_fun);
    }
    catch (e) {
        console.log("Cannot compute in alu : " + e);
    }

    // Set flags
    if (gen_set_cc()) {
        sim.alu.compute_cc(sim.context.aluA, sim.context.aluB, alu_fun);
    }

    //TODO : Conditional branch
}

/**
 * Memory stage. Decide whenever it need to write or read in memory. Both can't be done in one cycle in this
 * implementation of the y86.
 * @param sim
 */
function memory(sim : Sim) {
    let mem_addr = gen_mem_addr();
    let mem_data = gen_mem_data();

    if (gen_mem_read()) {
        try {
            sim.context.valM = sim.memory.readRegister(mem_addr);
        }
        catch (e) {
            console.log("error in stage memory: " + e);
        }
    }

    else if (gen_mem_write()) {
        try {
            sim.memory.writeRegister(mem_addr, mem_data);
        }
        catch (e) {
            console.log("error in stage memory: " + e);
        }
    }

    //TODO : Status gestion
}

/**
 * Write back stage. Uses dstE to find the register where to write the value in valE. Same for dstM.
 * Only if the register stored in dstE and/or dstM is not the special register 'none'.
 *
 * dstM and dstE were previously assigned in decode stage.
 * @param sim
 */
function writeBack(sim : Sim) {
    if (sim.context.dstE != registers.none) {
        let valE = sim.context.valE;
        sim.registers.write(sim.context.dstE, valE);
    }

    if (sim.context.dstM != registers.none) {
        let valM = sim.context.valM;
        sim.registers.write(sim.context.dstM, valM);
    }
}

function updatePC(sim : Sim) {
    sim.context.pc = gen_new_pc();
}

export { decode, fetch, execute, memory, writeBack, updatePC }