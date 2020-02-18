"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const registers_1 = require("./registers");
const cc_1 = require("./cc");
class Context {
    constructor() {
        this.pc = 0;
        this.valP = 0;
        this.icode = 0;
        this.ifun = 0;
        this.ra = registers_1.registers.none;
        this.rb = registers_1.registers.none;
        this.valC = 0;
        this.valA = 0;
        this.valB = 0;
        this.srcA = registers_1.registers.none;
        this.srcB = registers_1.registers.none;
        this.dstE = registers_1.registers.none;
        this.dstM = registers_1.registers.none;
        this.aluA = 0;
        this.aluB = 0;
        this.valE = 0;
        this.cc = cc_1.CC.NONE;
        this.bcond = false;
        this.valM = 0;
        this.instructionSet = {};
    }
}
exports.Context = Context;
//# sourceMappingURL=context.js.map