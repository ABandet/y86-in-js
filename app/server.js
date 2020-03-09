var fs = require('fs')
var express = require('express');
var cli = require('./cli')

let app = express()

app.use(express.static('public'))

app.get('/cli', (req, res) => {
    res.status(200)

    try {
        const result = cli.runSimulation(
            req.query.kernel,
            req.query.hcl,
            req.query.ys
        )

        res.send(result)
    } catch (e) {
        console.error("An unexpected error happened while running simulation in CLI mode : ")
        console.error(e)
    }
})

app.use(function(req, res, next) {
    res.status(404);
    res.send('404: File Not Found');
});

app.listen(8080)