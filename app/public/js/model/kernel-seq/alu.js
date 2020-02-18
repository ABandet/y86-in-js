"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aluEnum_1 = require("./aluEnum");
const memory_1 = require("./memory");
const cc_1 = require("./cc");
class Alu {
    constructor() {
        this.flags = [];
        for (let key in cc_1.CC) {
            this.flags.push(true);
        }
    }
    compute_alu(aluA, aluB, alu_fun) {
        if (alu_fun == aluEnum_1.alufct.A_ADD) {
            return memory_1.Word.add(aluA, aluB);
        }
        else if (alu_fun == aluEnum_1.alufct.A_AND) {
            return memory_1.Word.and(aluA, aluB);
        }
        else if (alu_fun == aluEnum_1.alufct.A_SUB) {
            return memory_1.Word.substract(aluA, aluB);
        }
        else if (alu_fun == aluEnum_1.alufct.A_XOR) {
            return memory_1.Word.xor(aluA, aluB);
        }
        else if (alu_fun == aluEnum_1.alufct.A_NONE) {
            throw "A_NONE constant setted.";
        }
        throw "Error, alu function (ifun) not founded.";
    }
    compute_cc(aluA, aluB, alu_fun) {
        let value = this.compute_alu(aluA, aluB, alu_fun);
        this.flags[cc_1.CC.ZF] = value.toNumber() == 0;
        this.flags[cc_1.CC.SF] = value.toNumber() < 0;
        if (alu_fun == aluEnum_1.alufct.A_AND) {
            if ((aluA.toNumber() < 0 == aluB.toNumber() < 0) && (aluA.toNumber() < 0 != value.toNumber() < 0)) {
                this.flags[cc_1.CC.OF] = true;
            }
        }
        else if (alu_fun == aluEnum_1.alufct.A_SUB) {
            if ((aluA.toNumber() > 0 == aluB.toNumber() < 0) && (aluB.toNumber() < 0 != value.toNumber() < 0)) {
                this.flags[cc_1.CC.OF] = true;
            }
        }
        else {
            this.flags[cc_1.CC.OF] = false;
        }
    }
}
exports.Alu = Alu;
//# sourceMappingURL=alu.js.map