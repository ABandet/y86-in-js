import { Instruction } from '../instructionSet'

export interface IInstructionSet {
    getHandle() : Map<string, Instruction>;

    addInstructions(instructions : Instruction[]) : void;

    addInstruction(instruction : Instruction) : void;

    getDefaultInstructions() : Instruction[];

    clear() : void
}