import { HclException } from "../exceptions/simulatorException"
import * as registersModule from "./registers"

let registers = registersModule.registers_enum

export { call, setHandlerCode, setCtx }

/**
 * Calls a function from the current handler.
 * If the function does not exist, an HclException is thrown.
 * @param name 
 */
function call(name : string) : any {
   if(!(hclHandler[name] instanceof Function)) {
      throw new HclException(name + " function does not exist")
  } else {
      return hclHandler[name]()
  }
}

/**
 * Sets the hcl code handler. Its an object owning the functions.
 * This handler must have a field 'ctx : Object'. If not, an exception is thrown.
 * @param handler 
 */
function setHandlerCode(code : string) {
   let handler = eval(code)
   if(!(handler instanceof Object)) {
      throw new HclException("The given handler is not an object (type : " + typeof handler + ")")
   }
   if(!(handler.externCtx instanceof Object)) {
      throw new HclException("The given handler has no externCtx field or ctx is not an Object")
   }
   hclHandler = handler
}

/**
 * Sets the context the hcl code can use.
 * If no context is specified, the hcl code will be able to call global variables
 * only.
 * @param ctx 
 */
function setCtx(ctx : Object) {
   hclHandler.externCtx = ctx
}

let hclHandler = eval(`new function() {

   this.externCtx = {}
   
   let ctx = this.externCtx
   
   this.srcA = () => {
   
      // Checks if some identifiers are undefined
      if((ctx.icode) === undefined) { throw "HCL : ctx.icode is undefined in function 'srcA'" }
      if((ctx.instructionSet.rrmovl) === undefined) { throw "HCL : ctx.instructionSet.rrmovl is undefined in function 'srcA'" }
      if((ctx.instructionSet.rmmovl) === undefined) { throw "HCL : ctx.instructionSet.rmmovl is undefined in function 'srcA'" }
      if((ctx.instructionSet.alu) === undefined) { throw "HCL : ctx.instructionSet.alu is undefined in function 'srcA'" }
      if((ctx.instructionSet.pushl) === undefined) { throw "HCL : ctx.instructionSet.pushl is undefined in function 'srcA'" }
      if((ctx.ra) === undefined) { throw "HCL : ctx.ra is undefined in function 'srcA'" }
      if((ctx.icode) === undefined) { throw "HCL : ctx.icode is undefined in function 'srcA'" }
      if((ctx.instructionSet.popl) === undefined) { throw "HCL : ctx.instructionSet.popl is undefined in function 'srcA'" }
      if((ctx.instructionSet.ret) === undefined) { throw "HCL : ctx.instructionSet.ret is undefined in function 'srcA'" }
      if((ctx.registers.esp) === undefined) { throw "HCL : ctx.registers.esp is undefined in function 'srcA'" }
      if((ctx.registers.none) === undefined) { throw "HCL : ctx.registers.none is undefined in function 'srcA'" }
      // End of checks
   
      if(((ctx.icode) === (ctx.instructionSet.rrmovl)) || ((ctx.icode) === (ctx.instructionSet.rmmovl)) || ((ctx.icode) === (ctx.instructionSet.alu)) || ((ctx.icode) === (ctx.instructionSet.pushl))) { return ctx.ra; } 
   
      if(((ctx.icode) === (ctx.instructionSet.popl)) || ((ctx.icode) === (ctx.instructionSet.ret))) { return ctx.registers.esp; } 
   
      if(1) { return ctx.registers.none; } 
   
   }
   
   this.srcB = () => {
   
      // Checks if some identifiers are undefined
      if((ctx.icode) === undefined) { throw "HCL : ctx.icode is undefined in function 'srcB'" }
      if((ctx.instructionSet.alu) === undefined) { throw "HCL : ctx.instructionSet.alu is undefined in function 'srcB'" }
      if((ctx.instructionSet.alui) === undefined) { throw "HCL : ctx.instructionSet.alui is undefined in function 'srcB'" }
      if((ctx.instructionSet.rmmovl) === undefined) { throw "HCL : ctx.instructionSet.rmmovl is undefined in function 'srcB'" }
      if((ctx.instructionSet.mrmovl) === undefined) { throw "HCL : ctx.instructionSet.mrmovl is undefined in function 'srcB'" }
      if((ctx.rb) === undefined) { throw "HCL : ctx.rb is undefined in function 'srcB'" }
      if((ctx.icode) === undefined) { throw "HCL : ctx.icode is undefined in function 'srcB'" }
      if((ctx.instructionSet.pushl) === undefined) { throw "HCL : ctx.instructionSet.pushl is undefined in function 'srcB'" }
      if((ctx.instructionSet.popl) === undefined) { throw "HCL : ctx.instructionSet.popl is undefined in function 'srcB'" }
      if((ctx.instructionSet.call) === undefined) { throw "HCL : ctx.instructionSet.call is undefined in function 'srcB'" }
      if((ctx.instructionSet.ret) === undefined) { throw "HCL : ctx.instructionSet.ret is undefined in function 'srcB'" }
      if((ctx.registers.esp) === undefined) { throw "HCL : ctx.registers.esp is undefined in function 'srcB'" }
      if((ctx.icode) === undefined) { throw "HCL : ctx.icode is undefined in function 'srcB'" }
      if((ctx.instructionSet.loop) === undefined) { throw "HCL : ctx.instructionSet.loop is undefined in function 'srcB'" }
      if((ctx.registers.ecx) === undefined) { throw "HCL : ctx.registers.ecx is undefined in function 'srcB'" }
      if((ctx.registers.none) === undefined) { throw "HCL : ctx.registers.none is undefined in function 'srcB'" }
      // End of checks
   
      if(((ctx.icode) === (ctx.instructionSet.alu)) || ((ctx.icode) === (ctx.instructionSet.alui)) || ((ctx.icode) === (ctx.instructionSet.rmmovl)) || ((ctx.icode) === (ctx.instructionSet.mrmovl))) { return ctx.rb; } 
   
      if(((ctx.icode) === (ctx.instructionSet.pushl)) || ((ctx.icode) === (ctx.instructionSet.popl)) || ((ctx.icode) === (ctx.instructionSet.call)) || ((ctx.icode) === (ctx.instructionSet.ret))) { return ctx.registers.esp; } 
   
      if(((ctx.icode) === (ctx.instructionSet.loop))) { return ctx.registers.ecx; } 
   
      if(1) { return ctx.registers.none; } 
   
   }
   
   this.dstE = () => {
   
      // Checks if some identifiers are undefined
      if((ctx.icode) === undefined) { throw "HCL : ctx.icode is undefined in function 'dstE'" }
      if((ctx.instructionSet.rrmovl) === undefined) { throw "HCL : ctx.instructionSet.rrmovl is undefined in function 'dstE'" }
      if((ctx.instructionSet.irmovl) === undefined) { throw "HCL : ctx.instructionSet.irmovl is undefined in function 'dstE'" }
      if((ctx.instructionSet.alu) === undefined) { throw "HCL : ctx.instructionSet.alu is undefined in function 'dstE'" }
      if((ctx.instructionSet.alui) === undefined) { throw "HCL : ctx.instructionSet.alui is undefined in function 'dstE'" }
      if((ctx.rb) === undefined) { throw "HCL : ctx.rb is undefined in function 'dstE'" }
      if((ctx.icode) === undefined) { throw "HCL : ctx.icode is undefined in function 'dstE'" }
      if((ctx.instructionSet.pushl) === undefined) { throw "HCL : ctx.instructionSet.pushl is undefined in function 'dstE'" }
      if((ctx.instructionSet.popl) === undefined) { throw "HCL : ctx.instructionSet.popl is undefined in function 'dstE'" }
      if((ctx.instructionSet.call) === undefined) { throw "HCL : ctx.instructionSet.call is undefined in function 'dstE'" }
      if((ctx.instructionSet.ret) === undefined) { throw "HCL : ctx.instructionSet.ret is undefined in function 'dstE'" }
      if((ctx.registers.esp) === undefined) { throw "HCL : ctx.registers.esp is undefined in function 'dstE'" }
      if((ctx.icode) === undefined) { throw "HCL : ctx.icode is undefined in function 'dstE'" }
      if((ctx.instructionSet.loop) === undefined) { throw "HCL : ctx.instructionSet.loop is undefined in function 'dstE'" }
      if((ctx.registers.ecx) === undefined) { throw "HCL : ctx.registers.ecx is undefined in function 'dstE'" }
      if((ctx.registers.none) === undefined) { throw "HCL : ctx.registers.none is undefined in function 'dstE'" }
      // End of checks
   
      if(((ctx.icode) === (ctx.instructionSet.rrmovl)) || ((ctx.icode) === (ctx.instructionSet.irmovl)) || ((ctx.icode) === (ctx.instructionSet.alu)) || ((ctx.icode) === (ctx.instructionSet.alui))) { return ctx.rb; } 
   
      if(((ctx.icode) === (ctx.instructionSet.pushl)) || ((ctx.icode) === (ctx.instructionSet.popl)) || ((ctx.icode) === (ctx.instructionSet.call)) || ((ctx.icode) === (ctx.instructionSet.ret))) { return ctx.registers.esp; } 
   
      if(((ctx.icode) === (ctx.instructionSet.loop))) { return ctx.registers.ecx; } 
   
      if(1) { return ctx.registers.none; } 
   
   }
   
   this.dstM = () => {
   
      // Checks if some identifiers are undefined
      if((ctx.icode) === undefined) { throw "HCL : ctx.icode is undefined in function 'dstM'" }
      if((ctx.instructionSet.mrmovl) === undefined) { throw "HCL : ctx.instructionSet.mrmovl is undefined in function 'dstM'" }
      if((ctx.instructionSet.popl) === undefined) { throw "HCL : ctx.instructionSet.popl is undefined in function 'dstM'" }
      if((ctx.ra) === undefined) { throw "HCL : ctx.ra is undefined in function 'dstM'" }
      if((ctx.registers.none) === undefined) { throw "HCL : ctx.registers.none is undefined in function 'dstM'" }
      // End of checks
   
      if(((ctx.icode) === (ctx.instructionSet.mrmovl)) || ((ctx.icode) === (ctx.instructionSet.popl))) { return ctx.ra; } 
   
      if(1) { return ctx.registers.none; } 
   
   }
   
   this.aluA = () => {
   
      // Checks if some identifiers are undefined
      if((ctx.icode) === undefined) { throw "HCL : ctx.icode is undefined in function 'aluA'" }
      if((ctx.instructionSet.rrmovl) === undefined) { throw "HCL : ctx.instructionSet.rrmovl is undefined in function 'aluA'" }
      if((ctx.instructionSet.alu) === undefined) { throw "HCL : ctx.instructionSet.alu is undefined in function 'aluA'" }
      if((ctx.vala) === undefined) { throw "HCL : ctx.vala is undefined in function 'aluA'" }
      if((ctx.icode) === undefined) { throw "HCL : ctx.icode is undefined in function 'aluA'" }
      if((ctx.instructionSet.irmovl) === undefined) { throw "HCL : ctx.instructionSet.irmovl is undefined in function 'aluA'" }
      if((ctx.instructionSet.rmmovl) === undefined) { throw "HCL : ctx.instructionSet.rmmovl is undefined in function 'aluA'" }
      if((ctx.instructionSet.mrmovl) === undefined) { throw "HCL : ctx.instructionSet.mrmovl is undefined in function 'aluA'" }
      if((ctx.instructionSet.alui) === undefined) { throw "HCL : ctx.instructionSet.alui is undefined in function 'aluA'" }
      if((ctx.valc) === undefined) { throw "HCL : ctx.valc is undefined in function 'aluA'" }
      if((ctx.icode) === undefined) { throw "HCL : ctx.icode is undefined in function 'aluA'" }
      if((ctx.instructionSet.call) === undefined) { throw "HCL : ctx.instructionSet.call is undefined in function 'aluA'" }
      if((ctx.instructionSet.pushl) === undefined) { throw "HCL : ctx.instructionSet.pushl is undefined in function 'aluA'" }
      if((ctx.icode) === undefined) { throw "HCL : ctx.icode is undefined in function 'aluA'" }
      if((ctx.instructionSet.ret) === undefined) { throw "HCL : ctx.instructionSet.ret is undefined in function 'aluA'" }
      if((ctx.instructionSet.popl) === undefined) { throw "HCL : ctx.instructionSet.popl is undefined in function 'aluA'" }
      if((ctx.icode) === undefined) { throw "HCL : ctx.icode is undefined in function 'aluA'" }
      if((ctx.instructionSet.loop) === undefined) { throw "HCL : ctx.instructionSet.loop is undefined in function 'aluA'" }
      // End of checks
   
      if(((ctx.icode) === (ctx.instructionSet.rrmovl)) || ((ctx.icode) === (ctx.instructionSet.alu))) { return ctx.vala; } 
   
      if(((ctx.icode) === (ctx.instructionSet.irmovl)) || ((ctx.icode) === (ctx.instructionSet.rmmovl)) || ((ctx.icode) === (ctx.instructionSet.mrmovl)) || ((ctx.icode) === (ctx.instructionSet.alui))) { return ctx.valc; } 
   
      if(((ctx.icode) === (ctx.instructionSet.call)) || ((ctx.icode) === (ctx.instructionSet.pushl))) { return -4; } 
   
      if(((ctx.icode) === (ctx.instructionSet.ret)) || ((ctx.icode) === (ctx.instructionSet.popl))) { return 4; } 
   
      if(((ctx.icode) === (ctx.instructionSet.loop))) { return -1; } 
   
   }
   
   this.aluB = () => {
   
      // Checks if some identifiers are undefined
      if((ctx.icode) === undefined) { throw "HCL : ctx.icode is undefined in function 'aluB'" }
      if((ctx.instructionSet.rmmovl) === undefined) { throw "HCL : ctx.instructionSet.rmmovl is undefined in function 'aluB'" }
      if((ctx.instructionSet.mrmovl) === undefined) { throw "HCL : ctx.instructionSet.mrmovl is undefined in function 'aluB'" }
      if((ctx.instructionSet.alu) === undefined) { throw "HCL : ctx.instructionSet.alu is undefined in function 'aluB'" }
      if((ctx.instructionSet.alui) === undefined) { throw "HCL : ctx.instructionSet.alui is undefined in function 'aluB'" }
      if((ctx.instructionSet.call) === undefined) { throw "HCL : ctx.instructionSet.call is undefined in function 'aluB'" }
      if((ctx.instructionSet.pushl) === undefined) { throw "HCL : ctx.instructionSet.pushl is undefined in function 'aluB'" }
      if((ctx.instructionSet.ret) === undefined) { throw "HCL : ctx.instructionSet.ret is undefined in function 'aluB'" }
      if((ctx.instructionSet.popl) === undefined) { throw "HCL : ctx.instructionSet.popl is undefined in function 'aluB'" }
      if((ctx.instructionSet.loop) === undefined) { throw "HCL : ctx.instructionSet.loop is undefined in function 'aluB'" }
      if((ctx.valb) === undefined) { throw "HCL : ctx.valb is undefined in function 'aluB'" }
      if((ctx.icode) === undefined) { throw "HCL : ctx.icode is undefined in function 'aluB'" }
      if((ctx.instructionSet.rrmovl) === undefined) { throw "HCL : ctx.instructionSet.rrmovl is undefined in function 'aluB'" }
      if((ctx.instructionSet.irmovl) === undefined) { throw "HCL : ctx.instructionSet.irmovl is undefined in function 'aluB'" }
      // End of checks
   
      if(((ctx.icode) === (ctx.instructionSet.rmmovl)) || ((ctx.icode) === (ctx.instructionSet.mrmovl)) || ((ctx.icode) === (ctx.instructionSet.alu)) || ((ctx.icode) === (ctx.instructionSet.alui)) || ((ctx.icode) === (ctx.instructionSet.call)) || ((ctx.icode) === (ctx.instructionSet.pushl)) || ((ctx.icode) === (ctx.instructionSet.ret)) || ((ctx.icode) === (ctx.instructionSet.popl)) || ((ctx.icode) === (ctx.instructionSet.loop))) { return ctx.valb; } 
   
      if(((ctx.icode) === (ctx.instructionSet.rrmovl)) || ((ctx.icode) === (ctx.instructionSet.irmovl))) { return 0; } 
   
   }
   
   this.alufun = () => {
   
      // Checks if some identifiers are undefined
      if((ctx.icode) === undefined) { throw "HCL : ctx.icode is undefined in function 'alufun'" }
      if((ctx.instructionSet.alu) === undefined) { throw "HCL : ctx.instructionSet.alu is undefined in function 'alufun'" }
      if((ctx.instructionSet.alui) === undefined) { throw "HCL : ctx.instructionSet.alui is undefined in function 'alufun'" }
      if((ctx.ifun) === undefined) { throw "HCL : ctx.ifun is undefined in function 'alufun'" }
      if((ctx.alufct.A_ADD) === undefined) { throw "HCL : ctx.alufct.A_ADD is undefined in function 'alufun'" }
      // End of checks
   
      if(((ctx.icode) === (ctx.instructionSet.alu)) || ((ctx.icode) === (ctx.instructionSet.alui))) { return ctx.ifun; } 
   
      if(1) { return ctx.alufct.A_ADD; } 
   
   }
   
   this.mem_addr = () => {
   
      // Checks if some identifiers are undefined
      if((ctx.icode) === undefined) { throw "HCL : ctx.icode is undefined in function 'mem_addr'" }
      if((ctx.instructionSet.rmmovl) === undefined) { throw "HCL : ctx.instructionSet.rmmovl is undefined in function 'mem_addr'" }
      if((ctx.instructionSet.pushl) === undefined) { throw "HCL : ctx.instructionSet.pushl is undefined in function 'mem_addr'" }
      if((ctx.instructionSet.call) === undefined) { throw "HCL : ctx.instructionSet.call is undefined in function 'mem_addr'" }
      if((ctx.instructionSet.mrmovl) === undefined) { throw "HCL : ctx.instructionSet.mrmovl is undefined in function 'mem_addr'" }
      if((ctx.vale) === undefined) { throw "HCL : ctx.vale is undefined in function 'mem_addr'" }
      if((ctx.icode) === undefined) { throw "HCL : ctx.icode is undefined in function 'mem_addr'" }
      if((ctx.instructionSet.popl) === undefined) { throw "HCL : ctx.instructionSet.popl is undefined in function 'mem_addr'" }
      if((ctx.instructionSet.ret) === undefined) { throw "HCL : ctx.instructionSet.ret is undefined in function 'mem_addr'" }
      if((ctx.vala) === undefined) { throw "HCL : ctx.vala is undefined in function 'mem_addr'" }
      // End of checks
   
      if(((ctx.icode) === (ctx.instructionSet.rmmovl)) || ((ctx.icode) === (ctx.instructionSet.pushl)) || ((ctx.icode) === (ctx.instructionSet.call)) || ((ctx.icode) === (ctx.instructionSet.mrmovl))) { return ctx.vale; } 
   
      if(((ctx.icode) === (ctx.instructionSet.popl)) || ((ctx.icode) === (ctx.instructionSet.ret))) { return ctx.vala; } 
   
   }
   
   this.mem_data = () => {
   
      // Checks if some identifiers are undefined
      if((ctx.icode) === undefined) { throw "HCL : ctx.icode is undefined in function 'mem_data'" }
      if((ctx.instructionSet.rmmovl) === undefined) { throw "HCL : ctx.instructionSet.rmmovl is undefined in function 'mem_data'" }
      if((ctx.instructionSet.pushl) === undefined) { throw "HCL : ctx.instructionSet.pushl is undefined in function 'mem_data'" }
      if((ctx.vala) === undefined) { throw "HCL : ctx.vala is undefined in function 'mem_data'" }
      if((ctx.icode) === undefined) { throw "HCL : ctx.icode is undefined in function 'mem_data'" }
      if((ctx.instructionSet.call) === undefined) { throw "HCL : ctx.instructionSet.call is undefined in function 'mem_data'" }
      if((ctx.valp) === undefined) { throw "HCL : ctx.valp is undefined in function 'mem_data'" }
      // End of checks
   
      if(((ctx.icode) === (ctx.instructionSet.rmmovl)) || ((ctx.icode) === (ctx.instructionSet.pushl))) { return ctx.vala; } 
   
      if(ctx.icode == ctx.instructionSet.call) { return ctx.valp; } 
   
   }
   
   this.new_pc = () => {
   
      // Checks if some identifiers are undefined
      if((ctx.icode) === undefined) { throw "HCL : ctx.icode is undefined in function 'new_pc'" }
      if((ctx.instructionSet.call) === undefined) { throw "HCL : ctx.instructionSet.call is undefined in function 'new_pc'" }
      if((ctx.valc) === undefined) { throw "HCL : ctx.valc is undefined in function 'new_pc'" }
      if((ctx.icode) === undefined) { throw "HCL : ctx.icode is undefined in function 'new_pc'" }
      if((ctx.instructionSet.jxx) === undefined) { throw "HCL : ctx.instructionSet.jxx is undefined in function 'new_pc'" }
      if((ctx.bcond) === undefined) { throw "HCL : ctx.bcond is undefined in function 'new_pc'" }
      if((ctx.valc) === undefined) { throw "HCL : ctx.valc is undefined in function 'new_pc'" }
      if((ctx.icode) === undefined) { throw "HCL : ctx.icode is undefined in function 'new_pc'" }
      if((ctx.instructionSet.ret) === undefined) { throw "HCL : ctx.instructionSet.ret is undefined in function 'new_pc'" }
      if((ctx.valm) === undefined) { throw "HCL : ctx.valm is undefined in function 'new_pc'" }
      if((ctx.icode) === undefined) { throw "HCL : ctx.icode is undefined in function 'new_pc'" }
      if((ctx.instructionSet.loop) === undefined) { throw "HCL : ctx.instructionSet.loop is undefined in function 'new_pc'" }
      if((ctx.vale) === undefined) { throw "HCL : ctx.vale is undefined in function 'new_pc'" }
      if((ctx.valc) === undefined) { throw "HCL : ctx.valc is undefined in function 'new_pc'" }
      if((ctx.valp) === undefined) { throw "HCL : ctx.valp is undefined in function 'new_pc'" }
      // End of checks
   
      if(ctx.icode == ctx.instructionSet.call) { return ctx.valc; } 
   
      if(ctx.icode == ctx.instructionSet.jxx && ctx.bcond) { return ctx.valc; } 
   
      if(ctx.icode == ctx.instructionSet.ret) { return ctx.valm; } 
   
      if(ctx.icode == ctx.instructionSet.loop && ctx.vale != 0) { return ctx.valc; } 
   
      if(1) { return ctx.valp; } 
   
   }
   
   this.need_regids = () => {
      // Checks if some identifiers are undefined
      if((ctx.icode) === undefined) { throw "HCL : ctx.icode is undefined in function 'need_regids'" }
      if((ctx.instructionSet.rrmovl) === undefined) { throw "HCL : ctx.instructionSet.rrmovl is undefined in function 'need_regids'" }
      if((ctx.instructionSet.alu) === undefined) { throw "HCL : ctx.instructionSet.alu is undefined in function 'need_regids'" }
      if((ctx.instructionSet.alui) === undefined) { throw "HCL : ctx.instructionSet.alui is undefined in function 'need_regids'" }
      if((ctx.instructionSet.pushl) === undefined) { throw "HCL : ctx.instructionSet.pushl is undefined in function 'need_regids'" }
      if((ctx.instructionSet.popl) === undefined) { throw "HCL : ctx.instructionSet.popl is undefined in function 'need_regids'" }
      if((ctx.instructionSet.irmovl) === undefined) { throw "HCL : ctx.instructionSet.irmovl is undefined in function 'need_regids'" }
      if((ctx.instructionSet.rmmovl) === undefined) { throw "HCL : ctx.instructionSet.rmmovl is undefined in function 'need_regids'" }
      if((ctx.instructionSet.mrmovl) === undefined) { throw "HCL : ctx.instructionSet.mrmovl is undefined in function 'need_regids'" }
      // End of checks
   
      return ((ctx.icode) === (ctx.instructionSet.rrmovl)) || ((ctx.icode) === (ctx.instructionSet.alu)) || ((ctx.icode) === (ctx.instructionSet.alui)) || ((ctx.icode) === (ctx.instructionSet.pushl)) || ((ctx.icode) === (ctx.instructionSet.popl)) || ((ctx.icode) === (ctx.instructionSet.irmovl)) || ((ctx.icode) === (ctx.instructionSet.rmmovl)) || ((ctx.icode) === (ctx.instructionSet.mrmovl));
   }
   
   this.need_valC = () => {
      // Checks if some identifiers are undefined
      if((ctx.icode) === undefined) { throw "HCL : ctx.icode is undefined in function 'need_valC'" }
      if((ctx.instructionSet.irmovl) === undefined) { throw "HCL : ctx.instructionSet.irmovl is undefined in function 'need_valC'" }
      if((ctx.instructionSet.rmmovl) === undefined) { throw "HCL : ctx.instructionSet.rmmovl is undefined in function 'need_valC'" }
      if((ctx.instructionSet.mrmovl) === undefined) { throw "HCL : ctx.instructionSet.mrmovl is undefined in function 'need_valC'" }
      if((ctx.instructionSet.jxx) === undefined) { throw "HCL : ctx.instructionSet.jxx is undefined in function 'need_valC'" }
      if((ctx.instructionSet.call) === undefined) { throw "HCL : ctx.instructionSet.call is undefined in function 'need_valC'" }
      if((ctx.instructionSet.loop) === undefined) { throw "HCL : ctx.instructionSet.loop is undefined in function 'need_valC'" }
      // End of checks
   
      return ((ctx.icode) === (ctx.instructionSet.irmovl)) || ((ctx.icode) === (ctx.instructionSet.rmmovl)) || ((ctx.icode) === (ctx.instructionSet.mrmovl)) || ((ctx.icode) === (ctx.instructionSet.jxx)) || ((ctx.icode) === (ctx.instructionSet.call)) || ((ctx.icode) === (ctx.instructionSet.loop));
   }
   
   this.instr_valid = () => {
      // Checks if some identifiers are undefined
      if((ctx.icode) === undefined) { throw "HCL : ctx.icode is undefined in function 'instr_valid'" }
      if((ctx.instructionSet.nop) === undefined) { throw "HCL : ctx.instructionSet.nop is undefined in function 'instr_valid'" }
      if((ctx.instructionSet.halt) === undefined) { throw "HCL : ctx.instructionSet.halt is undefined in function 'instr_valid'" }
      if((ctx.instructionSet.rrmovl) === undefined) { throw "HCL : ctx.instructionSet.rrmovl is undefined in function 'instr_valid'" }
      if((ctx.instructionSet.irmovl) === undefined) { throw "HCL : ctx.instructionSet.irmovl is undefined in function 'instr_valid'" }
      if((ctx.instructionSet.rmmovl) === undefined) { throw "HCL : ctx.instructionSet.rmmovl is undefined in function 'instr_valid'" }
      if((ctx.instructionSet.mrmovl) === undefined) { throw "HCL : ctx.instructionSet.mrmovl is undefined in function 'instr_valid'" }
      if((ctx.instructionSet.alu) === undefined) { throw "HCL : ctx.instructionSet.alu is undefined in function 'instr_valid'" }
      if((ctx.instructionSet.alui) === undefined) { throw "HCL : ctx.instructionSet.alui is undefined in function 'instr_valid'" }
      if((ctx.instructionSet.jxx) === undefined) { throw "HCL : ctx.instructionSet.jxx is undefined in function 'instr_valid'" }
      if((ctx.instructionSet.call) === undefined) { throw "HCL : ctx.instructionSet.call is undefined in function 'instr_valid'" }
      if((ctx.instructionSet.ret) === undefined) { throw "HCL : ctx.instructionSet.ret is undefined in function 'instr_valid'" }
      if((ctx.instructionSet.pushl) === undefined) { throw "HCL : ctx.instructionSet.pushl is undefined in function 'instr_valid'" }
      if((ctx.instructionSet.popl) === undefined) { throw "HCL : ctx.instructionSet.popl is undefined in function 'instr_valid'" }
      if((ctx.instructionSet.loop) === undefined) { throw "HCL : ctx.instructionSet.loop is undefined in function 'instr_valid'" }
      // End of checks
   
      return ((ctx.icode) === (ctx.instructionSet.nop)) || ((ctx.icode) === (ctx.instructionSet.halt)) || ((ctx.icode) === (ctx.instructionSet.rrmovl)) || ((ctx.icode) === (ctx.instructionSet.irmovl)) || ((ctx.icode) === (ctx.instructionSet.rmmovl)) || ((ctx.icode) === (ctx.instructionSet.mrmovl)) || ((ctx.icode) === (ctx.instructionSet.alu)) || ((ctx.icode) === (ctx.instructionSet.alui)) || ((ctx.icode) === (ctx.instructionSet.jxx)) || ((ctx.icode) === (ctx.instructionSet.call)) || ((ctx.icode) === (ctx.instructionSet.ret)) || ((ctx.icode) === (ctx.instructionSet.pushl)) || ((ctx.icode) === (ctx.instructionSet.popl)) || ((ctx.icode) === (ctx.instructionSet.loop));
   }
   
   this.set_cc = () => {
      // Checks if some identifiers are undefined
      if((ctx.icode) === undefined) { throw "HCL : ctx.icode is undefined in function 'set_cc'" }
      if((ctx.instructionSet.alu) === undefined) { throw "HCL : ctx.instructionSet.alu is undefined in function 'set_cc'" }
      if((ctx.instructionSet.alui) === undefined) { throw "HCL : ctx.instructionSet.alui is undefined in function 'set_cc'" }
      // End of checks
   
      return ((ctx.icode) === (ctx.instructionSet.alu)) || ((ctx.icode) === (ctx.instructionSet.alui));
   }
   
   this.mem_read = () => {
      // Checks if some identifiers are undefined
      if((ctx.icode) === undefined) { throw "HCL : ctx.icode is undefined in function 'mem_read'" }
      if((ctx.instructionSet.mrmovl) === undefined) { throw "HCL : ctx.instructionSet.mrmovl is undefined in function 'mem_read'" }
      if((ctx.instructionSet.popl) === undefined) { throw "HCL : ctx.instructionSet.popl is undefined in function 'mem_read'" }
      if((ctx.instructionSet.ret) === undefined) { throw "HCL : ctx.instructionSet.ret is undefined in function 'mem_read'" }
      // End of checks
   
      return ((ctx.icode) === (ctx.instructionSet.mrmovl)) || ((ctx.icode) === (ctx.instructionSet.popl)) || ((ctx.icode) === (ctx.instructionSet.ret));
   }
   
   this.mem_write = () => {
      // Checks if some identifiers are undefined
      if((ctx.icode) === undefined) { throw "HCL : ctx.icode is undefined in function 'mem_write'" }
      if((ctx.instructionSet.rmmovl) === undefined) { throw "HCL : ctx.instructionSet.rmmovl is undefined in function 'mem_write'" }
      if((ctx.instructionSet.pushl) === undefined) { throw "HCL : ctx.instructionSet.pushl is undefined in function 'mem_write'" }
      if((ctx.instructionSet.call) === undefined) { throw "HCL : ctx.instructionSet.call is undefined in function 'mem_write'" }
      // End of checks
   
      return ((ctx.icode) === (ctx.instructionSet.rmmovl)) || ((ctx.icode) === (ctx.instructionSet.pushl)) || ((ctx.icode) === (ctx.instructionSet.call));
   }
   
   }`)
