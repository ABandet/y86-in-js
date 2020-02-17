import { registers } from "./registers"
import { Word } from "./memory";
import { CC } from "./cc";

class Context {
    // Inner state
    pc      : number = 0;
    status  : number = 0;
    valP    : number = 0;

    // Instruction
    icode   : number = 0;
    ifun    : number = 0;
    ra      : number = registers.none;
    rb      : number = registers.none;
    valC    : Word = new Word();

    // Registers output
    valA    : Word = new Word();
    valB    : Word = new Word();
    srcA    : number = registers.none;
    srcB    : number = registers.none;

    // Registers input
    dstE    : number = registers.none;
    dstM    : number = registers.none;

    // ALU input
    aluA    : Word = new Word();
    aluB    : Word = new Word();

    // ALU output
    valE    : Word = new Word();

    // Condition flag
    cc      : CC = CC.NONE
    bcond   : boolean = false;

    // Memory output
    valM    : Word = new Word();

    instructionSet = {}
}

export {Context};