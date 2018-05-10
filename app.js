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

app.listen(3000, () => console.log('Example app listening on port 3000!'))

app.set('views', './views');
app.set('view engine', 'ejs');
