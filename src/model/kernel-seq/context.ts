class Context {
    // Inner state
    pc      : number = 0;
    status  : number = 0;
    valP    : number = 0;

    // Instruction
    icode   : number = 0;
    ifun    : number = 0;
    ra      : number = 0;
    rb      : number = 0;
    valC    : number = 0;

    // Registers output
    valA    : number = 0;
    valB    : number = 0;
    srcA    : number = 0;
    srcB    : number = 0;

    // Registers input
    dstE    : number = 0;
    dstM    : number = 0;

    // ALU input
    aluA    : number = 0;
    aluB    : number = 0;

    // ALU output
    valE    : number = 0;

    // Condition flag
    bch     : number = 0;

    // Memory output
    valM    : number = 0;
}