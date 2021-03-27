import express from 'express';

var app = express();

app.set("view engine", 'ejs')

app.use(express.static("Assets"));

app.use('/views', express.static("views"));

app.get('/', function (req, res) {
  res.locals.title = "Home";
  res.render('Templates/accueil');
});

app.get('/search', function (req, res) {
  res.locals.title = "Search";
  res.render('Templates/search');
});

app.get('/sign', function (req, res) {
  res.locals.title = "Sign In";
  res.render('Templates/sign');
});

app.get('/profil', function (req, res) {
  res.locals.title = "Profil";
  res.locals.firstname = "John"
  res.locals.lastname = "Doe"
  res.render('Templates/profil');
});

app.get('/history', function (req, res) {
  res.locals.title = "History";
  res.render('Templates/history');
});

app.listen(9080)
