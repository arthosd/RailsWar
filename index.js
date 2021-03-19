import express from 'express';

var app = express();

app.set("view engine", 'ejs')

app.use(express.static("Assets"));

app.use(express.static('/views'));

app.get('/', function (req, res) {
  res.render('Templates/accueil')
});

app.get('/sign', function (req, res) {
  res.render('Templates/sign')
});

app.listen(9080)
