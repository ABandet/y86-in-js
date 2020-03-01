import { ISimulator } from "../../model/interfaces/ISimulator";
import { ICompiler } from "../../model/interfaces/ICompiler";
import { IInstructionSet } from "../../model/interfaces/IInstructionSet";

export interface IKernelController {
    useKernel(name : string)    : void;
    getAvailableKernelNames()   : string[];

    getSim()            : ISimulator;
    getYas()            : ICompiler;
    getHcl2js()         : ICompiler;
    getInstructionSet() : IInstructionSet
}