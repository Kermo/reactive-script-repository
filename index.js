let express = require('express');
let mysql = require('mysql');
let http = require('http');

let app = express();

app.use(function (req, res, next) {
    res.locals.connection = mysql.createConnection({
        host: '',
        user: '',
        password: '',
        database: ''
    });
    res.locals.connection.connect();
    next();
});

app.get('/scripts', function(req, res) {

    let connection = res.locals.connection.connect();

    connection.query('SELECT * FROM Script', function (error, results, fields) {
        if (error) console.log("ERROR");
        res.send(results);
    });

   connection.end();
});

module.exports = app;

app.listen(4000, () => { });