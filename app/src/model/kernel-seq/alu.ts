import {alufct} from "./aluEnum";

enum JMP_enum {
    J_YES,
    J_LE,
    J_L,
    J_E,
    J_NE,
    J_GE,
    J_G
}

enum CC {
    NONE = 0,
    ZF = 1,
    SF = 2,
    OF = 3,
}

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
        let result = new  Uint32Array(1);


        if (alu_fun == alufct.A_ADD) {
            result[0] = val[0] + val[1]
            return result[0];
        }
        else if (alu_fun == alufct.A_AND) {
            result[0] = val[0] & val[1]
            return result[0];
        }
        else if (alu_fun == alufct.A_SUB) {
            result[0] = val[0] - val[1]
            return result[0];
        }
        else if (alu_fun == alufct.A_XOR) {
            result[0] = val[0] ^ val[1]
            return result[0];
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

    compute_bch(ifun: number) {
        if (ifun == JMP_enum.J_YES) return true;
        if (ifun == JMP_enum.J_LE) return this._boolean_xor(this.flags[CC.SF], this.flags[CC.OF]) || this.flags[CC.ZF];
        if (ifun == JMP_enum.J_L) return this._boolean_xor(this.flags[CC.SF], this.flags[CC.OF]);
        if (ifun == JMP_enum.J_E) return this.flags[CC.ZF];
        if (ifun == JMP_enum.J_NE) return !this.flags[CC.ZF];
        if (ifun == JMP_enum.J_GE) return this._boolean_xor(this._boolean_xor(this.flags[CC.SF], this.flags[CC.OF]), true);
        if (ifun == JMP_enum.J_G) return this._boolean_xor(this._boolean_xor(this.flags[CC.SF], this.flags[CC.OF]), true) && this._boolean_xor(this.flags[CC.ZF], true);
        return false;
    }

    _boolean_xor(boolA :boolean, boolB :boolean){
        return (boolA && !boolB) || (!boolA && boolB);
    }
}


export { Alu };