import { ctx } from "./stages"

export function gen_srcA() {

   // Checks if some identifiers are undefined
   if((ctx.icode) === undefined || (ctx.instructionSet.rrmovl) === undefined || (ctx.instructionSet.rmmovl) === undefined || (ctx.instructionSet.alu) === undefined || (ctx.instructionSet.pushl) === undefined || (ctx.ra) === undefined || (ctx.icode) === undefined || (ctx.instructionSet.popl) === undefined || (ctx.instructionSet.ret) === undefined || (ctx.registers.esp) === undefined || (ctx.registers.none) === undefined) { throw "Invalid identifier in HCL" }

   if(((ctx.icode) === (ctx.instructionSet.rrmovl)) || ((ctx.icode) === (ctx.instructionSet.rmmovl)) || ((ctx.icode) === (ctx.instructionSet.alu)) || ((ctx.icode) === (ctx.instructionSet.pushl))) { return ctx.ra; } 

   if(((ctx.icode) === (ctx.instructionSet.popl)) || ((ctx.icode) === (ctx.instructionSet.ret))) { return ctx.registers.esp; } 

   if(1) { return ctx.registers.none; } 

}

export function gen_srcB() {

   // Checks if some identifiers are undefined
   if((ctx.icode) === undefined || (ctx.instructionSet.alu) === undefined || (ctx.instructionSet.alui) === undefined || (ctx.instructionSet.rmmovl) === undefined || (ctx.instructionSet.mrmovl) === undefined || (ctx.rb) === undefined || (ctx.icode) === undefined || (ctx.instructionSet.pushl) === undefined || (ctx.instructionSet.popl) === undefined || (ctx.instructionSet.call) === undefined || (ctx.instructionSet.ret) === undefined || (ctx.registers.esp) === undefined || (ctx.icode) === undefined || (ctx.instructionSet.loop) === undefined || (ctx.registers.ecx) === undefined || (ctx.registers.none) === undefined) { throw "Invalid identifier in HCL" }

   if(((ctx.icode) === (ctx.instructionSet.alu)) || ((ctx.icode) === (ctx.instructionSet.alui)) || ((ctx.icode) === (ctx.instructionSet.rmmovl)) || ((ctx.icode) === (ctx.instructionSet.mrmovl))) { return ctx.rb; } 

   if(((ctx.icode) === (ctx.instructionSet.pushl)) || ((ctx.icode) === (ctx.instructionSet.popl)) || ((ctx.icode) === (ctx.instructionSet.call)) || ((ctx.icode) === (ctx.instructionSet.ret))) { return ctx.registers.esp; } 

   if(((ctx.icode) === (ctx.instructionSet.loop))) { return ctx.registers.ecx; } 

   if(1) { return ctx.registers.none; } 

}

export function gen_dstE() {

   // Checks if some identifiers are undefined
   if((ctx.icode) === undefined || (ctx.instructionSet.rrmovl) === undefined || (ctx.instructionSet.irmovl) === undefined || (ctx.instructionSet.alu) === undefined || (ctx.instructionSet.alui) === undefined || (ctx.rb) === undefined || (ctx.icode) === undefined || (ctx.instructionSet.pushl) === undefined || (ctx.instructionSet.popl) === undefined || (ctx.instructionSet.call) === undefined || (ctx.instructionSet.ret) === undefined || (ctx.registers.esp) === undefined || (ctx.icode) === undefined || (ctx.instructionSet.loop) === undefined || (ctx.registers.ecx) === undefined || (ctx.registers.none) === undefined) { throw "Invalid identifier in HCL" }

   if(((ctx.icode) === (ctx.instructionSet.rrmovl)) || ((ctx.icode) === (ctx.instructionSet.irmovl)) || ((ctx.icode) === (ctx.instructionSet.alu)) || ((ctx.icode) === (ctx.instructionSet.alui))) { return ctx.rb; } 

   if(((ctx.icode) === (ctx.instructionSet.pushl)) || ((ctx.icode) === (ctx.instructionSet.popl)) || ((ctx.icode) === (ctx.instructionSet.call)) || ((ctx.icode) === (ctx.instructionSet.ret))) { return ctx.registers.esp; } 

   if(((ctx.icode) === (ctx.instructionSet.loop))) { return ctx.registers.ecx; } 

   if(1) { return ctx.registers.none; } 

}

export function gen_dstM() {

   // Checks if some identifiers are undefined
   if((ctx.icode) === undefined || (ctx.instructionSet.mrmovl) === undefined || (ctx.instructionSet.popl) === undefined || (ctx.ra) === undefined || (ctx.registers.none) === undefined) { throw "Invalid identifier in HCL" }

   if(((ctx.icode) === (ctx.instructionSet.mrmovl)) || ((ctx.icode) === (ctx.instructionSet.popl))) { return ctx.ra; } 

   if(1) { return ctx.registers.none; } 

}

export function gen_aluA() {

   // Checks if some identifiers are undefined
   if((ctx.icode) === undefined || (ctx.instructionSet.rrmovl) === undefined || (ctx.instructionSet.alu) === undefined || (ctx.vala) === undefined || (ctx.icode) === undefined || (ctx.instructionSet.irmovl) === undefined || (ctx.instructionSet.rmmovl) === undefined || (ctx.instructionSet.mrmovl) === undefined || (ctx.instructionSet.alui) === undefined || (ctx.valc) === undefined || (ctx.icode) === undefined || (ctx.instructionSet.call) === undefined || (ctx.instructionSet.pushl) === undefined || (ctx.icode) === undefined || (ctx.instructionSet.ret) === undefined || (ctx.instructionSet.popl) === undefined || (ctx.icode) === undefined || (ctx.instructionSet.loop) === undefined) { throw "Invalid identifier in HCL" }

   if(((ctx.icode) === (ctx.instructionSet.rrmovl)) || ((ctx.icode) === (ctx.instructionSet.alu))) { return ctx.vala; } 

   if(((ctx.icode) === (ctx.instructionSet.irmovl)) || ((ctx.icode) === (ctx.instructionSet.rmmovl)) || ((ctx.icode) === (ctx.instructionSet.mrmovl)) || ((ctx.icode) === (ctx.instructionSet.alui))) { return ctx.valc; } 

   if(((ctx.icode) === (ctx.instructionSet.call)) || ((ctx.icode) === (ctx.instructionSet.pushl))) { return -4; } 

   if(((ctx.icode) === (ctx.instructionSet.ret)) || ((ctx.icode) === (ctx.instructionSet.popl))) { return 4; } 

   if(((ctx.icode) === (ctx.instructionSet.loop))) { return -1; } 

}

export function gen_aluB() {

   // Checks if some identifiers are undefined
   if((ctx.icode) === undefined || (ctx.instructionSet.rmmovl) === undefined || (ctx.instructionSet.mrmovl) === undefined || (ctx.instructionSet.alu) === undefined || (ctx.instructionSet.alui) === undefined || (ctx.instructionSet.call) === undefined || (ctx.instructionSet.pushl) === undefined || (ctx.instructionSet.ret) === undefined || (ctx.instructionSet.popl) === undefined || (ctx.instructionSet.loop) === undefined || (ctx.valb) === undefined || (ctx.icode) === undefined || (ctx.instructionSet.rrmovl) === undefined || (ctx.instructionSet.irmovl) === undefined) { throw "Invalid identifier in HCL" }

   if(((ctx.icode) === (ctx.instructionSet.rmmovl)) || ((ctx.icode) === (ctx.instructionSet.mrmovl)) || ((ctx.icode) === (ctx.instructionSet.alu)) || ((ctx.icode) === (ctx.instructionSet.alui)) || ((ctx.icode) === (ctx.instructionSet.call)) || ((ctx.icode) === (ctx.instructionSet.pushl)) || ((ctx.icode) === (ctx.instructionSet.ret)) || ((ctx.icode) === (ctx.instructionSet.popl)) || ((ctx.icode) === (ctx.instructionSet.loop))) { return ctx.valb; } 

   if(((ctx.icode) === (ctx.instructionSet.rrmovl)) || ((ctx.icode) === (ctx.instructionSet.irmovl))) { return 0; } 

}

export function gen_alufun() {

   // Checks if some identifiers are undefined
   if((ctx.icode) === undefined || (ctx.instructionSet.alu) === undefined || (ctx.instructionSet.alui) === undefined || (ctx.ifun) === undefined || (ctx.alufct.A_ADD) === undefined) { throw "Invalid identifier in HCL" }

   if(((ctx.icode) === (ctx.instructionSet.alu)) || ((ctx.icode) === (ctx.instructionSet.alui))) { return ctx.ifun; } 

   if(1) { return ctx.alufct.A_ADD; } 

}

export function gen_mem_addr() {

   // Checks if some identifiers are undefined
   if((ctx.icode) === undefined || (ctx.instructionSet.rmmovl) === undefined || (ctx.instructionSet.pushl) === undefined || (ctx.instructionSet.call) === undefined || (ctx.instructionSet.mrmovl) === undefined || (ctx.vale) === undefined || (ctx.icode) === undefined || (ctx.instructionSet.popl) === undefined || (ctx.instructionSet.ret) === undefined || (ctx.vala) === undefined) { throw "Invalid identifier in HCL" }

   if(((ctx.icode) === (ctx.instructionSet.rmmovl)) || ((ctx.icode) === (ctx.instructionSet.pushl)) || ((ctx.icode) === (ctx.instructionSet.call)) || ((ctx.icode) === (ctx.instructionSet.mrmovl))) { return ctx.vale; } 

   if(((ctx.icode) === (ctx.instructionSet.popl)) || ((ctx.icode) === (ctx.instructionSet.ret))) { return ctx.vala; } 

}

export function gen_mem_data() {

   // Checks if some identifiers are undefined
   if((ctx.icode) === undefined || (ctx.instructionSet.rmmovl) === undefined || (ctx.instructionSet.pushl) === undefined || (ctx.vala) === undefined || (ctx.icode) === undefined || (ctx.instructionSet.call) === undefined || (ctx.valp) === undefined) { throw "Invalid identifier in HCL" }

   if(((ctx.icode) === (ctx.instructionSet.rmmovl)) || ((ctx.icode) === (ctx.instructionSet.pushl))) { return ctx.vala; } 

   if(ctx.icode == ctx.instructionSet.call) { return ctx.valp; } 

}

export function gen_new_pc() {

   // Checks if some identifiers are undefined
   if((ctx.icode) === undefined || (ctx.instructionSet.call) === undefined || (ctx.valc) === undefined || (ctx.icode) === undefined || (ctx.instructionSet.jxx) === undefined || (ctx.bcond) === undefined || (ctx.valc) === undefined || (ctx.icode) === undefined || (ctx.instructionSet.ret) === undefined || (ctx.valm) === undefined || (ctx.icode) === undefined || (ctx.instructionSet.loop) === undefined || (ctx.vale) === undefined || (ctx.valc) === undefined || (ctx.valp) === undefined) { throw "Invalid identifier in HCL" }

   if(ctx.icode == ctx.instructionSet.call) { return ctx.valc; } 

   if(ctx.icode == ctx.instructionSet.jxx && ctx.bcond) { return ctx.valc; } 

   if(ctx.icode == ctx.instructionSet.ret) { return ctx.valm; } 

   if(ctx.icode == ctx.instructionSet.loop && ctx.vale != 0) { return ctx.valc; } 

   if(1) { return ctx.valp; } 

}

export function gen_need_regids() {
   // Checks if some identifiers are undefined
   if((ctx.icode) === undefined || (ctx.instructionSet.rrmovl) === undefined || (ctx.instructionSet.alu) === undefined || (ctx.instructionSet.alui) === undefined || (ctx.instructionSet.pushl) === undefined || (ctx.instructionSet.popl) === undefined || (ctx.instructionSet.irmovl) === undefined || (ctx.instructionSet.rmmovl) === undefined || (ctx.instructionSet.mrmovl) === undefined) { throw "Invalid identifier in HCL" }

   return ((ctx.icode) === (ctx.instructionSet.rrmovl)) || ((ctx.icode) === (ctx.instructionSet.alu)) || ((ctx.icode) === (ctx.instructionSet.alui)) || ((ctx.icode) === (ctx.instructionSet.pushl)) || ((ctx.icode) === (ctx.instructionSet.popl)) || ((ctx.icode) === (ctx.instructionSet.irmovl)) || ((ctx.icode) === (ctx.instructionSet.rmmovl)) || ((ctx.icode) === (ctx.instructionSet.mrmovl));
}

export function gen_need_valC() {
   // Checks if some identifiers are undefined
   if((ctx.icode) === undefined || (ctx.instructionSet.irmovl) === undefined || (ctx.instructionSet.rmmovl) === undefined || (ctx.instructionSet.mrmovl) === undefined || (ctx.instructionSet.jxx) === undefined || (ctx.instructionSet.call) === undefined || (ctx.instructionSet.loop) === undefined) { throw "Invalid identifier in HCL" }

   return ((ctx.icode) === (ctx.instructionSet.irmovl)) || ((ctx.icode) === (ctx.instructionSet.rmmovl)) || ((ctx.icode) === (ctx.instructionSet.mrmovl)) || ((ctx.icode) === (ctx.instructionSet.jxx)) || ((ctx.icode) === (ctx.instructionSet.call)) || ((ctx.icode) === (ctx.instructionSet.loop));
}

export function gen_instr_valid() {
   // Checks if some identifiers are undefined
   if((ctx.icode) === undefined || (ctx.instructionSet.nop) === undefined || (ctx.instructionSet.halt) === undefined || (ctx.instructionSet.rrmovl) === undefined || (ctx.instructionSet.irmovl) === undefined || (ctx.instructionSet.rmmovl) === undefined || (ctx.instructionSet.mrmovl) === undefined || (ctx.instructionSet.alu) === undefined || (ctx.instructionSet.alui) === undefined || (ctx.instructionSet.jxx) === undefined || (ctx.instructionSet.call) === undefined || (ctx.instructionSet.ret) === undefined || (ctx.instructionSet.pushl) === undefined || (ctx.instructionSet.popl) === undefined || (ctx.instructionSet.loop) === undefined) { throw "Invalid identifier in HCL" }

   return ((ctx.icode) === (ctx.instructionSet.nop)) || ((ctx.icode) === (ctx.instructionSet.halt)) || ((ctx.icode) === (ctx.instructionSet.rrmovl)) || ((ctx.icode) === (ctx.instructionSet.irmovl)) || ((ctx.icode) === (ctx.instructionSet.rmmovl)) || ((ctx.icode) === (ctx.instructionSet.mrmovl)) || ((ctx.icode) === (ctx.instructionSet.alu)) || ((ctx.icode) === (ctx.instructionSet.alui)) || ((ctx.icode) === (ctx.instructionSet.jxx)) || ((ctx.icode) === (ctx.instructionSet.call)) || ((ctx.icode) === (ctx.instructionSet.ret)) || ((ctx.icode) === (ctx.instructionSet.pushl)) || ((ctx.icode) === (ctx.instructionSet.popl)) || ((ctx.icode) === (ctx.instructionSet.loop));
}

export function gen_set_cc() {
   // Checks if some identifiers are undefined
   if((ctx.icode) === undefined || (ctx.instructionSet.alu) === undefined || (ctx.instructionSet.alui) === undefined) { throw "Invalid identifier in HCL" }

   return ((ctx.icode) === (ctx.instructionSet.alu)) || ((ctx.icode) === (ctx.instructionSet.alui));
}

export function gen_mem_read() {
   // Checks if some identifiers are undefined
   if((ctx.icode) === undefined || (ctx.instructionSet.mrmovl) === undefined || (ctx.instructionSet.popl) === undefined || (ctx.instructionSet.ret) === undefined) { throw "Invalid identifier in HCL" }

   return ((ctx.icode) === (ctx.instructionSet.mrmovl)) || ((ctx.icode) === (ctx.instructionSet.popl)) || ((ctx.icode) === (ctx.instructionSet.ret));
}

export function gen_mem_write() {
   // Checks if some identifiers are undefined
   if((ctx.icode) === undefined || (ctx.instructionSet.rmmovl) === undefined || (ctx.instructionSet.pushl) === undefined || (ctx.instructionSet.call) === undefined) { throw "Invalid identifier in HCL" }

   return ((ctx.icode) === (ctx.instructionSet.rmmovl)) || ((ctx.icode) === (ctx.instructionSet.pushl)) || ((ctx.icode) === (ctx.instructionSet.call));
}

