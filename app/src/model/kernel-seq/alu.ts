import {alufct} from "./aluEnum";
import {CC} from "./cc";

class Alu {
    flags : boolean[] = [];

    constructor() {
        for (let key in CC){
            this.flags.push(false);
        }
    }

    compute_alu(aluA : number, aluB : number, alu_fun : alufct){
        if (aluA > 0xFFFFFFFF || aluB > 0xFFFFFFFF){
            throw "Error in compute_alu : Values are more than 32bits long."
        }

        // cast into 32bit int
        let val = new Uint32Array(2);
        val[0] = aluA;
        val[1] = aluB;


        if (alu_fun == alufct.A_ADD) {
            return val[0] + val[1];
        }
        else if (alu_fun == alufct.A_AND) {
            return val[0] & val[1];
        }
        else if (alu_fun == alufct.A_SUB) {
            return val[0] - val[1];
        }
        else if (alu_fun == alufct.A_XOR) {
            return val[0] ^ val[1];
        }
        else if (alu_fun == alufct.A_NONE) {
            throw "A_NONE constant setted."
        }
        throw "Error, alu function (ifun) not founded."
    }

    compute_cc(aluA : number, aluB : number, alu_fun : number) {

        // get value and cast into uint32
        let val = new Uint32Array(1);
        val[0] = this.compute_alu(aluA, aluB, alu_fun);

        // sign bits
        let sgnA, sgnB, sgnV, signBit = 0x80000000;
        sgnA = !!(aluA & signBit);
        sgnB = !!(aluB & signBit);
        sgnV = !!(val[0] & signBit);

        // set Zero flag
        this.flags[CC.ZF] = val[0] == 0;
        // set Sign flag
        this.flags[CC.SF] = val[0] > 0x7FFFFFFF;
        // set Overflow flag
        if (alu_fun == alufct.A_ADD)
            this.flags[CC.OF] = (sgnA && sgnB && !sgnV) || (!sgnA && !sgnB && sgnV);
        else if (alu_fun == alufct.A_SUB) {
            this.flags[CC.OF] = (sgnA != sgnB) && (sgnB == sgnV);
        }
        else {
            this.flags[CC.OF] = false;
        }
    }
}


export { Alu };