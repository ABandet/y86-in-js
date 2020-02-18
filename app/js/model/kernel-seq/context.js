"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const registers_1 = require("./registers");
const memory_1 = require("./memory");
const cc_1 = require("./cc");
class Context {
    constructor() {
        this.pc = 0;
        this.valP = 0;
        this.icode = 0;
        this.ifun = 0;
        this.ra = registers_1.registers.none;
        this.rb = registers_1.registers.none;
        this.valC = new memory_1.Word();
        this.valA = new memory_1.Word();
        this.valB = new memory_1.Word();
        this.srcA = registers_1.registers.none;
        this.srcB = registers_1.registers.none;
        this.dstE = registers_1.registers.none;
        this.dstM = registers_1.registers.none;
        this.aluA = new memory_1.Word();
        this.aluB = new memory_1.Word();
        this.valE = new memory_1.Word();
        this.cc = cc_1.CC.NONE;
        this.bcond = false;
        this.valM = new memory_1.Word();
        this.instructionSet = {};
    }
}
exports.Context = Context;
//# sourceMappingURL=context.js.map