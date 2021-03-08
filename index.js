import express from 'express';

var app = express();

app.set("view engine", 'ejs')

app.use(express.static("Assets"));

app.get('/', function(req, res) {
    res.render('Templates/accueil')
  });

app.listen(9080)
