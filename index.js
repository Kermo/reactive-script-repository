let express = require('express');
let mysql = require('mysql');
let http = require('http');

let app = express();

app.use(function (req, res, next) {
    res.locals.connection = mysql.createConnection({
        host: '35.195.85.88',
        user: 'root',
        password: 'jospa3oviB!',
        database: 'scriptrepository'
    });
    res.locals.connection.connect();
    next();
});

app.use('/', index);

module.exports = app;

let server = http.createServer(app);
server.listen(4000);