import { KernelController } from '../../controllers/kernelController'

let kernelController = new KernelController()
kernelController.useKernel("seq")
let yas = kernelController.getYas()

test('yas simple program', () => {
    const ys = `

    .pos 0
    Init:
        irmovl Stack, %ebp
        irmovl Stack, %esp
    
    .align 12
    .long 0x1122
    .pos 0xaabb
    Stack:
        irmovl Stack, %ebp
        irmovl Stack, %esp
        
    .long -47
    jmp Stack
    jmem 0xddee
        
`
    //console.log(yas.assemble(ys))
})