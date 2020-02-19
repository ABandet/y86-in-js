import {Alu} from "../../../model/kernel-seq/alu";
import {alufct} from "../../../model/kernel-seq/aluEnum";
import {CC} from "../../../model/kernel-seq/cc";

/**
 * Test the alu constructor.
 * For the moment it just check all the flags are set to false (0) during initialization.
 */
test("Alu test", () => {
    // test constructor
    let alu_test = new Alu();
    for (let flag in alu_test.flags) {
        expect(alu_test.flags[flag]).toBe(false);
    }

    expect(alu_test.flags.length).toBe(Object.keys(CC).length);
});

test("Alu(compute_alu) test", () => {
    let alu_test = new Alu();
});


/**
 * Macro for checking the flags after val1 and val2 operation alufct.
 * It currently check ZF, SF and OF.
 * @param val1
 * @param val2
 * @param alufct
 * @param expected_ZF
 * @param expected_SF
 * @param expected_OF
 */
function flags_test(val1:number, val2:number, alufct : alufct,
                    expected_ZF : boolean, expected_SF : boolean, expected_OF : boolean) {

    let alu = new Alu();
    alu.compute_cc(val1, val2, alufct);

    expect(alu.flags[CC.ZF]).toBe(expected_ZF);
    expect(alu.flags[CC.SF]).toBe(expected_SF);
    expect(alu.flags[CC.OF]).toBe(expected_OF);
}

/**
 * Test the compute_cc function with the ADD operation.
 */
test("Alu(compute_cc - ADD) test", () => {

    // double zero
    flags_test(0,0, alufct.A_ADD, true, false, false);
    // one positive
    flags_test(10,0, alufct.A_ADD, false, false, false);
    flags_test(0,0x7FFFFFFF, alufct.A_ADD, false, false, false);
    // one negative
    flags_test(-10,0, alufct.A_ADD, false, true, false);
    flags_test(0,-12, alufct.A_ADD, false, true, false);
    // result = 0
    flags_test(12,-12, alufct.A_ADD, true, false, false);
    flags_test(-12,12, alufct.A_ADD, true, false, false);
    // result positive
    flags_test(50,30, alufct.A_ADD, false, false, false);
    flags_test(12,-11, alufct.A_ADD, false, false, false);
    flags_test(-11,12, alufct.A_ADD, false, false, false);
    // result negative
    flags_test(-50,30, alufct.A_ADD, false, true, false);
    flags_test(10,-11, alufct.A_ADD, false, true, false);
    flags_test(-10,-11, alufct.A_ADD, false, true, false);
    // overflow test
    flags_test(0x7FFFFFFF,1, alufct.A_ADD, false, true, true);
    flags_test(0x80000000,-1, alufct.A_ADD, false, false, true);
});

/**
 * Test the compute_cc function with the SUB operation.
 */
test("Alu(compute_cc - SUB) test", () => {

    // double zero
    flags_test(0,0, alufct.A_SUB, true, false, false);
    // one positive
    flags_test(10,0, alufct.A_SUB, false, false, false);
    flags_test(0,0x7FFFFFFF, alufct.A_SUB, false, true, false);
    // one negative
    flags_test(-10,0, alufct.A_SUB, false, false, false);
    flags_test(0,-12, alufct.A_SUB, false, false, false);
    // result = 0
    flags_test(-12,12, alufct.A_SUB, true, false, false);
    // result positive
    flags_test(50,30, alufct.A_SUB, false, false, false);
    flags_test(12,-11, alufct.A_SUB, false, false, false);
    flags_test(-11,-12, alufct.A_SUB, false, false, false);
    // result negative
    flags_test(-50,30, alufct.A_SUB, false, true, false);
    flags_test(10,-11, alufct.A_SUB, false, true, false);
    flags_test(-10,-11, alufct.A_SUB, false, true, false);
    // overflow test
    flags_test(0x7FFFFFFF,1, alufct.A_SUB, false, true, true);
    flags_test(0x80000000,-1, alufct.A_SUB, false, false, true);
});