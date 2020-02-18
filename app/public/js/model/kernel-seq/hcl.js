"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stages_1 = require("./stages");
function gen_srcA() {
    if ((stages_1.ctx.icode) === undefined || (stages_1.ctx.instructionSet.rrmovl) === undefined || (stages_1.ctx.instructionSet.rmmovl) === undefined || (stages_1.ctx.instructionSet.alu) === undefined || (stages_1.ctx.instructionSet.pushl) === undefined || (stages_1.ctx.ra) === undefined || (stages_1.ctx.icode) === undefined || (stages_1.ctx.instructionSet.popl) === undefined || (stages_1.ctx.instructionSet.ret) === undefined || (stages_1.ctx.registers.esp) === undefined || (stages_1.ctx.registers.none) === undefined) {
        throw "Invalid identifier in HCL";
    }
    if (((stages_1.ctx.icode) === (stages_1.ctx.instructionSet.rrmovl)) || ((stages_1.ctx.icode) === (stages_1.ctx.instructionSet.rmmovl)) || ((stages_1.ctx.icode) === (stages_1.ctx.instructionSet.alu)) || ((stages_1.ctx.icode) === (stages_1.ctx.instructionSet.pushl))) {
        return stages_1.ctx.ra;
    }
    if (((stages_1.ctx.icode) === (stages_1.ctx.instructionSet.popl)) || ((stages_1.ctx.icode) === (stages_1.ctx.instructionSet.ret))) {
        return stages_1.ctx.registers.esp;
    }
    if (1) {
        return stages_1.ctx.registers.none;
    }
}
exports.gen_srcA = gen_srcA;
function gen_srcB() {
    if ((stages_1.ctx.icode) === undefined || (stages_1.ctx.instructionSet.alu) === undefined || (stages_1.ctx.instructionSet.alui) === undefined || (stages_1.ctx.instructionSet.rmmovl) === undefined || (stages_1.ctx.instructionSet.mrmovl) === undefined || (stages_1.ctx.rb) === undefined || (stages_1.ctx.icode) === undefined || (stages_1.ctx.instructionSet.pushl) === undefined || (stages_1.ctx.instructionSet.popl) === undefined || (stages_1.ctx.instructionSet.call) === undefined || (stages_1.ctx.instructionSet.ret) === undefined || (stages_1.ctx.registers.esp) === undefined || (stages_1.ctx.icode) === undefined || (stages_1.ctx.instructionSet.loop) === undefined || (stages_1.ctx.registers.ecx) === undefined || (stages_1.ctx.registers.none) === undefined) {
        throw "Invalid identifier in HCL";
    }
    if (((stages_1.ctx.icode) === (stages_1.ctx.instructionSet.alu)) || ((stages_1.ctx.icode) === (stages_1.ctx.instructionSet.alui)) || ((stages_1.ctx.icode) === (stages_1.ctx.instructionSet.rmmovl)) || ((stages_1.ctx.icode) === (stages_1.ctx.instructionSet.mrmovl))) {
        return stages_1.ctx.rb;
    }
    if (((stages_1.ctx.icode) === (stages_1.ctx.instructionSet.pushl)) || ((stages_1.ctx.icode) === (stages_1.ctx.instructionSet.popl)) || ((stages_1.ctx.icode) === (stages_1.ctx.instructionSet.call)) || ((stages_1.ctx.icode) === (stages_1.ctx.instructionSet.ret))) {
        return stages_1.ctx.registers.esp;
    }
    if (((stages_1.ctx.icode) === (stages_1.ctx.instructionSet.loop))) {
        return stages_1.ctx.registers.ecx;
    }
    if (1) {
        return stages_1.ctx.registers.none;
    }
}
exports.gen_srcB = gen_srcB;
function gen_dstE() {
    if ((stages_1.ctx.icode) === undefined || (stages_1.ctx.instructionSet.rrmovl) === undefined || (stages_1.ctx.instructionSet.irmovl) === undefined || (stages_1.ctx.instructionSet.alu) === undefined || (stages_1.ctx.instructionSet.alui) === undefined || (stages_1.ctx.rb) === undefined || (stages_1.ctx.icode) === undefined || (stages_1.ctx.instructionSet.pushl) === undefined || (stages_1.ctx.instructionSet.popl) === undefined || (stages_1.ctx.instructionSet.call) === undefined || (stages_1.ctx.instructionSet.ret) === undefined || (stages_1.ctx.registers.esp) === undefined || (stages_1.ctx.icode) === undefined || (stages_1.ctx.instructionSet.loop) === undefined || (stages_1.ctx.registers.ecx) === undefined || (stages_1.ctx.registers.none) === undefined) {
        throw "Invalid identifier in HCL";
    }
    if (((stages_1.ctx.icode) === (stages_1.ctx.instructionSet.rrmovl)) || ((stages_1.ctx.icode) === (stages_1.ctx.instructionSet.irmovl)) || ((stages_1.ctx.icode) === (stages_1.ctx.instructionSet.alu)) || ((stages_1.ctx.icode) === (stages_1.ctx.instructionSet.alui))) {
        return stages_1.ctx.rb;
    }
    if (((stages_1.ctx.icode) === (stages_1.ctx.instructionSet.pushl)) || ((stages_1.ctx.icode) === (stages_1.ctx.instructionSet.popl)) || ((stages_1.ctx.icode) === (stages_1.ctx.instructionSet.call)) || ((stages_1.ctx.icode) === (stages_1.ctx.instructionSet.ret))) {
        return stages_1.ctx.registers.esp;
    }
    if (((stages_1.ctx.icode) === (stages_1.ctx.instructionSet.loop))) {
        return stages_1.ctx.registers.ecx;
    }
    if (1) {
        return stages_1.ctx.registers.none;
    }
}
exports.gen_dstE = gen_dstE;
function gen_dstM() {
    if ((stages_1.ctx.icode) === undefined || (stages_1.ctx.instructionSet.mrmovl) === undefined || (stages_1.ctx.instructionSet.popl) === undefined || (stages_1.ctx.ra) === undefined || (stages_1.ctx.registers.none) === undefined) {
        throw "Invalid identifier in HCL";
    }
    if (((stages_1.ctx.icode) === (stages_1.ctx.instructionSet.mrmovl)) || ((stages_1.ctx.icode) === (stages_1.ctx.instructionSet.popl))) {
        return stages_1.ctx.ra;
    }
    if (1) {
        return stages_1.ctx.registers.none;
    }
}
exports.gen_dstM = gen_dstM;
function gen_aluA() {
    if ((stages_1.ctx.icode) === undefined || (stages_1.ctx.instructionSet.rrmovl) === undefined || (stages_1.ctx.instructionSet.alu) === undefined || (stages_1.ctx.vala) === undefined || (stages_1.ctx.icode) === undefined || (stages_1.ctx.instructionSet.irmovl) === undefined || (stages_1.ctx.instructionSet.rmmovl) === undefined || (stages_1.ctx.instructionSet.mrmovl) === undefined || (stages_1.ctx.instructionSet.alui) === undefined || (stages_1.ctx.valc) === undefined || (stages_1.ctx.icode) === undefined || (stages_1.ctx.instructionSet.call) === undefined || (stages_1.ctx.instructionSet.pushl) === undefined || (stages_1.ctx.icode) === undefined || (stages_1.ctx.instructionSet.ret) === undefined || (stages_1.ctx.instructionSet.popl) === undefined || (stages_1.ctx.icode) === undefined || (stages_1.ctx.instructionSet.loop) === undefined) {
        throw "Invalid identifier in HCL";
    }
    if (((stages_1.ctx.icode) === (stages_1.ctx.instructionSet.rrmovl)) || ((stages_1.ctx.icode) === (stages_1.ctx.instructionSet.alu))) {
        return stages_1.ctx.vala;
    }
    if (((stages_1.ctx.icode) === (stages_1.ctx.instructionSet.irmovl)) || ((stages_1.ctx.icode) === (stages_1.ctx.instructionSet.rmmovl)) || ((stages_1.ctx.icode) === (stages_1.ctx.instructionSet.mrmovl)) || ((stages_1.ctx.icode) === (stages_1.ctx.instructionSet.alui))) {
        return stages_1.ctx.valc;
    }
    if (((stages_1.ctx.icode) === (stages_1.ctx.instructionSet.call)) || ((stages_1.ctx.icode) === (stages_1.ctx.instructionSet.pushl))) {
        return -4;
    }
    if (((stages_1.ctx.icode) === (stages_1.ctx.instructionSet.ret)) || ((stages_1.ctx.icode) === (stages_1.ctx.instructionSet.popl))) {
        return 4;
    }
    if (((stages_1.ctx.icode) === (stages_1.ctx.instructionSet.loop))) {
        return -1;
    }
}
exports.gen_aluA = gen_aluA;
function gen_aluB() {
    if ((stages_1.ctx.icode) === undefined || (stages_1.ctx.instructionSet.rmmovl) === undefined || (stages_1.ctx.instructionSet.mrmovl) === undefined || (stages_1.ctx.instructionSet.alu) === undefined || (stages_1.ctx.instructionSet.alui) === undefined || (stages_1.ctx.instructionSet.call) === undefined || (stages_1.ctx.instructionSet.pushl) === undefined || (stages_1.ctx.instructionSet.ret) === undefined || (stages_1.ctx.instructionSet.popl) === undefined || (stages_1.ctx.instructionSet.loop) === undefined || (stages_1.ctx.valb) === undefined || (stages_1.ctx.icode) === undefined || (stages_1.ctx.instructionSet.rrmovl) === undefined || (stages_1.ctx.instructionSet.irmovl) === undefined) {
        throw "Invalid identifier in HCL";
    }
    if (((stages_1.ctx.icode) === (stages_1.ctx.instructionSet.rmmovl)) || ((stages_1.ctx.icode) === (stages_1.ctx.instructionSet.mrmovl)) || ((stages_1.ctx.icode) === (stages_1.ctx.instructionSet.alu)) || ((stages_1.ctx.icode) === (stages_1.ctx.instructionSet.alui)) || ((stages_1.ctx.icode) === (stages_1.ctx.instructionSet.call)) || ((stages_1.ctx.icode) === (stages_1.ctx.instructionSet.pushl)) || ((stages_1.ctx.icode) === (stages_1.ctx.instructionSet.ret)) || ((stages_1.ctx.icode) === (stages_1.ctx.instructionSet.popl)) || ((stages_1.ctx.icode) === (stages_1.ctx.instructionSet.loop))) {
        return stages_1.ctx.valb;
    }
    if (((stages_1.ctx.icode) === (stages_1.ctx.instructionSet.rrmovl)) || ((stages_1.ctx.icode) === (stages_1.ctx.instructionSet.irmovl))) {
        return 0;
    }
}
exports.gen_aluB = gen_aluB;
function gen_alufun() {
    if ((stages_1.ctx.icode) === undefined || (stages_1.ctx.instructionSet.alu) === undefined || (stages_1.ctx.instructionSet.alui) === undefined || (stages_1.ctx.ifun) === undefined || (stages_1.ctx.alufct.A_ADD) === undefined) {
        throw "Invalid identifier in HCL";
    }
    if (((stages_1.ctx.icode) === (stages_1.ctx.instructionSet.alu)) || ((stages_1.ctx.icode) === (stages_1.ctx.instructionSet.alui))) {
        return stages_1.ctx.ifun;
    }
    if (1) {
        return stages_1.ctx.alufct.A_ADD;
    }
}
exports.gen_alufun = gen_alufun;
function gen_mem_addr() {
    if ((stages_1.ctx.icode) === undefined || (stages_1.ctx.instructionSet.rmmovl) === undefined || (stages_1.ctx.instructionSet.pushl) === undefined || (stages_1.ctx.instructionSet.call) === undefined || (stages_1.ctx.instructionSet.mrmovl) === undefined || (stages_1.ctx.vale) === undefined || (stages_1.ctx.icode) === undefined || (stages_1.ctx.instructionSet.popl) === undefined || (stages_1.ctx.instructionSet.ret) === undefined || (stages_1.ctx.vala) === undefined) {
        throw "Invalid identifier in HCL";
    }
    if (((stages_1.ctx.icode) === (stages_1.ctx.instructionSet.rmmovl)) || ((stages_1.ctx.icode) === (stages_1.ctx.instructionSet.pushl)) || ((stages_1.ctx.icode) === (stages_1.ctx.instructionSet.call)) || ((stages_1.ctx.icode) === (stages_1.ctx.instructionSet.mrmovl))) {
        return stages_1.ctx.vale;
    }
    if (((stages_1.ctx.icode) === (stages_1.ctx.instructionSet.popl)) || ((stages_1.ctx.icode) === (stages_1.ctx.instructionSet.ret))) {
        return stages_1.ctx.vala;
    }
}
exports.gen_mem_addr = gen_mem_addr;
function gen_mem_data() {
    if ((stages_1.ctx.icode) === undefined || (stages_1.ctx.instructionSet.rmmovl) === undefined || (stages_1.ctx.instructionSet.pushl) === undefined || (stages_1.ctx.vala) === undefined || (stages_1.ctx.icode) === undefined || (stages_1.ctx.instructionSet.call) === undefined || (stages_1.ctx.valp) === undefined) {
        throw "Invalid identifier in HCL";
    }
    if (((stages_1.ctx.icode) === (stages_1.ctx.instructionSet.rmmovl)) || ((stages_1.ctx.icode) === (stages_1.ctx.instructionSet.pushl))) {
        return stages_1.ctx.vala;
    }
    if (stages_1.ctx.icode == stages_1.ctx.instructionSet.call) {
        return stages_1.ctx.valp;
    }
}
exports.gen_mem_data = gen_mem_data;
function gen_new_pc() {
    if ((stages_1.ctx.icode) === undefined || (stages_1.ctx.instructionSet.call) === undefined || (stages_1.ctx.valc) === undefined || (stages_1.ctx.icode) === undefined || (stages_1.ctx.instructionSet.jxx) === undefined || (stages_1.ctx.bcond) === undefined || (stages_1.ctx.valc) === undefined || (stages_1.ctx.icode) === undefined || (stages_1.ctx.instructionSet.ret) === undefined || (stages_1.ctx.valm) === undefined || (stages_1.ctx.icode) === undefined || (stages_1.ctx.instructionSet.loop) === undefined || (stages_1.ctx.vale) === undefined || (stages_1.ctx.valc) === undefined || (stages_1.ctx.valp) === undefined) {
        throw "Invalid identifier in HCL";
    }
    if (stages_1.ctx.icode == stages_1.ctx.instructionSet.call) {
        return stages_1.ctx.valc;
    }
    if (stages_1.ctx.icode == stages_1.ctx.instructionSet.jxx && stages_1.ctx.bcond) {
        return stages_1.ctx.valc;
    }
    if (stages_1.ctx.icode == stages_1.ctx.instructionSet.ret) {
        return stages_1.ctx.valm;
    }
    if (stages_1.ctx.icode == stages_1.ctx.instructionSet.loop && stages_1.ctx.vale != 0) {
        return stages_1.ctx.valc;
    }
    if (1) {
        return stages_1.ctx.valp;
    }
}
exports.gen_new_pc = gen_new_pc;
function gen_need_regids() {
    if ((stages_1.ctx.icode) === undefined || (stages_1.ctx.instructionSet.rrmovl) === undefined || (stages_1.ctx.instructionSet.alu) === undefined || (stages_1.ctx.instructionSet.alui) === undefined || (stages_1.ctx.instructionSet.pushl) === undefined || (stages_1.ctx.instructionSet.popl) === undefined || (stages_1.ctx.instructionSet.irmovl) === undefined || (stages_1.ctx.instructionSet.rmmovl) === undefined || (stages_1.ctx.instructionSet.mrmovl) === undefined) {
        throw "Invalid identifier in HCL";
    }
    return ((stages_1.ctx.icode) === (stages_1.ctx.instructionSet.rrmovl)) || ((stages_1.ctx.icode) === (stages_1.ctx.instructionSet.alu)) || ((stages_1.ctx.icode) === (stages_1.ctx.instructionSet.alui)) || ((stages_1.ctx.icode) === (stages_1.ctx.instructionSet.pushl)) || ((stages_1.ctx.icode) === (stages_1.ctx.instructionSet.popl)) || ((stages_1.ctx.icode) === (stages_1.ctx.instructionSet.irmovl)) || ((stages_1.ctx.icode) === (stages_1.ctx.instructionSet.rmmovl)) || ((stages_1.ctx.icode) === (stages_1.ctx.instructionSet.mrmovl));
}
exports.gen_need_regids = gen_need_regids;
function gen_need_valC() {
    if ((stages_1.ctx.icode) === undefined || (stages_1.ctx.instructionSet.irmovl) === undefined || (stages_1.ctx.instructionSet.rmmovl) === undefined || (stages_1.ctx.instructionSet.mrmovl) === undefined || (stages_1.ctx.instructionSet.jxx) === undefined || (stages_1.ctx.instructionSet.call) === undefined || (stages_1.ctx.instructionSet.loop) === undefined) {
        throw "Invalid identifier in HCL";
    }
    return ((stages_1.ctx.icode) === (stages_1.ctx.instructionSet.irmovl)) || ((stages_1.ctx.icode) === (stages_1.ctx.instructionSet.rmmovl)) || ((stages_1.ctx.icode) === (stages_1.ctx.instructionSet.mrmovl)) || ((stages_1.ctx.icode) === (stages_1.ctx.instructionSet.jxx)) || ((stages_1.ctx.icode) === (stages_1.ctx.instructionSet.call)) || ((stages_1.ctx.icode) === (stages_1.ctx.instructionSet.loop));
}
exports.gen_need_valC = gen_need_valC;
function gen_instr_valid() {
    if ((stages_1.ctx.icode) === undefined || (stages_1.ctx.instructionSet.nop) === undefined || (stages_1.ctx.instructionSet.halt) === undefined || (stages_1.ctx.instructionSet.rrmovl) === undefined || (stages_1.ctx.instructionSet.irmovl) === undefined || (stages_1.ctx.instructionSet.rmmovl) === undefined || (stages_1.ctx.instructionSet.mrmovl) === undefined || (stages_1.ctx.instructionSet.alu) === undefined || (stages_1.ctx.instructionSet.alui) === undefined || (stages_1.ctx.instructionSet.jxx) === undefined || (stages_1.ctx.instructionSet.call) === undefined || (stages_1.ctx.instructionSet.ret) === undefined || (stages_1.ctx.instructionSet.pushl) === undefined || (stages_1.ctx.instructionSet.popl) === undefined || (stages_1.ctx.instructionSet.loop) === undefined) {
        throw "Invalid identifier in HCL";
    }
    return ((stages_1.ctx.icode) === (stages_1.ctx.instructionSet.nop)) || ((stages_1.ctx.icode) === (stages_1.ctx.instructionSet.halt)) || ((stages_1.ctx.icode) === (stages_1.ctx.instructionSet.rrmovl)) || ((stages_1.ctx.icode) === (stages_1.ctx.instructionSet.irmovl)) || ((stages_1.ctx.icode) === (stages_1.ctx.instructionSet.rmmovl)) || ((stages_1.ctx.icode) === (stages_1.ctx.instructionSet.mrmovl)) || ((stages_1.ctx.icode) === (stages_1.ctx.instructionSet.alu)) || ((stages_1.ctx.icode) === (stages_1.ctx.instructionSet.alui)) || ((stages_1.ctx.icode) === (stages_1.ctx.instructionSet.jxx)) || ((stages_1.ctx.icode) === (stages_1.ctx.instructionSet.call)) || ((stages_1.ctx.icode) === (stages_1.ctx.instructionSet.ret)) || ((stages_1.ctx.icode) === (stages_1.ctx.instructionSet.pushl)) || ((stages_1.ctx.icode) === (stages_1.ctx.instructionSet.popl)) || ((stages_1.ctx.icode) === (stages_1.ctx.instructionSet.loop));
}
exports.gen_instr_valid = gen_instr_valid;
function gen_set_cc() {
    if ((stages_1.ctx.icode) === undefined || (stages_1.ctx.instructionSet.alu) === undefined || (stages_1.ctx.instructionSet.alui) === undefined) {
        throw "Invalid identifier in HCL";
    }
    return ((stages_1.ctx.icode) === (stages_1.ctx.instructionSet.alu)) || ((stages_1.ctx.icode) === (stages_1.ctx.instructionSet.alui));
}
exports.gen_set_cc = gen_set_cc;
function gen_mem_read() {
    if ((stages_1.ctx.icode) === undefined || (stages_1.ctx.instructionSet.mrmovl) === undefined || (stages_1.ctx.instructionSet.popl) === undefined || (stages_1.ctx.instructionSet.ret) === undefined) {
        throw "Invalid identifier in HCL";
    }
    return ((stages_1.ctx.icode) === (stages_1.ctx.instructionSet.mrmovl)) || ((stages_1.ctx.icode) === (stages_1.ctx.instructionSet.popl)) || ((stages_1.ctx.icode) === (stages_1.ctx.instructionSet.ret));
}
exports.gen_mem_read = gen_mem_read;
function gen_mem_write() {
    if ((stages_1.ctx.icode) === undefined || (stages_1.ctx.instructionSet.rmmovl) === undefined || (stages_1.ctx.instructionSet.pushl) === undefined || (stages_1.ctx.instructionSet.call) === undefined) {
        throw "Invalid identifier in HCL";
    }
    return ((stages_1.ctx.icode) === (stages_1.ctx.instructionSet.rmmovl)) || ((stages_1.ctx.icode) === (stages_1.ctx.instructionSet.pushl)) || ((stages_1.ctx.icode) === (stages_1.ctx.instructionSet.call));
}
exports.gen_mem_write = gen_mem_write;
//# sourceMappingURL=hcl.js.map