import {alufct} from "./aluEnum";
import {Word} from "./memory";

function alu_compute(aluA : Word, aluB : Word, alu_fun : alufct){
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

export { alu_compute };