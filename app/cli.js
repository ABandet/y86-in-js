var KernelController = require('./public/js/controllers/kernelController')
var HclController = require('./public/js/controllers/hclController')
var YasController = require('./public/js/controllers/yasController')
var integers = require('./public/js/model/integers')

let kernelController = new KernelController.KernelController()
let hclController = new HclController.HclController(kernelController)
let yasController = new YasController.YasController(kernelController)

///
/// Example of query :
/// Starts at label 'Init' and set a breakpoint at the line 5
/// http://localhost:8080/cli?start=Init&breakpoints=5&ys=Ci5wb3MgMApJbml0OgogICAgaXJtb3ZsIFN0YWNrLCAlZWJwCiAgICBpcm1vdmwgU3RhY2ssICVlc3AKICAgIAoucG9zIDB4MTAwClN0YWNrOgogICAg
///

exports.runSimulation = (query) => {
    let result = {
        errors: [],
        dump: '',
    }

    let args = extractArgs(query, result.errors)

    kernelController.useKernel(args.kernelName)
    
    if(args.hcl !== undefined) {
        const hclCompilationResult = hclController.assemble(args.hcl)
        result.errors = result.errors.concat(hclCompilationResult.errors)
    }
    
    const yasCompilationResult = yasController.assemble(args.ys)
    result.errors = result.errors.concat(yasCompilationResult.errors)

    let breakpointsPC = []
    
    args.breakpoints.forEach((breakpoint) => {
        try {
            if(typeof(breakpoint) === 'string') {
                breakpointsPC.push(yasCompilationResult.data.labelToPC(breakpoint))
            } else if(typeof(breakpoint) === 'number') {
                breakpointsPC.push(yasCompilationResult.data.lineToPC(breakpoint))
            } else {
                result.errors.push('The given breakpoint type (' + typeof(breakpoint) + ') is not supported')
            }
        } catch(err) {
            result.errors.push('Breakpoint : ' + err)
        }
    })
    
    let simulator = kernelController.getSim()

    try {
        if(typeof(args.startPC) === 'string') {
            simulator.setNewPC(yasCompilationResult.data.labelToPC(args.startPC))
        } else if(typeof(args.startPC) === 'number') {
            simulator.setNewPC(yasCompilationResult.data.lineToPC(args.startPC))
        } else {
            result.errors.push('The given startPC type (' + typeof(args.startPC) + ') is not supported')
        }
    } catch(err) {
        result.errors.push('StartPC : ' + err)
    }

    if(result.errors.length != 0) {
        return result
    }

    const status = simulator.continue(breakpointsPC)
    result.dump = status

    return result
}

function extractArgs(query, errors) {
    let args = {
        kernelName: "seq",
        hcl: undefined,
        ys: "",
        breakpoints: [],
        startPC: 0,
    }

    if(query.kernelName !== undefined) {
        args.kernelName = query.kernelName
    }

    if(query.hcl !== undefined) {
        args.hcl = base64ToString(query.hcl)
    }

    if(query.ys !== undefined) {
        args.ys = base64ToString(query.ys)
    } else {
        errors.push("Can not run a simulation without any ys file")
    }

    if(query.breakpoints !== undefined) {
        query.breakpoints.split(',').forEach((breakpointAsString) => {
            let line = Number(breakpointAsString)

            if(Number.isNaN(line)) { // Seems to be a label
                if(breakpointAsString.length != 0) {
                    args.breakpoints.push(breakpointAsString)
                }
            } else { 
                args.breakpoints.push(line)
            }
        })
    } 

    if(query.start !== undefined) {
        let line = Number(query.start)

        if(Number.isNaN(line)) { // Seems to be a label
            if(query.start.length != 0) {
                args.startPC = query.start
            }
        } else { 
            args.startPC = line
        }
    }

    return args
}

function base64ToString(input) {
    return Buffer.from(input, 'base64').toString('ascii')
}