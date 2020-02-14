"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var registers_1 = require("./registers");
var context_1 = require("./context");
var Sim = /** @class */ (function () {
    function Sim() {
        this.context = new context_1.Context();
        this.registers = new registers_1.Registers();
    }
    Sim.prototype.step = function () {
    };
    return Sim;
}());
