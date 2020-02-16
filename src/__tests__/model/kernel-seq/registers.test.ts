import {Registers, registers} from "../../../model/kernel-seq/registers";

test("Registers tests", function() {

    let eax_test_value = -5;

    // test init function in constructor
    let reg_test = new Registers();

    for (let reg in reg_test.content ) {
        // @ts-ignore
        expect(reg == 0);
    }


    // test write function
    reg_test.write(1, 10);
    expect(reg_test.content[1] == 10);
    reg_test.write(1, 0);
    expect(reg_test.content[1] == 0);

    reg_test.write(registers.eax, eax_test_value);
    expect(reg_test.content[registers.eax] == eax_test_value);
    expect(reg_test.content[registers.ebx] == 0);


    // test init function after write
    reg_test.init();
    for (let reg in reg_test.content ) {
        // @ts-ignore
        expect(reg == 0);
    }

    // test read
    expect(reg_test.read(registers.eax) == eax_test_value);
    expect(reg_test.read(4) == 0);

});