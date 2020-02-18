class SimulatorException {
    private _content = ""
    
    constructor(msg = "Nor error informations") {
        this._content += msg
    }

    toString() : string {
        return this._content
    }
}

class MemoryException extends SimulatorException {
    constructor(address : number) {
        super("Error while accessing address 0x" + address.toString(16))
    }
}

export { SimulatorException, MemoryException }