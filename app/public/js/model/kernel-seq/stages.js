"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const memory_1 = require("./memory");
const registers_1 = require("./registers");
const hcl = __importStar(require("./hcl"));
var gen_srcA = hcl.gen_srcA;
var gen_srcB = hcl.gen_srcB;
var gen_dstE = hcl.gen_dstE;
var gen_dstM = hcl.gen_dstM;
var gen_aluA = hcl.gen_aluA;
var gen_aluB = hcl.gen_aluB;
var gen_alufun = hcl.gen_alufun;
var gen_mem_addr = hcl.gen_mem_addr;
var gen_mem_data = hcl.gen_mem_data;
var gen_new_pc = hcl.gen_new_pc;
var gen_need_regids = hcl.gen_need_regids;
var gen_need_valC = hcl.gen_need_valC;
var gen_instr_valid = hcl.gen_instr_valid;
var gen_set_cc = hcl.gen_set_cc;
var gen_mem_read = hcl.gen_mem_read;
var gen_mem_write = hcl.gen_mem_write;
exports.ctx = {};
function fetch(sim) {
    let valp = sim.context.pc;
    let byte = sim.memory.readByte(valp);
    valp++;
    sim.context.icode = memory_1.Memory.HI4(byte);
    sim.context.ifun = memory_1.Memory.LO4(byte);
    exports.ctx = {
        instructionSet: sim.context.instructionSet,
        icode: sim.context.icode,
    };
    if (gen_need_regids()) {
        byte = sim.memory.readByte(valp);
        valp++;
        sim.context.ra = memory_1.Memory.HI4(byte);
        sim.context.rb = memory_1.Memory.LO4(byte);
    }
    else {
        sim.context.ra = registers_1.registers.none;
        sim.context.rb = registers_1.registers.none;
    }
    if (gen_need_valC()) {
        sim.context.valC = sim.memory.readRegister(valp);
        valp += memory_1.Memory.WORD_SIZE;
    }
    else {
        sim.context.valC = 0;
    }
}
exports.fetch = fetch;
function decode(sim) {
    sim.context.srcA = gen_srcA();
    if (sim.context.srcA != registers_1.registers.none) {
        sim.context.valA = sim.registers.read(sim.context.srcA);
    }
    else {
        sim.context.valA = 0;
    }
    sim.context.srcB = gen_srcB();
    if (sim.context.srcB != registers_1.registers.none) {
        sim.context.valB = sim.registers.read(sim.context.srcB);
    }
    else {
        sim.context.valB = 0;
    }
    sim.context.dstE = gen_dstE();
    sim.context.dstM = gen_dstM();
}
exports.decode = decode;
function execute(sim) {
    sim.context.aluA = gen_aluA();
    sim.context.aluB = gen_aluB();
    let alu_fun = gen_alufun();
    try {
        sim.context.valE = sim.alu.compute_alu(sim.context.aluA, sim.context.aluB, alu_fun);
    }
    catch (e) {
        console.log("Cannot compute in alu : " + e);
    }
    if (gen_set_cc()) {
        sim.alu.compute_cc(sim.context.aluA, sim.context.aluB, alu_fun);
    }
}
exports.execute = execute;
function memory(sim) {
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
}
exports.memory = memory;
function writeBack(sim) {
    if (sim.context.dstE != registers_1.registers.none) {
        let valE = sim.context.valE;
        sim.registers.write(sim.context.dstE, valE);
    }
    if (sim.context.dstM != registers_1.registers.none) {
        let valM = sim.context.valM;
        sim.registers.write(sim.context.dstM, valM);
    }
}
exports.writeBack = writeBack;
function updatePC(sim) {
    sim.context.pc = gen_new_pc();
}
exports.updatePC = updatePC;
//# sourceMappingURL=stages.js.map