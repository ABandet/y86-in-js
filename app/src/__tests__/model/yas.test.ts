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

.long 1
.pos 0xaabb
Stack:
`
    console.log(yas.assemble(ys))
})