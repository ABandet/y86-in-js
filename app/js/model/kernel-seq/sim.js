"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const registers_1 = require("./registers");
const context_1 = require("./context");
const aluEnum_1 = require("./aluEnum");
const memory_1 = require("./memory");
const stages = __importStar(require("./stages"));
const status_1 = require("./status");
class Sim {
    constructor() {
        this.context = new context_1.Context();
        this.registers = new registers_1.Registers();
        this.memory = new memory_1.Memory();
        this.status = status_1.simStatus.AOK;
        this.errorMessage = "";
    }
    step() {
        try {
            stages.decode(this);
            stages.fetch(this);
            stages.execute(this);
            stages.memory(this);
            stages.writeBack(this);
        }
        catch (error) {
            this.status = status_1.simStatus.HALT;
            this.errorMessage = error;
        }
        return this.status;
    }
    alu() {
        if (this.context.ifun > 4 || this.context.ifun < 0) {
            throw "Invalid ifun in Sim.alu()";
        }
        if (this.context.ifun == aluEnum_1.alufct.A_ADD) {
            this.context.valE = memory_1.Word.add(this.context.aluA, this.context.aluB);
        }
        else if (this.context.ifun == aluEnum_1.alufct.A_AND) {
            this.context.valE = memory_1.Word.and(this.context.aluA, this.context.aluB);
        }
        else if (this.context.ifun == aluEnum_1.alufct.A_SUB) {
            this.context.valE = memory_1.Word.substract(this.context.aluA, this.context.aluB);
        }
        else if (this.context.ifun == aluEnum_1.alufct.A_XOR) {
            this.context.valE = memory_1.Word.xor(this.context.aluA, this.context.aluB);
        }
        else if (this.context.ifun == aluEnum_1.alufct.A_NONE) {
            throw "A_NONE constante setted.";
        }
        throw "Error, alu function (ifun) not founded.";
    }
}
exports.Sim = Sim;
//# sourceMappingURL=sim.js.map