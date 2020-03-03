import {Sim} from "../../../model/kernel-seq/sim";
import {decode, fetch} from "../../../model/kernel-seq/stages";
import {registers_enum} from "../../../model/kernel-seq/registers";

/**
 * Test all stages with all instruction.
 * To work, the sim.memory.loadProgram should be functional.
 */

let irmovl_prog : string =
    "  0x0000: 30f500010000 | irmovl 0x100, %ebp\n" +
    "                       | \n";

let rrmovl_prog : string =
    "  0x0000: 2001         | rrmovl %eax, %ecx\n" +
    "                       | \n";

let rmmovl_prog : string =
    "  0x0000: 402f00010000 | rmmovl %eax, 0x100\n" +
    "                       | \n"

/**
 * Fetch tests
 */
test("Fetch test with irmovl", () => {
    let sim = new Sim();
    sim.memory.loadProgram(irmovl_prog);

    fetch(sim);
    expect(sim.context.icode).toBe(3);
    expect(sim.context.ifun).toBe(0);
    expect(sim.context.rb).toBe(registers_enum.ebp);
    expect(sim.context.ra).toBe(registers_enum.none);
    expect(sim.context.valC).toBe(0x100);
    expect(sim.context.valP).toBe(sim.context.pc + 6);
});

test("Fetch test with rrmovl", () => {
    let sim = new Sim();
    sim.reset();
    sim.memory.loadProgram(rrmovl_prog);

    fetch(sim);
    expect(sim.context.icode).toBe(2);
    expect(sim.context.ifun).toBe(0);
    expect(sim.context.rb).toBe(registers_enum.ecx);
    expect(sim.context.ra).toBe(registers_enum.eax);
    expect(sim.context.valC).toBe(0);
    expect(sim.context.valP).toBe(sim.context.pc + 2);
});

test("Fetch test with rmmovl", () => {
    let sim = new Sim();
    sim.reset();
    sim.memory.loadProgram(rmmovl_prog);

    fetch(sim);
    expect(sim.context.icode).toBe(4);
    expect(sim.context.ifun).toBe(0);
    expect(sim.context.rb).toBe(registers_enum.none);
    expect(sim.context.ra).toBe(registers_enum.edx);
    expect(sim.context.valC).toBe(0x100);
    expect(sim.context.valP).toBe(sim.context.pc + 6);
});

test("Decode test with rrmovl", () => {
    let sim = new Sim();
    sim.reset();
    sim.memory.loadProgram(rrmovl_prog);

    sim.registers.write(registers_enum.eax, 10);

    fetch(sim);
    decode(sim);
    expect(sim.context.valA).toBe(10);
});