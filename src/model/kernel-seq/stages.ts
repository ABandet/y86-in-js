import { Sim } from "./sim"
import { Byte, Word } from "./memory"
import { registers } from "./registers"

function decode(sim : Sim) {
    let valp = sim.context.pc
    let byte = sim.memory.readByte(valp)
    valp++
    
    sim.context.icode = byte.HI4()
    sim.context.ifun = byte.LO4()

    if(true /* gen_need_regids() */) {
        byte = sim.memory.readByte(valp)
        valp++

        sim.context.ra = byte.HI4()
        sim.context.rb = byte.LO4()
    } else {
        sim.context.ra = registers.none
        sim.context.rb = registers.none
    }

    if(true /* gen_need_valC() */) {
        sim.context.valC = sim.memory.readRegister(valp)
        valp += Word.SIZE
    } else {
        sim.context.valC = new Word(0)
    }

    // TODO : status (AOK, STOP, etc...)
    // TODO : Manage exceptions (errors can happen while accessing memory)
    // TODO : Edit hcl2js to generate a TS file instead of a JS one. If not,
    //        we'll not be able to perform any call to HCL functions from here.
}

function fetch(sim : Sim) {

}

function execute(sim : Sim) {

}

function memory(sim : Sim) {

}

function writeBack(sim : Sim) {

}

export { decode, fetch, execute, memory, writeBack }