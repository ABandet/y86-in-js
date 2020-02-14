function gen_srcA() {

    if(((icode) === (I_RRMOVL)) || ((icode) === (I_RMMOVL)) || ((icode) === (I_ALU)) || ((icode) === (I_PUSHL))) { return ra; }

    if(((icode) === (I_POPL)) || ((icode) === (I_RET))) { return REG_ESP; }

    if(1) { return REG_NONE; }

}

function gen_srcB() {

    if(((icode) === (I_ALU)) || ((icode) === (I_ALUI)) || ((icode) === (I_RMMOVL)) || ((icode) === (I_MRMOVL))) { return rb; }

    if(((icode) === (I_PUSHL)) || ((icode) === (I_POPL)) || ((icode) === (I_CALL)) || ((icode) === (I_RET))) { return REG_ESP; }

    if(((icode) === (I_LOOP))) { return REG_ECX; }

    if(1) { return REG_NONE; }

}

function gen_dstE() {

    if(((icode) === (I_RRMOVL)) || ((icode) === (I_IRMOVL)) || ((icode) === (I_ALU)) || ((icode) === (I_ALUI))) { return rb; }

    if(((icode) === (I_PUSHL)) || ((icode) === (I_POPL)) || ((icode) === (I_CALL)) || ((icode) === (I_RET))) { return REG_ESP; }

    if(((icode) === (I_LOOP))) { return REG_ECX; }

    if(1) { return REG_NONE; }

}

function gen_dstM() {

    if(((icode) === (I_MRMOVL)) || ((icode) === (I_POPL))) { return ra; }

    if(1) { return REG_NONE; }

}

function gen_aluA() {

    if(((icode) === (I_RRMOVL)) || ((icode) === (I_ALU))) { return vala; }

    if(((icode) === (I_IRMOVL)) || ((icode) === (I_RMMOVL)) || ((icode) === (I_MRMOVL)) || ((icode) === (I_ALUI))) { return valc; }

    if(((icode) === (I_CALL)) || ((icode) === (I_PUSHL))) { return -4; }

    if(((icode) === (I_RET)) || ((icode) === (I_POPL))) { return 4; }

    if(((icode) === (I_LOOP))) { return -1; }

}

function gen_aluB() {

    if(((icode) === (I_RMMOVL)) || ((icode) === (I_MRMOVL)) || ((icode) === (I_ALU)) || ((icode) === (I_ALUI)) || ((icode) === (I_CALL)) || ((icode) === (I_PUSHL)) || ((icode) === (I_RET)) || ((icode) === (I_POPL)) || ((icode) === (I_LOOP))) { return valb; }

    if(((icode) === (I_RRMOVL)) || ((icode) === (I_IRMOVL))) { return 0; }

}

function gen_alufun() {

    if(((icode) === (I_ALU)) || ((icode) === (I_ALUI))) { return ifun; }

    if(1) { return A_ADD; }

}

function gen_mem_addr() {

    if(((icode) === (I_RMMOVL)) || ((icode) === (I_PUSHL)) || ((icode) === (I_CALL)) || ((icode) === (I_MRMOVL))) { return vale; }

    if(((icode) === (I_POPL)) || ((icode) === (I_RET))) { return vala; }

}

function gen_mem_data() {

    if(((icode) === (I_RMMOVL)) || ((icode) === (I_PUSHL))) { return vala; }

    if(icode == I_CALL) { return valp; }

}

function gen_new_pc() {

    if(icode == I_CALL) { return valc; }

    if(icode == I_JXX && bcond) { return valc; }

    if(icode == I_RET) { return valm; }

    if(icode == I_LOOP && vale != 0) { return valc; }

    if(1) { return valp; }

}

function gen_need_regids() {
    return ((icode) === (I_RRMOVL)) || ((icode) === (I_ALU)) || ((icode) === (I_ALUI)) || ((icode) === (I_PUSHL)) || ((icode) === (I_POPL)) || ((icode) === (I_IRMOVL)) || ((icode) === (I_RMMOVL)) || ((icode) === (I_MRMOVL));
}

function gen_need_valC() {
    return ((icode) === (I_IRMOVL)) || ((icode) === (I_RMMOVL)) || ((icode) === (I_MRMOVL)) || ((icode) === (I_JXX)) || ((icode) === (I_CALL)) || ((icode) === (I_LOOP));
}

function gen_instr_valid() {
    return ((icode) === (I_NOP)) || ((icode) === (I_HALT)) || ((icode) === (I_RRMOVL)) || ((icode) === (I_IRMOVL)) || ((icode) === (I_RMMOVL)) || ((icode) === (I_MRMOVL)) || ((icode) === (I_ALU)) || ((icode) === (I_ALUI)) || ((icode) === (I_JXX)) || ((icode) === (I_CALL)) || ((icode) === (I_RET)) || ((icode) === (I_PUSHL)) || ((icode) === (I_POPL)) || ((icode) === (I_LOOP));
}

function gen_set_cc() {
    return ((icode) === (I_ALU)) || ((icode) === (I_ALUI));
}

function gen_mem_read() {
    return ((icode) === (I_MRMOVL)) || ((icode) === (I_POPL)) || ((icode) === (I_RET));
}

function gen_mem_write() {
    return ((icode) === (I_RMMOVL)) || ((icode) === (I_PUSHL)) || ((icode) === (I_CALL));
}

