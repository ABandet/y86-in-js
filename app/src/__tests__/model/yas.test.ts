import { KernelController } from '../../controllers/kernelController'
import { Memory } from '../../model/kernel-seq/memory'

let kernelController = new KernelController()
kernelController.useKernel("seq")
let yas = kernelController.getYas()

test('yas (seq, 32 bits) simple program', () => {
    const ys = `
    .pos 0
    Init:
        irmovl Stack, %ebp
        irmovl Stack, %esp
        ret
    
    .pos 0x1abc # Comment
    .align 12
    .long 0x1122
    Stack:
        irmovl Stack, %ebp
        irmovl Stack, %esp
        
    .long -47
    jmp Stack
    iaddl -259, %eax
    
    # Another comment
    .long 10000000000
`   
    let result = yas.assemble(ys)

    expect(result.errors.length).toBe(0)

    const referenceYo = `

    0x0000:              |     .pos 0
    0x0000:              |     Init:
    0x0000: 30f5c81a0000 |         irmovl Stack, %ebp
    0x0006: 30f4c81a0000 |         irmovl Stack, %esp
    0x000c: 90           |         ret
                         |     
    0x000d:              |     .pos 0x1abc # Comment
    0x1abc:              |     .align 12 
    0x1ac4: 22110000     |     .long 0x1122
    0x1ac8:              |     Stack:
    0x1ac8: 30f5c81a0000 |         irmovl Stack, %ebp
    0x1ace: 30f4c81a0000 |         irmovl Stack, %esp
                         |         
    0x1ad4: d1ffffff     |     .long -47
    0x1ad8: 70c81a0000   |     jmp Stack
    0x1add: c0f0fdfeffff |     iaddl -259, %eax
                         |     
                         |     # Another comment
    0x1ae3: 00e40b54     |     .long 10000000000
                         |     
  
    `

    let memory = new Memory()
    memory.loadProgram(result.output)

    let referenceMemory = new Memory()
    referenceMemory.loadProgram(referenceYo)

    for(let i = 0; i < 0x1c; i++) {
        expect(memory.readByte(i)).toBe(referenceMemory.readByte(i))
    }
})