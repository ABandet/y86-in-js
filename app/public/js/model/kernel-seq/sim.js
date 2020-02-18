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
const memory_1 = require("./memory");
const stages = __importStar(require("./stages"));
const status_1 = require("./status");
const alu_1 = require("./alu");
class Sim {
    constructor() {
        this.context = new context_1.Context();
        this.registers = new registers_1.Registers();
        this.memory = new memory_1.Memory();
        this.alu = new alu_1.Alu();
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
}
exports.Sim = Sim;
//# sourceMappingURL=sim.js.map