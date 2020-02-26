export namespace Default {
    export enum InstructionArgType {
        MEM = 0,
        REG = 1,
        CONST = 4,
    }
    
    class InstructionArg {
        type        : InstructionArgType
        position    : number
        value       : number
    
        constructor(type : InstructionArgType, position : number, value : number) {
            this._checkType(type)
            this._checkPosition(position)
    
            this.type = type
            this.position = position
            this.value = value
        }
    
        private _checkType(type : InstructionArgType) {
            for(const possibleType in InstructionArgType) {
                if(type === Number(InstructionArgType[possibleType])) {
                    return
                }
            }
            throw "The given arg type does not exist"
        }
    
        private _checkPosition(position : number) {
            if(position < 0) {
                throw "An instruction argument position can be negative"
            }
        }
    }
    
    class Instruction {
        name    : string
        icode   : number
        ifun    : number
        args    : InstructionArg[] = []
    
        constructor(name : string, icode : number, ifun : number, args : InstructionArg[]) {
            this._checkName(name)
            this._checkCodes(icode, ifun)
            this._checkArgsPosition(args)
    
            this.name = name
            this.icode = icode
            this.ifun = ifun
            this.args = args
        }
    
        private _checkName(name : string) {
            if(name.length === 0) {
                throw "An instruction name can not be empty"
            }
        }
    
        private _checkCodes(icode : number, ifun : number) {
            if(icode < 0 || ifun < 0 || icode > 15 || ifun > 15) {
                throw "icode and ifun must be in [0;15]. icode = " + icode + ", ifun = " + ifun
            }
        }

        private _checkArgsPosition(args : InstructionArg[]) {
            let bitset = Array<boolean>(args.length)

            bitset = bitset.map((item) => {
                return false
            })

            args.forEach((arg, index) => {
                const position = arg.position

                if(position >= args.length) {
                    throw "The arg #" + index + " is at position " + position + ". Maximum position is at " + (args.length - 1)
                }

                if(bitset[position]) {
                    throw "The position " + position + " is already occuped by another argument"
                }

                bitset[position] = true
            })
        }
    }
    
    export class InstructionSet {
        handle : Instruction[] = []
    
        getHandle() : Instruction[] {
            return this.handle
        }
    
        setInstructionSet(instructions : Instruction[]) {
            this.handle = []
            
            instructions.forEach((item) => {
                this.addInstruction(item)
            })
        }

        addInstruction(instruction : Instruction) {
            this.handle.forEach((item) => {
                if(item.name === instruction.name) {
                    throw "An instruction '" + item.name + "' already exists"
                }
                if(item.icode === instruction.icode && item.ifun === instruction.ifun) {
                    throw "The pair of (icode, ifun) (" + item.icode + ", " + item.ifun + " already exists"
                }
            })
        }
    }

    const defaultInstructions : Instruction[] = [
        new Instruction("irrmovl", 1, 2, 
            [new InstructionArg(InstructionArgType.CONST, 1, 42), new InstructionArg(InstructionArgType.REG, 0, 42)]),
    ]
}
