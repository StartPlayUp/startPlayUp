var express = require('express');
var app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);


var bodyParser = require('body-parser');
var session = require('express-session');
var fs = require("fs")

const port = 3300;

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);


app.use(express.static('public'));
app.use(express.static('node-moudles'));

app.use(express.json());
app.use(express.urlencoded());
app.use(session({
    secret: '@#@$MYSIGN#@$#$',
    resave: false,
    saveUninitialized: true
}));

var server = app.listen(port, () => {
    console.log(`express listening at http://localhost:${port}`)
})


