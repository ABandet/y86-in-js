import {alufct} from "./aluEnum";
import {CC} from "./cc";

class Alu {
    flags : boolean[] = [];

    constructor() {
        for (let key in CC){
            this.flags.push(true);
        }
    }

    compute_alu(aluA : number, aluB : number, alu_fun : alufct){
        if (alu_fun == alufct.A_ADD) {
            return aluA + aluB;
        }
        else if (alu_fun == alufct.A_AND) {
            return aluA & aluB;
        }
        else if (alu_fun == alufct.A_SUB) {
            return aluA - aluB;
        }
        else if (alu_fun == alufct.A_XOR) {
            return aluA ^ aluB;
        }
        else if (alu_fun == alufct.A_NONE) {
            throw "A_NONE constant setted."
        }
        throw "Error, alu function (ifun) not founded."
    }

    compute_cc(aluA : number, aluB : number, alu_fun : number) {
        let value = this.compute_alu(aluA, aluB, alu_fun);

        // set Zero flag
        this.flags[CC.ZF] = value == 0;
        // set Sign flag
        this.flags[CC.SF] = value < 0;
        // set Overflow flag
        if (alu_fun == alufct.A_AND) {
            // case A and B have same sign but value has opposite sign
            if ((aluA < 0 == aluB < 0) && (aluA < 0 != value < 0)) {
                this.flags[CC.OF] = true;
            }
        }
        else if(alu_fun == alufct.A_SUB) {
            // case A and B have different sign but value and B have different sign too.
            if ((aluA > 0 == aluB < 0) && (aluB < 0 != value < 0)) {
                this.flags[CC.OF] = true;
            }
        }
        else {
            this.flags[CC.OF] = false;
        }
    }
}


export { Alu };