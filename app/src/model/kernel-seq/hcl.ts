import { HclException } from "../exceptions/simulatorException"
import * as registersModule from "./registers"
import * as aluModule from "./aluEnum"
import { Instruction } from "../instructionSet"
import { IInstructionSet } from '../interfaces/IInstructionSet'
import { Context } from "./context"

//
// Alias for enum usable in HCL code
//
let registers = registersModule.registers_enum
let alufct = aluModule.alufct
let instructionSet : Map<string, Instruction>
let ctx : any

export { call, setHclCode, setCtx, setInstructionSet }

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
function setHclCode(code : string) {
   let handler = eval(code)
   if(!(handler instanceof Object)) {
      throw new HclException("The given handler is not an object (type : " + typeof handler + ")")
   }
   hclHandler = handler
}

function setInstructionSet(instructions : IInstructionSet) {
   instructionSet = instructions.getHandle()
}

/**
 * Sets the context the hcl code can use.
 * If no context is specified, the hcl code will be able to call global variables
 * only.
 * @param newCtx 
 */
function setCtx(newCtx : any) {
   ctx = newCtx
}

const defaultHclCode = `new function() {

   this.srcA = () => {
   
      // Checks if some identifiers are undefined
      try { if(ctx.icode === undefined) { throw '' } } catch(e) { throw "HCL : ctx.icode is not accessible in function 'srcA'" }
      try { if(instructionSet.get("rrmovl").icode === undefined) { throw '' } } catch(e) { throw "HCL : instructionSet.get('rrmovl').icode is not accessible in function 'srcA'" }
      try { if(instructionSet.get("rmmovl").icode === undefined) { throw '' } } catch(e) { throw "HCL : instructionSet.get('rmmovl').icode is not accessible in function 'srcA'" }
      try { if(instructionSet.get("addl").icode === undefined) { throw '' } } catch(e) { throw "HCL : instructionSet.get('addl').icode is not accessible in function 'srcA'" }
      try { if(instructionSet.get("pushl").icode === undefined) { throw '' } } catch(e) { throw "HCL : instructionSet.get('pushl').icode is not accessible in function 'srcA'" }
      try { if(ctx.ra === undefined) { throw '' } } catch(e) { throw "HCL : ctx.ra is not accessible in function 'srcA'" }
      try { if(ctx.icode === undefined) { throw '' } } catch(e) { throw "HCL : ctx.icode is not accessible in function 'srcA'" }
      try { if(instructionSet.get("popl").icode === undefined) { throw '' } } catch(e) { throw "HCL : instructionSet.get('popl').icode is not accessible in function 'srcA'" }
      try { if(instructionSet.get("ret").icode === undefined) { throw '' } } catch(e) { throw "HCL : instructionSet.get('ret').icode is not accessible in function 'srcA'" }
      try { if(registers.esp === undefined) { throw '' } } catch(e) { throw "HCL : registers.esp is not accessible in function 'srcA'" }
      try { if(registers.none === undefined) { throw '' } } catch(e) { throw "HCL : registers.none is not accessible in function 'srcA'" }
      // End of checks
   
      if(((ctx.icode) === (instructionSet.get("rrmovl").icode)) || ((ctx.icode) === (instructionSet.get("rmmovl").icode)) || ((ctx.icode) === (instructionSet.get("addl").icode)) || ((ctx.icode) === (instructionSet.get("pushl").icode))) { return ctx.ra; } 
   
      if(((ctx.icode) === (instructionSet.get("popl").icode)) || ((ctx.icode) === (instructionSet.get("ret").icode))) { return registers.esp; } 
   
      if(1) { return registers.none; } 
   
   }
   
   this.srcB = () => {
   
      // Checks if some identifiers are undefined
      try { if(ctx.icode === undefined) { throw '' } } catch(e) { throw "HCL : ctx.icode is not accessible in function 'srcB'" }
      try { if(instructionSet.get("addl").icode === undefined) { throw '' } } catch(e) { throw "HCL : instructionSet.get('addl').icode is not accessible in function 'srcB'" }
      try { if(instructionSet.get("iaddl").icode === undefined) { throw '' } } catch(e) { throw "HCL : instructionSet.get('iaddl').icode is not accessible in function 'srcB'" }
      try { if(instructionSet.get("rmmovl").icode === undefined) { throw '' } } catch(e) { throw "HCL : instructionSet.get('rmmovl').icode is not accessible in function 'srcB'" }
      try { if(instructionSet.get("mrmovl").icode === undefined) { throw '' } } catch(e) { throw "HCL : instructionSet.get('mrmovl').icode is not accessible in function 'srcB'" }
      try { if(ctx.rb === undefined) { throw '' } } catch(e) { throw "HCL : ctx.rb is not accessible in function 'srcB'" }
      try { if(ctx.icode === undefined) { throw '' } } catch(e) { throw "HCL : ctx.icode is not accessible in function 'srcB'" }
      try { if(instructionSet.get("pushl").icode === undefined) { throw '' } } catch(e) { throw "HCL : instructionSet.get('pushl').icode is not accessible in function 'srcB'" }
      try { if(instructionSet.get("popl").icode === undefined) { throw '' } } catch(e) { throw "HCL : instructionSet.get('popl').icode is not accessible in function 'srcB'" }
      try { if(instructionSet.get("call").icode === undefined) { throw '' } } catch(e) { throw "HCL : instructionSet.get('call').icode is not accessible in function 'srcB'" }
      try { if(instructionSet.get("ret").icode === undefined) { throw '' } } catch(e) { throw "HCL : instructionSet.get('ret').icode is not accessible in function 'srcB'" }
      try { if(registers.esp === undefined) { throw '' } } catch(e) { throw "HCL : registers.esp is not accessible in function 'srcB'" }
      try { if(registers.none === undefined) { throw '' } } catch(e) { throw "HCL : registers.none is not accessible in function 'srcB'" }
      // End of checks
   
      if(((ctx.icode) === (instructionSet.get("addl").icode)) || ((ctx.icode) === (instructionSet.get("iaddl").icode)) || ((ctx.icode) === (instructionSet.get("rmmovl").icode)) || ((ctx.icode) === (instructionSet.get("mrmovl").icode))) { return ctx.rb; } 
   
      if(((ctx.icode) === (instructionSet.get("pushl").icode)) || ((ctx.icode) === (instructionSet.get("popl").icode)) || ((ctx.icode) === (instructionSet.get("call").icode)) || ((ctx.icode) === (instructionSet.get("ret").icode))) { return registers.esp; } 
   
      if(1) { return registers.none; } 
   
   }
   
   this.dstE = () => {
   
      // Checks if some identifiers are undefined
      try { if(ctx.icode === undefined) { throw '' } } catch(e) { throw "HCL : ctx.icode is not accessible in function 'dstE'" }
      try { if(instructionSet.get("rrmovl").icode === undefined) { throw '' } } catch(e) { throw "HCL : instructionSet.get('rrmovl').icode is not accessible in function 'dstE'" }
      try { if(instructionSet.get("irmovl").icode === undefined) { throw '' } } catch(e) { throw "HCL : instructionSet.get('irmovl').icode is not accessible in function 'dstE'" }
      try { if(instructionSet.get("addl").icode === undefined) { throw '' } } catch(e) { throw "HCL : instructionSet.get('addl').icode is not accessible in function 'dstE'" }
      try { if(instructionSet.get("iaddl").icode === undefined) { throw '' } } catch(e) { throw "HCL : instructionSet.get('iaddl').icode is not accessible in function 'dstE'" }
      try { if(ctx.rb === undefined) { throw '' } } catch(e) { throw "HCL : ctx.rb is not accessible in function 'dstE'" }
      try { if(ctx.icode === undefined) { throw '' } } catch(e) { throw "HCL : ctx.icode is not accessible in function 'dstE'" }
      try { if(instructionSet.get("pushl").icode === undefined) { throw '' } } catch(e) { throw "HCL : instructionSet.get('pushl').icode is not accessible in function 'dstE'" }
      try { if(instructionSet.get("popl").icode === undefined) { throw '' } } catch(e) { throw "HCL : instructionSet.get('popl').icode is not accessible in function 'dstE'" }
      try { if(instructionSet.get("call").icode === undefined) { throw '' } } catch(e) { throw "HCL : instructionSet.get('call').icode is not accessible in function 'dstE'" }
      try { if(instructionSet.get("ret").icode === undefined) { throw '' } } catch(e) { throw "HCL : instructionSet.get('ret').icode is not accessible in function 'dstE'" }
      try { if(registers.esp === undefined) { throw '' } } catch(e) { throw "HCL : registers.esp is not accessible in function 'dstE'" }
      try { if(registers.none === undefined) { throw '' } } catch(e) { throw "HCL : registers.none is not accessible in function 'dstE'" }
      // End of checks
   
      if(((ctx.icode) === (instructionSet.get("rrmovl").icode)) || ((ctx.icode) === (instructionSet.get("irmovl").icode)) || ((ctx.icode) === (instructionSet.get("addl").icode)) || ((ctx.icode) === (instructionSet.get("iaddl").icode))) { return ctx.rb; } 
   
      if(((ctx.icode) === (instructionSet.get("pushl").icode)) || ((ctx.icode) === (instructionSet.get("popl").icode)) || ((ctx.icode) === (instructionSet.get("call").icode)) || ((ctx.icode) === (instructionSet.get("ret").icode))) { return registers.esp; } 
   
      if(1) { return registers.none; } 
   
   }
   
   this.dstM = () => {
   
      // Checks if some identifiers are undefined
      try { if(ctx.icode === undefined) { throw '' } } catch(e) { throw "HCL : ctx.icode is not accessible in function 'dstM'" }
      try { if(instructionSet.get("mrmovl").icode === undefined) { throw '' } } catch(e) { throw "HCL : instructionSet.get('mrmovl').icode is not accessible in function 'dstM'" }
      try { if(instructionSet.get("popl").icode === undefined) { throw '' } } catch(e) { throw "HCL : instructionSet.get('popl').icode is not accessible in function 'dstM'" }
      try { if(ctx.ra === undefined) { throw '' } } catch(e) { throw "HCL : ctx.ra is not accessible in function 'dstM'" }
      try { if(registers.none === undefined) { throw '' } } catch(e) { throw "HCL : registers.none is not accessible in function 'dstM'" }
      // End of checks
   
      if(((ctx.icode) === (instructionSet.get("mrmovl").icode)) || ((ctx.icode) === (instructionSet.get("popl").icode))) { return ctx.ra; } 
   
      if(1) { return registers.none; } 
   
   }
   
   this.aluA = () => {
   
      // Checks if some identifiers are undefined
      try { if(ctx.icode === undefined) { throw '' } } catch(e) { throw "HCL : ctx.icode is not accessible in function 'aluA'" }
      try { if(instructionSet.get("rrmovl").icode === undefined) { throw '' } } catch(e) { throw "HCL : instructionSet.get('rrmovl').icode is not accessible in function 'aluA'" }
      try { if(instructionSet.get("addl").icode === undefined) { throw '' } } catch(e) { throw "HCL : instructionSet.get('addl').icode is not accessible in function 'aluA'" }
      try { if(ctx.vala === undefined) { throw '' } } catch(e) { throw "HCL : ctx.vala is not accessible in function 'aluA'" }
      try { if(ctx.icode === undefined) { throw '' } } catch(e) { throw "HCL : ctx.icode is not accessible in function 'aluA'" }
      try { if(instructionSet.get("irmovl").icode === undefined) { throw '' } } catch(e) { throw "HCL : instructionSet.get('irmovl').icode is not accessible in function 'aluA'" }
      try { if(instructionSet.get("rmmovl").icode === undefined) { throw '' } } catch(e) { throw "HCL : instructionSet.get('rmmovl').icode is not accessible in function 'aluA'" }
      try { if(instructionSet.get("mrmovl").icode === undefined) { throw '' } } catch(e) { throw "HCL : instructionSet.get('mrmovl').icode is not accessible in function 'aluA'" }
      try { if(instructionSet.get("iaddl").icode === undefined) { throw '' } } catch(e) { throw "HCL : instructionSet.get('iaddl').icode is not accessible in function 'aluA'" }
      try { if(ctx.valc === undefined) { throw '' } } catch(e) { throw "HCL : ctx.valc is not accessible in function 'aluA'" }
      try { if(ctx.icode === undefined) { throw '' } } catch(e) { throw "HCL : ctx.icode is not accessible in function 'aluA'" }
      try { if(instructionSet.get("call").icode === undefined) { throw '' } } catch(e) { throw "HCL : instructionSet.get('call').icode is not accessible in function 'aluA'" }
      try { if(instructionSet.get("pushl").icode === undefined) { throw '' } } catch(e) { throw "HCL : instructionSet.get('pushl').icode is not accessible in function 'aluA'" }
      try { if(ctx.icode === undefined) { throw '' } } catch(e) { throw "HCL : ctx.icode is not accessible in function 'aluA'" }
      try { if(instructionSet.get("ret").icode === undefined) { throw '' } } catch(e) { throw "HCL : instructionSet.get('ret').icode is not accessible in function 'aluA'" }
      try { if(instructionSet.get("popl").icode === undefined) { throw '' } } catch(e) { throw "HCL : instructionSet.get('popl').icode is not accessible in function 'aluA'" }
      // End of checks
   
      if(((ctx.icode) === (instructionSet.get("rrmovl").icode)) || ((ctx.icode) === (instructionSet.get("addl").icode))) { return ctx.vala; } 
   
      if(((ctx.icode) === (instructionSet.get("irmovl").icode)) || ((ctx.icode) === (instructionSet.get("rmmovl").icode)) || ((ctx.icode) === (instructionSet.get("mrmovl").icode)) || ((ctx.icode) === (instructionSet.get("iaddl").icode))) { return ctx.valc; } 
   
      if(((ctx.icode) === (instructionSet.get("call").icode)) || ((ctx.icode) === (instructionSet.get("pushl").icode))) { return -4; } 
   
      if(((ctx.icode) === (instructionSet.get("ret").icode)) || ((ctx.icode) === (instructionSet.get("popl").icode))) { return 4; } 
   
   }
   
   this.aluB = () => {
   
      // Checks if some identifiers are undefined
      try { if(ctx.icode === undefined) { throw '' } } catch(e) { throw "HCL : ctx.icode is not accessible in function 'aluB'" }
      try { if(instructionSet.get("rmmovl").icode === undefined) { throw '' } } catch(e) { throw "HCL : instructionSet.get('rmmovl').icode is not accessible in function 'aluB'" }
      try { if(instructionSet.get("mrmovl").icode === undefined) { throw '' } } catch(e) { throw "HCL : instructionSet.get('mrmovl').icode is not accessible in function 'aluB'" }
      try { if(instructionSet.get("addl").icode === undefined) { throw '' } } catch(e) { throw "HCL : instructionSet.get('addl').icode is not accessible in function 'aluB'" }
      try { if(instructionSet.get("iaddl").icode === undefined) { throw '' } } catch(e) { throw "HCL : instructionSet.get('iaddl').icode is not accessible in function 'aluB'" }
      try { if(instructionSet.get("call").icode === undefined) { throw '' } } catch(e) { throw "HCL : instructionSet.get('call').icode is not accessible in function 'aluB'" }
      try { if(instructionSet.get("pushl").icode === undefined) { throw '' } } catch(e) { throw "HCL : instructionSet.get('pushl').icode is not accessible in function 'aluB'" }
      try { if(instructionSet.get("ret").icode === undefined) { throw '' } } catch(e) { throw "HCL : instructionSet.get('ret').icode is not accessible in function 'aluB'" }
      try { if(instructionSet.get("popl").icode === undefined) { throw '' } } catch(e) { throw "HCL : instructionSet.get('popl').icode is not accessible in function 'aluB'" }
      try { if(ctx.valb === undefined) { throw '' } } catch(e) { throw "HCL : ctx.valb is not accessible in function 'aluB'" }
      try { if(ctx.icode === undefined) { throw '' } } catch(e) { throw "HCL : ctx.icode is not accessible in function 'aluB'" }
      try { if(instructionSet.get("rrmovl").icode === undefined) { throw '' } } catch(e) { throw "HCL : instructionSet.get('rrmovl').icode is not accessible in function 'aluB'" }
      try { if(instructionSet.get("irmovl").icode === undefined) { throw '' } } catch(e) { throw "HCL : instructionSet.get('irmovl').icode is not accessible in function 'aluB'" }
      // End of checks
   
      if(((ctx.icode) === (instructionSet.get("rmmovl").icode)) || ((ctx.icode) === (instructionSet.get("mrmovl").icode)) || ((ctx.icode) === (instructionSet.get("addl").icode)) || ((ctx.icode) === (instructionSet.get("iaddl").icode)) || ((ctx.icode) === (instructionSet.get("call").icode)) || ((ctx.icode) === (instructionSet.get("pushl").icode)) || ((ctx.icode) === (instructionSet.get("ret").icode)) || ((ctx.icode) === (instructionSet.get("popl").icode))) { return ctx.valb; } 
   
      if(((ctx.icode) === (instructionSet.get("rrmovl").icode)) || ((ctx.icode) === (instructionSet.get("irmovl").icode))) { return 0; } 
   
   }
   
   this.alufun = () => {
   
      // Checks if some identifiers are undefined
      try { if(ctx.icode === undefined) { throw '' } } catch(e) { throw "HCL : ctx.icode is not accessible in function 'alufun'" }
      try { if(instructionSet.get("addl").icode === undefined) { throw '' } } catch(e) { throw "HCL : instructionSet.get('addl').icode is not accessible in function 'alufun'" }
      try { if(instructionSet.get("iaddl").icode === undefined) { throw '' } } catch(e) { throw "HCL : instructionSet.get('iaddl').icode is not accessible in function 'alufun'" }
      try { if(ctx.ifun === undefined) { throw '' } } catch(e) { throw "HCL : ctx.ifun is not accessible in function 'alufun'" }
      try { if(alufct.A_ADD === undefined) { throw '' } } catch(e) { throw "HCL : alufct.A_ADD is not accessible in function 'alufun'" }
      // End of checks
   
      if(((ctx.icode) === (instructionSet.get("addl").icode)) || ((ctx.icode) === (instructionSet.get("iaddl").icode))) { return ctx.ifun; } 
   
      if(1) { return alufct.A_ADD; } 
   
   }
   
   this.mem_addr = () => {
   
      // Checks if some identifiers are undefined
      try { if(ctx.icode === undefined) { throw '' } } catch(e) { throw "HCL : ctx.icode is not accessible in function 'mem_addr'" }
      try { if(instructionSet.get("rmmovl").icode === undefined) { throw '' } } catch(e) { throw "HCL : instructionSet.get('rmmovl').icode is not accessible in function 'mem_addr'" }
      try { if(instructionSet.get("pushl").icode === undefined) { throw '' } } catch(e) { throw "HCL : instructionSet.get('pushl').icode is not accessible in function 'mem_addr'" }
      try { if(instructionSet.get("call").icode === undefined) { throw '' } } catch(e) { throw "HCL : instructionSet.get('call').icode is not accessible in function 'mem_addr'" }
      try { if(instructionSet.get("mrmovl").icode === undefined) { throw '' } } catch(e) { throw "HCL : instructionSet.get('mrmovl').icode is not accessible in function 'mem_addr'" }
      try { if(ctx.vale === undefined) { throw '' } } catch(e) { throw "HCL : ctx.vale is not accessible in function 'mem_addr'" }
      try { if(ctx.icode === undefined) { throw '' } } catch(e) { throw "HCL : ctx.icode is not accessible in function 'mem_addr'" }
      try { if(instructionSet.get("popl").icode === undefined) { throw '' } } catch(e) { throw "HCL : instructionSet.get('popl').icode is not accessible in function 'mem_addr'" }
      try { if(instructionSet.get("ret").icode === undefined) { throw '' } } catch(e) { throw "HCL : instructionSet.get('ret').icode is not accessible in function 'mem_addr'" }
      try { if(ctx.vala === undefined) { throw '' } } catch(e) { throw "HCL : ctx.vala is not accessible in function 'mem_addr'" }
      // End of checks
   
      if(((ctx.icode) === (instructionSet.get("rmmovl").icode)) || ((ctx.icode) === (instructionSet.get("pushl").icode)) || ((ctx.icode) === (instructionSet.get("call").icode)) || ((ctx.icode) === (instructionSet.get("mrmovl").icode))) { return ctx.vale; } 
   
      if(((ctx.icode) === (instructionSet.get("popl").icode)) || ((ctx.icode) === (instructionSet.get("ret").icode))) { return ctx.vala; } 
   
   }
   
   this.mem_data = () => {
   
      // Checks if some identifiers are undefined
      try { if(ctx.icode === undefined) { throw '' } } catch(e) { throw "HCL : ctx.icode is not accessible in function 'mem_data'" }
      try { if(instructionSet.get("rmmovl").icode === undefined) { throw '' } } catch(e) { throw "HCL : instructionSet.get('rmmovl').icode is not accessible in function 'mem_data'" }
      try { if(instructionSet.get("pushl").icode === undefined) { throw '' } } catch(e) { throw "HCL : instructionSet.get('pushl').icode is not accessible in function 'mem_data'" }
      try { if(ctx.vala === undefined) { throw '' } } catch(e) { throw "HCL : ctx.vala is not accessible in function 'mem_data'" }
      try { if(ctx.icode === undefined) { throw '' } } catch(e) { throw "HCL : ctx.icode is not accessible in function 'mem_data'" }
      try { if(instructionSet.get("call").icode === undefined) { throw '' } } catch(e) { throw "HCL : instructionSet.get('call').icode is not accessible in function 'mem_data'" }
      try { if(ctx.valp === undefined) { throw '' } } catch(e) { throw "HCL : ctx.valp is not accessible in function 'mem_data'" }
      // End of checks
   
      if(((ctx.icode) === (instructionSet.get("rmmovl").icode)) || ((ctx.icode) === (instructionSet.get("pushl").icode))) { return ctx.vala; } 
   
      if(ctx.icode == instructionSet.get("call").icode) { return ctx.valp; } 
   
   }
   
   this.new_pc = () => {
   
      // Checks if some identifiers are undefined
      try { if(ctx.icode === undefined) { throw '' } } catch(e) { throw "HCL : ctx.icode is not accessible in function 'new_pc'" }
      try { if(instructionSet.get("call").icode === undefined) { throw '' } } catch(e) { throw "HCL : instructionSet.get('call').icode is not accessible in function 'new_pc'" }
      try { if(ctx.valc === undefined) { throw '' } } catch(e) { throw "HCL : ctx.valc is not accessible in function 'new_pc'" }
      try { if(ctx.icode === undefined) { throw '' } } catch(e) { throw "HCL : ctx.icode is not accessible in function 'new_pc'" }
      try { if(instructionSet.get("jmp").icode === undefined) { throw '' } } catch(e) { throw "HCL : instructionSet.get('jmp').icode is not accessible in function 'new_pc'" }
      try { if(ctx.bcond === undefined) { throw '' } } catch(e) { throw "HCL : ctx.bcond is not accessible in function 'new_pc'" }
      try { if(ctx.valc === undefined) { throw '' } } catch(e) { throw "HCL : ctx.valc is not accessible in function 'new_pc'" }
      try { if(ctx.icode === undefined) { throw '' } } catch(e) { throw "HCL : ctx.icode is not accessible in function 'new_pc'" }
      try { if(instructionSet.get("ret").icode === undefined) { throw '' } } catch(e) { throw "HCL : instructionSet.get('ret').icode is not accessible in function 'new_pc'" }
      try { if(ctx.valm === undefined) { throw '' } } catch(e) { throw "HCL : ctx.valm is not accessible in function 'new_pc'" }
      try { if(ctx.valp === undefined) { throw '' } } catch(e) { throw "HCL : ctx.valp is not accessible in function 'new_pc'" }
      // End of checks
   
      if(ctx.icode == instructionSet.get("call").icode) { return ctx.valc; } 
   
      if(ctx.icode == instructionSet.get("jmp").icode && ctx.bcond) { return ctx.valc; } 
   
      if(ctx.icode == instructionSet.get("ret").icode) { return ctx.valm; } 
   
      if(1) { return ctx.valp; } 
   
   }
   
   this.need_regids = () => {
      // Checks if some identifiers are undefined
      try { if(ctx.icode === undefined) { throw '' } } catch(e) { throw "HCL : ctx.icode is not accessible in function 'need_regids'" }
      try { if(instructionSet.get("rrmovl").icode === undefined) { throw '' } } catch(e) { throw "HCL : instructionSet.get('rrmovl').icode is not accessible in function 'need_regids'" }
      try { if(instructionSet.get("addl").icode === undefined) { throw '' } } catch(e) { throw "HCL : instructionSet.get('addl').icode is not accessible in function 'need_regids'" }
      try { if(instructionSet.get("iaddl").icode === undefined) { throw '' } } catch(e) { throw "HCL : instructionSet.get('iaddl').icode is not accessible in function 'need_regids'" }
      try { if(instructionSet.get("pushl").icode === undefined) { throw '' } } catch(e) { throw "HCL : instructionSet.get('pushl').icode is not accessible in function 'need_regids'" }
      try { if(instructionSet.get("popl").icode === undefined) { throw '' } } catch(e) { throw "HCL : instructionSet.get('popl').icode is not accessible in function 'need_regids'" }
      try { if(instructionSet.get("irmovl").icode === undefined) { throw '' } } catch(e) { throw "HCL : instructionSet.get('irmovl').icode is not accessible in function 'need_regids'" }
      try { if(instructionSet.get("rmmovl").icode === undefined) { throw '' } } catch(e) { throw "HCL : instructionSet.get('rmmovl').icode is not accessible in function 'need_regids'" }
      try { if(instructionSet.get("mrmovl").icode === undefined) { throw '' } } catch(e) { throw "HCL : instructionSet.get('mrmovl').icode is not accessible in function 'need_regids'" }
      // End of checks
   
      return ((ctx.icode) === (instructionSet.get("rrmovl").icode)) || ((ctx.icode) === (instructionSet.get("addl").icode)) || ((ctx.icode) === (instructionSet.get("iaddl").icode)) || ((ctx.icode) === (instructionSet.get("pushl").icode)) || ((ctx.icode) === (instructionSet.get("popl").icode)) || ((ctx.icode) === (instructionSet.get("irmovl").icode)) || ((ctx.icode) === (instructionSet.get("rmmovl").icode)) || ((ctx.icode) === (instructionSet.get("mrmovl").icode));
   }
   
   this.need_valC = () => {
      // Checks if some identifiers are undefined
      try { if(ctx.icode === undefined) { throw '' } } catch(e) { throw "HCL : ctx.icode is not accessible in function 'need_valC'" }
      try { if(instructionSet.get("irmovl").icode === undefined) { throw '' } } catch(e) { throw "HCL : instructionSet.get('irmovl').icode is not accessible in function 'need_valC'" }
      try { if(instructionSet.get("rmmovl").icode === undefined) { throw '' } } catch(e) { throw "HCL : instructionSet.get('rmmovl').icode is not accessible in function 'need_valC'" }
      try { if(instructionSet.get("mrmovl").icode === undefined) { throw '' } } catch(e) { throw "HCL : instructionSet.get('mrmovl').icode is not accessible in function 'need_valC'" }
      try { if(instructionSet.get("jmp").icode === undefined) { throw '' } } catch(e) { throw "HCL : instructionSet.get('jmp').icode is not accessible in function 'need_valC'" }
      try { if(instructionSet.get("call").icode === undefined) { throw '' } } catch(e) { throw "HCL : instructionSet.get('call').icode is not accessible in function 'need_valC'" }
      // End of checks
   
      return ((ctx.icode) === (instructionSet.get("irmovl").icode)) || ((ctx.icode) === (instructionSet.get("rmmovl").icode)) || ((ctx.icode) === (instructionSet.get("mrmovl").icode)) || ((ctx.icode) === (instructionSet.get("jmp").icode)) || ((ctx.icode) === (instructionSet.get("call").icode));
   }
   
   this.instr_valid = () => {
      // Checks if some identifiers are undefined
      try { if(ctx.icode === undefined) { throw '' } } catch(e) { throw "HCL : ctx.icode is not accessible in function 'instr_valid'" }
      try { if(instructionSet.get("nop").icode === undefined) { throw '' } } catch(e) { throw "HCL : instructionSet.get('nop').icode is not accessible in function 'instr_valid'" }
      try { if(instructionSet.get("halt").icode === undefined) { throw '' } } catch(e) { throw "HCL : instructionSet.get('halt').icode is not accessible in function 'instr_valid'" }
      try { if(instructionSet.get("rrmovl").icode === undefined) { throw '' } } catch(e) { throw "HCL : instructionSet.get('rrmovl').icode is not accessible in function 'instr_valid'" }
      try { if(instructionSet.get("irmovl").icode === undefined) { throw '' } } catch(e) { throw "HCL : instructionSet.get('irmovl').icode is not accessible in function 'instr_valid'" }
      try { if(instructionSet.get("rmmovl").icode === undefined) { throw '' } } catch(e) { throw "HCL : instructionSet.get('rmmovl').icode is not accessible in function 'instr_valid'" }
      try { if(instructionSet.get("mrmovl").icode === undefined) { throw '' } } catch(e) { throw "HCL : instructionSet.get('mrmovl').icode is not accessible in function 'instr_valid'" }
      try { if(instructionSet.get("addl").icode === undefined) { throw '' } } catch(e) { throw "HCL : instructionSet.get('addl').icode is not accessible in function 'instr_valid'" }
      try { if(instructionSet.get("iaddl").icode === undefined) { throw '' } } catch(e) { throw "HCL : instructionSet.get('iaddl').icode is not accessible in function 'instr_valid'" }
      try { if(instructionSet.get("jmp").icode === undefined) { throw '' } } catch(e) { throw "HCL : instructionSet.get('jmp').icode is not accessible in function 'instr_valid'" }
      try { if(instructionSet.get("call").icode === undefined) { throw '' } } catch(e) { throw "HCL : instructionSet.get('call').icode is not accessible in function 'instr_valid'" }
      try { if(instructionSet.get("ret").icode === undefined) { throw '' } } catch(e) { throw "HCL : instructionSet.get('ret').icode is not accessible in function 'instr_valid'" }
      try { if(instructionSet.get("pushl").icode === undefined) { throw '' } } catch(e) { throw "HCL : instructionSet.get('pushl').icode is not accessible in function 'instr_valid'" }
      try { if(instructionSet.get("popl").icode === undefined) { throw '' } } catch(e) { throw "HCL : instructionSet.get('popl').icode is not accessible in function 'instr_valid'" }
      // End of checks
   
      return ((ctx.icode) === (instructionSet.get("nop").icode)) || ((ctx.icode) === (instructionSet.get("halt").icode)) || ((ctx.icode) === (instructionSet.get("rrmovl").icode)) || ((ctx.icode) === (instructionSet.get("irmovl").icode)) || ((ctx.icode) === (instructionSet.get("rmmovl").icode)) || ((ctx.icode) === (instructionSet.get("mrmovl").icode)) || ((ctx.icode) === (instructionSet.get("addl").icode)) || ((ctx.icode) === (instructionSet.get("iaddl").icode)) || ((ctx.icode) === (instructionSet.get("jmp").icode)) || ((ctx.icode) === (instructionSet.get("call").icode)) || ((ctx.icode) === (instructionSet.get("ret").icode)) || ((ctx.icode) === (instructionSet.get("pushl").icode)) || ((ctx.icode) === (instructionSet.get("popl").icode));
   }
   
   this.set_cc = () => {
      // Checks if some identifiers are undefined
      try { if(ctx.icode === undefined) { throw '' } } catch(e) { throw "HCL : ctx.icode is not accessible in function 'set_cc'" }
      try { if(instructionSet.get("addl").icode === undefined) { throw '' } } catch(e) { throw "HCL : instructionSet.get('addl').icode is not accessible in function 'set_cc'" }
      try { if(instructionSet.get("iaddl").icode === undefined) { throw '' } } catch(e) { throw "HCL : instructionSet.get('iaddl').icode is not accessible in function 'set_cc'" }
      // End of checks
   
      return ((ctx.icode) === (instructionSet.get("addl").icode)) || ((ctx.icode) === (instructionSet.get("iaddl").icode));
   }
   
   this.mem_read = () => {
      // Checks if some identifiers are undefined
      try { if(ctx.icode === undefined) { throw '' } } catch(e) { throw "HCL : ctx.icode is not accessible in function 'mem_read'" }
      try { if(instructionSet.get("mrmovl").icode === undefined) { throw '' } } catch(e) { throw "HCL : instructionSet.get('mrmovl').icode is not accessible in function 'mem_read'" }
      try { if(instructionSet.get("popl").icode === undefined) { throw '' } } catch(e) { throw "HCL : instructionSet.get('popl').icode is not accessible in function 'mem_read'" }
      try { if(instructionSet.get("ret").icode === undefined) { throw '' } } catch(e) { throw "HCL : instructionSet.get('ret').icode is not accessible in function 'mem_read'" }
      // End of checks
   
      return ((ctx.icode) === (instructionSet.get("mrmovl").icode)) || ((ctx.icode) === (instructionSet.get("popl").icode)) || ((ctx.icode) === (instructionSet.get("ret").icode));
   }
   
   this.mem_write = () => {
      // Checks if some identifiers are undefined
      try { if(ctx.icode === undefined) { throw '' } } catch(e) { throw "HCL : ctx.icode is not accessible in function 'mem_write'" }
      try { if(instructionSet.get("rmmovl").icode === undefined) { throw '' } } catch(e) { throw "HCL : instructionSet.get('rmmovl').icode is not accessible in function 'mem_write'" }
      try { if(instructionSet.get("pushl").icode === undefined) { throw '' } } catch(e) { throw "HCL : instructionSet.get('pushl').icode is not accessible in function 'mem_write'" }
      try { if(instructionSet.get("call").icode === undefined) { throw '' } } catch(e) { throw "HCL : instructionSet.get('call').icode is not accessible in function 'mem_write'" }
      // End of checks
   
      return ((ctx.icode) === (instructionSet.get("rmmovl").icode)) || ((ctx.icode) === (instructionSet.get("pushl").icode)) || ((ctx.icode) === (instructionSet.get("call").icode));
   }
   
   }`

let hclHandler = eval(defaultHclCode)
   