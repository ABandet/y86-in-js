simSeq = require("./model/kernel-seq/sim.js")

function onCompile() {
    try {
        let hclCode = document.getElementById("editor").value
        let jsCode = hcl2js(hclCode)
        document.getElementById("output").value = jsCode
        let sim = new simSeq.Sim()
        sim.step()
        alert("Error when running step : " + sim.errorMessage)
    } catch (error) {
        alert(error)
    }
}

global.onCompile = onCompile