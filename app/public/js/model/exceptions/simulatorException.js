"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SimulatorException {
    constructor(msg = "Nor error informations") {
        this._content = "";
        this._content += msg;
    }
    toString() {
        return this._content;
    }
}
exports.SimulatorException = SimulatorException;
class MemoryException extends SimulatorException {
    constructor(address) {
        super("Error while accessing address 0x" + address.toString(16));
    }
}
exports.MemoryException = MemoryException;
class HclException extends SimulatorException {
    constructor(error) {
        super("HCL : " + error);
    }
}
exports.HclException = HclException;
//# sourceMappingURL=simulatorException.js.map