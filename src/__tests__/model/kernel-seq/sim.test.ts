import { Sim } from "../../../model/kernel-seq/sim"
import { simStatus } from "../../../model/kernel-seq/status"

const program = `
|
0x0000:              | .pos 0
0x0000:              | Init:
0x0000: 30f02a000000 |     irmovl 42, %eax
0x0006: 400f12000000 |     rmmovl %eax, 0x12
0x000c: 503f12000000 |     mrmovl 0x12, %ebx
                     |     
0x0012:              | .pos 0x100
0x0100:              | Stack:
                     |     
`

test("simulation test", () => {
    let sim = new Sim()

    sim.memory.loadProgram(program)
    sim.context.instructionSet = {}
    
    expect(sim.step()).toBe(simStatus.HALT)
}) 