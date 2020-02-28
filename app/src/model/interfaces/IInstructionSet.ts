import { Instruction } from '../instructionSet'

export interface IInstructionSet {
    getHandle() : Map<string, Instruction>;

    setInstructions(instructions : Instruction[]) : void;

    addInstruction(instruction : Instruction) : void;

    clear() : void
}