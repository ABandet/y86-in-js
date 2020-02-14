"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Context = /** @class */ (function () {
    function Context() {
        // Inner state
        this.pc = 0;
        this.status = 0;
        this.valP = 0;
        // Instruction
        this.icode = 0;
        this.ifun = 0;
        this.ra = 0;
        this.rb = 0;
        this.valC = 0;
        // Registers output
        this.valA = 0;
        this.valB = 0;
        this.srcA = 0;
        this.srcB = 0;
        // Registers input
        this.dstE = 0;
        this.dstM = 0;
        // ALU input
        this.aluA = 0;
        this.aluB = 0;
        // ALU output
        this.valE = 0;
        // Condition flag
        this.bch = 0;
        // Memory output
        this.valM = 0;
    }
    return Context;
}());
exports.Context = Context;
