var fs = require('fs')
var express = require('express');

let app = express()

app.use(express.static('public'))

app.use(function(req, res, next) {
    res.status(404);
    res.send('404: File Not Found');
});

app.listen(8080)