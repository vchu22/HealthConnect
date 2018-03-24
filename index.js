const express = require('express')
var app = express()


app.get('/', function(req, res) {res.render('index')})

app.get('/user', function(req, res) {res.render('login')})


app.listen(3000, () => console.log('Example app listening on port 3000!'))

app.set('views', './views');
app.set('view engine', 'ejs');
