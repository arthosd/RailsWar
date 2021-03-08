import express from 'express';

var app = express();

app.set("view engine", 'ejs')

app.get('/', function(req, res) {
    res.render('Templates/accueil')
  });

app.listen(9080)