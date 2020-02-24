import { simStatus } from "../status";

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
}