/**
 * Created by Jiyuan on 2016/12/3.
 */
// set up ========================
var express  = require('express');
var app      = express();                               // create our app w/ express
//var mongoose = require('mongoose');                     // mongoose for mongodb
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)

// configuration =================

//mongoose.connect('mongodb://node:nodeuser@mongo.onmodulus.net:27017/uwO3mypu');     // connect to mongoDB database on modulus.io

app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

//create todo list array
var todos = [];

// routes ======================================================================
// api ---------------------------------------------------------------------
// get all todos
app.get('/api/todos', function (req, res) {
    res.json(todos);
});

var i = 0;

// create todo and send back all todos after creation
app.post('/api/todos',function (req, res) {
    todos.push({
        "id" : todos.length,
        "text" : req.body.text,
        "done" : false
    });
    res.json(todos);
});

// delete a todo
app.delete('/api/todos/:todo_id',function (req, res) {
    for (var i = 0;i<todos.length;i++) {
        if (todos[i].id == req.params.todo_id) {
            todos.splice(i,1);
        }
    }
    //todos.splice(req.params.todo_id,1);
    res.json(todos);
});

// application -------------------------------------------------------------
app.get('*', function(req, res) {
    res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});

// listen (start app with node server.js) ======================================
app.listen(8080);
console.log("App listening on port 8080");