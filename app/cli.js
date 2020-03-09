var KernelController = require('./public/js/controllers/kernelController')
var HclController = require('./public/js/controllers/hclController')
var YasController = require('./public/js/controllers/yasController')

let kernelController = new KernelController.KernelController()
let hclController = new HclController.HclController(kernelController)
let yasController = new YasController.YasController(kernelController)

exports.runSimulation = (kernelName, hcl, ys) => {
    let result = {
        errors: [],
        dump: '',
    }

    let args = {
        kernelName: "seq",
        hcl: undefined,
        ys: ""
    }

    if(kernelName !== undefined) {
        args.kernelName = kernelName
    }

    if(hcl !== undefined) {
        args.hcl = base64ToString(hcl)
    }

    if(ys !== undefined) {
        args.ys = base64ToString(ys)
    } else {
        result.errors.push("Can not run a simulation without any ys file")
        return result
    }

    kernelController.useKernel(args.kernelName)
    
    if(args.hcl !== undefined) {
        const compilationResult = hclController.assemble(args.hcl)
        result.errors = result.errors.errors.concat(compilationResult.errors)
    }
    
    const compilationResult = yasController.assemble(args.ys)
    result.errors = result.errors.concat(compilationResult.errors)
    
    if(result.errors.length != 0) {
        return result
    }

    const status = kernelController.getSim().continue()
    result.dump = status

    return result
}

function base64ToString(input) {
    return Buffer.from(input, 'base64').toString('ascii')
}