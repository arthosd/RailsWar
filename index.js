import express from 'express';

var app = express();

app.set("view engine", 'ejs')

app.use(express.static("Assets"));

app.use('/views', express.static("views"));

app.get('/', function (req, res) {
  res.locals.title = "Home"; 
  res.render('Templates/accueil');
});

app.get('/sign', function (req, res) {
  res.locals.title = "Sign In"; 
  res.render('Templates/sign');
});

app.listen(9080)
