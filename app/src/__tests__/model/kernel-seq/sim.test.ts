import { Sim } from "../../../model/kernel-seq/sim"
import { simStatus } from "../../../model/status"

const program = "                       | \n" +
    "  0x0000:              | Init:\n" +
    "  0x0000: 30f02a000000 |     irmovl 42, %eax\n" +
    "  0x0006: 400f12000000 |     rmmovl %eax, 0x12\n" +
    "  0x000c: 503f12000000 |     mrmovl 0x12, %ebx\n" +
    "  0x0012: 00           | halt\n" +
    "                       | "

test("simulation test", () => {
    let sim = new Sim();

    sim.memory.loadProgram(program);
    sim.context.instructionSet = {};
    
    expect(sim.step()).toBe(simStatus.AOK);
    expect(sim.continue()).toBe(simStatus.HALT);
}) 