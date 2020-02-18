import { registers } from "./registers"
import { Memory } from "./memory";
import { CC } from "./cc";

class Context {
    // Inner state
    pc      : number = 0;
    valP    : number = 0;

    // Instruction
    icode   : number = 0;
    ifun    : number = 0;
    ra      : number = registers.none;
    rb      : number = registers.none;
    valC    : number = 0;

    // Registers output
    valA    : number = 0;
    valB    : number = 0;
    srcA    : number = registers.none;
    srcB    : number = registers.none;

    // Registers input
    dstE    : number = registers.none;
    dstM    : number = registers.none;

    // ALU input
    aluA    : number = 0;
    aluB    : number = 0;

    // ALU output
    valE    : number = 0;

    // Condition flag
    cc      : CC = CC.NONE
    bcond   : boolean = false;

    // Memory output
    valM    : number = 0;

    instructionSet = {}
}

export {Context};