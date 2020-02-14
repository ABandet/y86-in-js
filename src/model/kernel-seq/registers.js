"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
})(registers || (registers = {}));
exports.registers = registers;
/**
 * Class who contains all the registers of the CPU.
 * Based on the registers enumerate, it create automatically all the registers and init them at 0.
 */
var Registers = /** @class */ (function () {
    function Registers() {
        this.init();
    }
    /**
     * Create all registers and set them to the default value 0.
     */
    Registers.prototype.init = function () {
        for (var key in registers) {
            this.content[key] = 0;
        }
    };
    /**
     * Just a Registers.init wrapper.
     */
    Registers.prototype.reset = function () {
        this.init();
    };
    /**
     * Write value in register @param register.
     * @param register
     * @param value
     */
    Registers.prototype.write = function (register, value) {
        if (value < 0) {
            throw "Forbiden value in Registers.write(): Must be greater than 0.";
        }
        this.content[register] = value;
    };
    /**
     * Return value contains in one register.
     * @param register
     */
    Registers.prototype.read = function (register) {
        return this.content[register];
    };
    return Registers;
}());
exports.Registers = Registers;
