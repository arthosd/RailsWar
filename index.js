import { inscription, connexion , profil_logged} from './src/Middleware/authetification.js';
import { prices , get_all_gare, get_gare} from './src/Middleware/gare.js';
import cors from 'cors'
import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';  // Pour la session

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session({secret :'session' }));

app.set("view engine", 'ejs');

app.use('/views', express.static("views"));
app.use(express.static("Assets"));

app.post('/user/sign',(req, res) =>  { inscription(req, res); } );
app.post('/user/log' , (req, res) => { connexion(req, res); } );

app.get('/price/from=:from&to=:to', (req, res) => { prices (req, res); });
app.get('/price/from=:from', (req, res) => { prices (req, res); });

app.get('/gare', (req, res) => { get_all_gare(req,res); });
app.get('/gare/q=:q', (req, res)=> { get_gare(req, res); });

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

app.get('/profil/logged', (req, res) => { profil_logged (req, res) });

app.get('/profil', function (req, res) {

  // Il faut faire une redirection

  if (req.session.email) {
    res.redirect('/profil/logged')
  }else {

    res.redirect("/sign")
  }
});

app.get('/history', function (req, res) {
  res.locals.title = "History";
  res.render('Templates/history');
});

app.listen(9080)
