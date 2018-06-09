const express = require('express');
var app = express();
const Sequelize = require('sequelize');
const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
const bodyParser = require("body-parser");
var tables = require('./tables');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.get('/', function(req, res) {res.render('index')})

app.get('/user', function(req, res) {res.render('login')})
app.post('/create/client', function(req, res) {
  var username = req.body.username;
  var password = req.body.password;
  var email = req.body.email;
  tables.insertClient(username, password, email);
  res.send(username+" was created");
})
app.post('/create/doctor', function(req, res) {
  var username = req.body.username;
  var password = req.body.password;
  var email = req.body.email;
  tables.insertDoctor(username, password, email);
  res.send(username+" was created");
})
app.post('/login/client', function(req, res) {
  var username = req.body.username;
  var password = req.body.password;
  var login = new Promise(function(resolve) {
    resolve(tables.loginClient(username, password));
  }).catch(function(err){
    console.log("There's an error while performing client login");
  })

  login.then((result) => {
    if (result == null) // if no result returned, then it means the login failed
      res.send("Login failed");
    else{
      res.send("Login successful");
    }
  })
})
app.post('/login/doctor', function(req, res) {
  var username = req.body.username;
  var password = req.body.password;
  var login = new Promise(function(resolve) {
    resolve(tables.loginDoctor(username, password));
  }).catch(function(err){
    console.log("There's an error while performing doctor login");
  })

  login.then((result) => {
    if (result == null) // if no result returned, then it means the login failed
      res.send("Login failed");
    else{
      res.send("Login successful");
    }
  })
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))

app.set('views', './views');
app.set('view engine', 'ejs');
