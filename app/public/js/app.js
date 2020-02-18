(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function (global){
simSeq = require("./model/kernel-seq/sim.js")

function onCompile() {
    try {
        let hclCode = document.getElementById("editor").value
        let jsCode = hcl2js(hclCode)
        document.getElementById("output").value = jsCode
        let sim = new simSeq.Sim()
        sim.step()
        alert("Error when running step : " + sim.errorMessage)
    } catch (error) {
        alert(error)
    }
}

global.onCompile = onCompile
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./model/kernel-seq/sim.js":8}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var alufct;
(function (alufct) {
    alufct[alufct["A_ADD"] = 0] = "A_ADD";
    alufct[alufct["A_AND"] = 1] = "A_AND";
    alufct[alufct["A_SUB"] = 2] = "A_SUB";
    alufct[alufct["A_XOR"] = 3] = "A_XOR";
    alufct[alufct["A_NONE"] = 4] = "A_NONE";
})(alufct || (alufct = {}));
exports.alufct = alufct;
;

},{}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CC;
(function (CC) {
    CC[CC["NONE"] = 0] = "NONE";
    CC[CC["ZF"] = 1] = "ZF";
    CC[CC["SF"] = 2] = "SF";
    CC[CC["OF"] = 3] = "OF";
})(CC = exports.CC || (exports.CC = {}));

},{}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const registers_1 = require("./registers");
const memory_1 = require("./memory");
const cc_1 = require("./cc");
class Context {
    constructor() {
        this.pc = 0;
        this.status = 0;
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

},{"./cc":3,"./memory":6,"./registers":7}],5:[function(require,module,exports){
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

},{"./stages":9}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Memory {
    constructor() {
        this.content = [];
    }
    writeRegister(address, register) {
        for (var i = 0; i < Word.SIZE; i++) {
            this._writeByteInMemory(address + i, register.getByte(i));
        }
    }
    readRegister(address) {
        let register = new Word();
        for (var i = 0; i < Word.SIZE; i++) {
            register.setByte(i, this.readByte(address + i));
        }
        return register;
    }
    readByte(address) {
        const byteOffset = address % Word.SIZE;
        return this._getWordView(address).getByte(byteOffset);
    }
    loadProgram(yo) {
        const lines = yo.split("\n");
        lines.forEach((line, index) => {
            const splittedLine = line.split("|");
            if (splittedLine.length != 2 && splittedLine.length != 1) {
                throw "Line " + index + " : Invalid format";
            }
            if (splittedLine.length == 2) {
                const instructionsWithAddress = splittedLine[0];
                const instructionsWithAddressSplitted = instructionsWithAddress.split(":");
                if (instructionsWithAddressSplitted.length != 2 && instructionsWithAddressSplitted.length != 1) {
                    throw "Line " + index + " : Invalid format";
                }
                if (instructionsWithAddressSplitted.length == 2) {
                    const address = Number(instructionsWithAddressSplitted[0]);
                    const instruction = Number("0x" + instructionsWithAddressSplitted[1].trim());
                    if (!Number.isNaN(address) && !Number.isNaN(instruction)) {
                        const bytes = Byte.numberToBytes(instruction);
                        let addressOffset = 0;
                        for (let i = bytes.length - 1; i >= 0; i--) {
                            this._writeByteInMemory(address + addressOffset, bytes[i]);
                            addressOffset++;
                        }
                    }
                }
            }
        });
    }
    _writeByteInMemory(address, byte) {
        const byteOffset = address % Word.SIZE;
        this._getWord(address).setByte(byteOffset, byte);
    }
    _getWord(address) {
        Memory._checkPositionIsValid(address);
        const wordPosition = Math.floor(address / Word.SIZE);
        let wordAtAddress = this.content[wordPosition];
        if (!wordAtAddress) {
            wordAtAddress = new Word();
            this.content[wordPosition] = wordAtAddress;
        }
        return wordAtAddress;
    }
    _getWordView(address) {
        Memory._checkPositionIsValid(address);
        const wordPosition = Math.floor(address / Word.SIZE);
        let wordAtAddress = this.content[wordPosition];
        if (!wordAtAddress) {
            wordAtAddress = new Word();
        }
        return wordAtAddress;
    }
    static _checkPositionIsValid(address) {
        let position = Math.floor(address / Word.SIZE);
        let maxPosition = Math.floor(Memory.LAST_ADDRESS / Word.SIZE);
        if (position < 0 || position > maxPosition) {
            throw "The address must be in [0;" + (Memory.LAST_ADDRESS + Word.SIZE - 1) + "] (current = " + address.toString(16) + ")";
        }
    }
}
exports.Memory = Memory;
Memory.LAST_ADDRESS = 0x1ffc;
class Word {
    constructor(value = 0) {
        this._value = 0;
        if (value < 0 || value > Word.MAX_VALUE) {
            throw "Value is expected to be in [0;0xFFFFFFFF] (current : " + value.toString(16) + ")";
        }
        this._value = value;
    }
    toNumber() {
        return this._value;
    }
    setByte(position, value) {
        Word._checkPositionIsValid(position);
        const offsetInBits = position * 8;
        const mask = shiftLeft(0xff, offsetInBits);
        const byteToSet = shiftLeft(value.toNumber(), offsetInBits);
        this._value |= mask;
        this._value ^= byteToSet;
        this._value ^= mask;
    }
    getByte(position) {
        Word._checkPositionIsValid(position);
        const offsetInBits = position * 8;
        return new Byte((this._value >>> offsetInBits) & 0xff);
    }
    equals(other) {
        for (let i = 0; i < Word.SIZE; i++) {
            if (this.getByte(i).toNumber() != other.getByte(i).toNumber()) {
                return false;
            }
        }
        return true;
    }
    static add(left, right) {
        return new Word(left._value + right._value);
    }
    static substract(left, right) {
        return new Word(left._value - right._value);
    }
    static xor(left, right) {
        return new Word(left._value ^ right._value);
    }
    static and(left, right) {
        return new Word(left._value & right._value);
    }
    static _checkPositionIsValid(position) {
        if (position < 0 || position >= Word.SIZE) {
            throw "Position must be in [0;" + (Word.SIZE - 1) + "]";
        }
    }
}
exports.Word = Word;
Word.MAX_VALUE = 0xFFFFFFFF;
Word.SIZE = 4;
class Byte {
    constructor(value = 0) {
        this._value = 0;
        Byte._checkNumberIsByte(value);
        this._value = value;
    }
    toNumber() {
        return this._value;
    }
    HI4() {
        return (this._value >> 4) & 0xf;
    }
    LO4() {
        return this._value & 0xf;
    }
    static isByte(value) {
        return value >= 0 && value <= 0xff;
    }
    static numberToBytes(value) {
        let bytes = [];
        while (value != 0) {
            const byte = value & 0xff;
            bytes.push(new Byte(byte));
            value = (value - byte) / 256;
        }
        return bytes;
    }
    static _checkNumberIsByte(value) {
        if (!Byte.isByte(value)) {
            throw "A byte must be in [0;255] (current = " + value;
        }
    }
}
exports.Byte = Byte;
function shiftLeft(value, nBits) {
    return value * Math.pow(2, nBits);
}

},{}],7:[function(require,module,exports){
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

},{"./memory":6}],8:[function(require,module,exports){
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

},{"./aluEnum":2,"./context":4,"./memory":6,"./registers":7,"./stages":9,"./status":10}],9:[function(require,module,exports){
"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const memory_1 = require("./memory");
const registers_1 = require("./registers");
const hcl = __importStar(require("./hcl"));
var gen_srcA = hcl.gen_srcA;
var gen_srcB = hcl.gen_srcB;
var gen_dstE = hcl.gen_dstE;
var gen_dstM = hcl.gen_dstM;
var gen_aluA = hcl.gen_aluA;
var gen_aluB = hcl.gen_aluB;
var gen_alufun = hcl.gen_alufun;
var gen_mem_addr = hcl.gen_mem_addr;
var gen_mem_data = hcl.gen_mem_data;
var gen_new_pc = hcl.gen_new_pc;
var gen_need_regids = hcl.gen_need_regids;
var gen_need_valC = hcl.gen_need_valC;
var gen_instr_valid = hcl.gen_instr_valid;
var gen_set_cc = hcl.gen_set_cc;
var gen_mem_read = hcl.gen_mem_read;
var gen_mem_write = hcl.gen_mem_write;
exports.ctx = {};
function fetch(sim) {
    let valp = sim.context.pc;
    let byte = sim.memory.readByte(valp);
    valp++;
    sim.context.icode = byte.HI4();
    sim.context.ifun = byte.LO4();
    exports.ctx = {
        instructionSet: sim.context.instructionSet,
        icode: sim.context.icode,
    };
    if (gen_need_regids()) {
        byte = sim.memory.readByte(valp);
        valp++;
        sim.context.ra = byte.HI4();
        sim.context.rb = byte.LO4();
    }
    else {
        sim.context.ra = registers_1.registers.none;
        sim.context.rb = registers_1.registers.none;
    }
    if (gen_need_valC()) {
        sim.context.valC = sim.memory.readRegister(valp);
        valp += memory_1.Word.SIZE;
    }
    else {
        sim.context.valC = new memory_1.Word(0);
    }
}
exports.fetch = fetch;
function decode(sim) {
    sim.context.srcA = gen_srcA();
    if (sim.context.srcA != registers_1.registers.none) {
        sim.context.valA = new memory_1.Word(sim.context.srcA);
    }
    else {
        sim.context.valA = new memory_1.Word(0);
    }
    sim.context.srcB = gen_srcB();
    if (sim.context.srcB != registers_1.registers.none) {
        sim.context.valB = new memory_1.Word(sim.context.srcB);
    }
    else {
        sim.context.valB = new memory_1.Word(0);
    }
    sim.context.dstE = gen_dstE();
    sim.context.dstM = gen_dstM();
}
exports.decode = decode;
function execute(sim) {
}
exports.execute = execute;
function memory(sim) {
}
exports.memory = memory;
function writeBack(sim) {
}
exports.writeBack = writeBack;
function updatePC(sim) {
    sim.context.pc = gen_new_pc();
}
exports.updatePC = updatePC;

},{"./hcl":5,"./memory":6,"./registers":7}],10:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var simStatus;
(function (simStatus) {
    simStatus[simStatus["BUBBLE"] = 0] = "BUBBLE";
    simStatus[simStatus["AOK"] = 1] = "AOK";
    simStatus[simStatus["HALT"] = 2] = "HALT";
    simStatus[simStatus["ADDR"] = 3] = "ADDR";
    simStatus[simStatus["INSTR"] = 4] = "INSTR";
    simStatus[simStatus["PIPE"] = 5] = "PIPE";
})(simStatus = exports.simStatus || (exports.simStatus = {}));

},{}]},{},[1]);
