import { simStatus } from "../status";
import { IInstructionSet } from "./IInstructionSet";

export interface ISimulator {
    step() : simStatus
    reset() : void
    getStageView() : any 
    getRegistersView() : any
    getMemoryView(beginAddress : number, endAddres : number) : any
    getStatusView() : any
    loadProgram(yo : string) : void
    insertHclCode(js : string) : void
    getErrorMessage() : string
    setInstructionSet(set : IInstructionSet) : void
}