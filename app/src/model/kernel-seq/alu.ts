import {alufct} from "./aluEnum";
import {Word} from "./memory";
import {CC} from "./cc";

class Alu {
    flags : boolean[] = [];

    constructor() {
        for (let key in CC){
            this.flags.push(true);
        }
    }

    compute_alu(aluA : Word, aluB : Word, alu_fun : alufct){
        if (alu_fun == alufct.A_ADD) {
            return Word.add(aluA, aluB)
        }
        else if (alu_fun == alufct.A_AND) {
            return Word.and(aluA, aluB)
        }
        else if (alu_fun == alufct.A_SUB) {
            return Word.substract(aluA, aluB)
        }
        else if (alu_fun == alufct.A_XOR) {
            return Word.xor(aluA, aluB)
        }
        else if (alu_fun == alufct.A_NONE) {
            throw "A_NONE constant setted."
        }
        throw "Error, alu function (ifun) not founded."
    }

    compute_cc(aluA : Word, aluB : Word, alu_fun : number) {
        let value = this.compute_alu(aluA, aluB, alu_fun);

        // set Zero flag
        this.flags[CC.ZF] = value.toNumber() == 0;
        // set Sign flag
        this.flags[CC.SF] = value.toNumber() < 0;
        // set Overflow flag
        if (alu_fun == alufct.A_AND) {
            // case A and B have same sign but value has opposite sign
            if ((aluA.toNumber() < 0 == aluB.toNumber() < 0) && (aluA.toNumber() < 0 != value.toNumber() < 0)) {
                this.flags[CC.OF] = true;
            }
        }
        else if(alu_fun == alufct.A_SUB) {
            // case A and B have different sign but value and B have different sign too.
            if ((aluA.toNumber() > 0 == aluB.toNumber() < 0) && (aluB.toNumber() < 0 != value.toNumber() < 0)) {
                this.flags[CC.OF] = true;
            }
        }
        else {
            this.flags[CC.OF] = false;
        }
    }
}


export { Alu };