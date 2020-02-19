import * as hcl from "../../../model/kernel-seq/hcl";
import {registers_enum} from "../../../model/kernel-seq/registers";

test("hcl test", () => {
    hcl.setHandlerCode(`new function() {

        this.externCtx = {}

        this.test = () => {
        
           // Checks if some identifiers are undefined
           if((registers.ebx) === undefined) { throw "HCL : registers.ebx is undefined in function 'test'" }
           // End of checks
        
           if(1) { return registers.ebx; } 
        
        }
        
        }`)

    expect(hcl.call("test")).toBe(registers_enum.ebx)

    expect(() => {
        hcl.setHandlerCode(`new function() {

            // this.externCtx = {} We remove the external context
    
            this.test = () => {
            
               // Checks if some identifiers are undefined
               if((registers.ebx) === undefined) { throw "HCL : registers.ebx is undefined in function 'test'" }
               // End of checks
            
               if(1) { return registers.ebx; } 
            
            }
            
            }`)
    }).toThrow()


    expect(() => {
        hcl.setHandlerCode(``)
    }).toThrow()

    hcl.setHandlerCode(`new function() {
        this.externCtx = {}
        this.test = () => {

            // Checks if some identifiers are undefined
            if((something.ebx) === undefined) { throw "HCL : something.ebx is undefined in function 'test'" }
            // End of checks
         
            if(1) { return something.ebx; } 

        }
    }`)

    expect(() => {
        hcl.call("test")
    }).toThrow()

    hcl.setHandlerCode(`new function() {
        this.externCtx = {}
        this.test = () => {

            // Checks if some identifiers are undefined
            if((registers.aaax) === undefined) { throw "HCL : registers.aaax is undefined in function 'test'" }
            // End of checks
         
            if(1) { return registers.aaax; } 

        }
    }`)

    expect(() => {
        hcl.call("test")
    }).toThrow()

    expect(() => {
        hcl.call("nofunc")
    }).toThrow()
})