import * as hcl from "../../../model/kernel-seq/hcl";
import {registers_enum} from "../../../model/kernel-seq/registers";

test("hcl test", () => {
    // Does this simple example compile ?
    hcl.setHclCode(`new function() {

        this.externCtx = {}

        this.test = () => {
        
           // Checks if some identifiers are undefined
           if((registers.ebx) === undefined) { throw "HCL : registers.ebx is undefined in function 'test'" }
           // End of checks
        
           if(1) { return registers.ebx; } 
        
        }
        
        }`)

    // The function 'test' must exist and return ebx
    expect(hcl.call("test")).toBe(registers_enum.ebx)

    // Without the externCtx, the hcl compilation shall fail
    expect(() => {
        hcl.setHclCode(`new function() {

            // this.externCtx = {} We remove the external context
    
            this.test = () => {
            
               // Checks if some identifiers are undefined
               if((registers.ebx) === undefined) { throw "HCL : registers.ebx is undefined in function 'test'" }
               // End of checks
            
               if(1) { return registers.ebx; } 
            
            }
            
            }`)
    }).toThrow()

    // Empty code shall throw
    expect(() => {
        hcl.setHclCode(``)
    }).toThrow()

    // Use of non existent fields must not throw at compile-time....
    hcl.setHclCode(`new function() {
        this.externCtx = {}
        this.test = () => {

            // Checks if some identifiers are undefined
            if((something.ebx) === undefined) { throw "HCL : something.ebx is undefined in function 'test'" }
            // End of checks
         
            if(1) { return something.ebx; } 

        }
    }`)

    // ......, that kind of errors are reported at run-time.
    expect(() => {
        hcl.call("test")
    }).toThrow()

    hcl.setHclCode(`new function() {
        this.externCtx = {}
        this.test = () => {

            // Checks if some identifiers are undefined
            if((registers.aaax) === undefined) { throw "HCL : registers.aaax is undefined in function 'test'" }
            // End of checks
         
            if(1) { return registers.aaax; } 

        }
    }`)

    // The test function must throw because of the aaax register does not exist
    expect(() => {
        hcl.call("test")
    }).toThrow()

    // The nofunc does not exist
    expect(() => {
        hcl.call("nofunc")
    }).toThrow()
})