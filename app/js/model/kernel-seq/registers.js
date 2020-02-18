"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const memory_1 = require("./memory");
var registers;
(function (registers) {
    registers[registers["eax"] = 0] = "eax";
    registers[registers["ebx"] = 1] = "ebx";
    registers[registers["ecx"] = 2] = "ecx";
    registers[registers["edx"] = 3] = "edx";
    registers[registers["esp"] = 4] = "esp";
    registers[registers["esi"] = 5] = "esi";
    registers[registers["ebp"] = 6] = "ebp";
    registers[registers["edi"] = 7] = "edi";
    registers[registers["none"] = 8] = "none";
})(registers || (registers = {}));
exports.registers = registers;
class Registers {
    constructor() {
        this.content = [];
        for (let key in registers) {
            let empty_word = new memory_1.Word();
            this.content.push(empty_word);
        }
    }
    reset() {
        for (let key in registers) {
            let empty_word = new memory_1.Word();
            this.content[key] = empty_word;
        }
    }
    write(register, value) {
        this.content[register] = value;
    }
    read(register) {
        return this.content[register];
    }
}
exports.Registers = Registers;
//# sourceMappingURL=registers.js.map