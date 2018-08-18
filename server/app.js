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
app.post('/create/:accountType', function(req, res) {
  var username = req.body.username;
  var password = req.body.password;
  var email = req.body.email;
  if (username == undefined || password == undefined || email == undefined)
    res.end('Invalid data');
  else{
    if (req.params.accountType == "client"){
      tables.insertClient(username, password, email);
      res.send("Client "+username+" was created");
    }
    else if (req.params.accountType == "doctor"){
      tables.insertDoctor(username, password, email);
      res.send("Doctor "+username+" was created");
    }
    else{
      console.log("Account type invalid");
      res.send();
    }
  }
})
app.post('/login/:accountType', function(req, res) {
  var username = req.body.username;
  var password = req.body.password;
  if (username == undefined || password == undefined)
    res.end('Invalid data');
  else{
    new Promise(function(resolve) {
      if (req.params.accountType == "client")
        resolve(tables.loginClient(username, password));
      else if (req.params.accountType == "doctor")
        resolve(tables.loginDoctor(username, password));
      else
        reject();
    }).catch(function(err){
      console.log("Account type invalid");
      res.send();
    }).then((result) => {
      if (result == null) // if no result returned, then it means the login failed
        res.send("Login failed");
      else{
        res.send("Login successful");
      }
    });
  }
})
app.get('/client/dashboard', function(req, res) {res.render('client-dashboard', {fname:'John',lname:'Doe'})});
app.get('/doctor/dashboard', function(req, res) {res.render('doctor-dashboard', {fname:'Sarah', lname:'Smith'})});

app.listen(3000, () => console.log('Example app listening on port 3000!'))

app.set('views', './views');
app.set('view engine', 'ejs');
app.use(express.static('public'));
