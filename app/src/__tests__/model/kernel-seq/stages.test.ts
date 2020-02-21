import {Sim} from "../../../model/kernel-seq/sim";
import {fetch} from "../../../model/kernel-seq/stages";


let prog_test : string =
    "  0x0000:              | Init:\n" +
    "  0x0000: 30f500010000 |     irmovl 0x100, %ebp\n" +
    "  0x0006: 30f400010000 |     irmovl 0x100, %esp\n" +
    "  0x000c: c0f03412ffff |     iaddl 0xffff1234, %eax\n" +
    "  0x0012: c1f001000000 |     isubl 1, %eax\n" +
    "  0x0018: c3f001000000 |     ixorl 0x00000001, %eax\n" +
    "  0x001e: c2f03312ffff |     iandl 0xffff1233, %eax\n" +
    "                       |     \n" +
    "                       | \n"

function load_test_prog(sim : Sim, prog : string = prog_test) {
    sim.memory.loadProgram(prog_test);
}

test("Fetch test", () => {
    let sim = new Sim();
    load_test_prog(sim);

    fetch(sim);
});