let yasUtility = new function() {
    this.virtualAddress = 0;
    this.lineNumber = 0;
    this.list = [];
    this.labelsMap = [];

    this.registers = {}
    this.instructionSet = {}

    this.cleanParser = () => {
        this.virtualAddress = 0;
        this.lineNumber = 0;
        this.list = [];
        this.labelsMap = [];
    };
}