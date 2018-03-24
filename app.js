const express = require('express');
var app = express();
const Sequelize = require('sequelize');
const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
const bodyParser = require("body-parser");

// connect to the database
var db ='mysql://healthconnect:healthconnect@healthconnect.colb5rylrj04.us-east-2.rds.amazonaws.com:3306/healthconnect'
var sequelize = new Sequelize(db);

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.get('/', function(req, res) {res.render('index')})

app.get('/user', function(req, res) {res.render('login')})
app.post('/create/client', function(req, res) {
  var username = req.body.username;
  var password = req.body.password;
  console.dir(req.body);
  //console.log("username: "+username+" password: "+password);
  res.send(req.body);
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))

app.set('views', './views');
app.set('view engine', 'ejs');
