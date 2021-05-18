import { inscription, connexion, profil_logged, logout, modify_password } from './src/Middleware/authetification.js';
import { prices, get_all_gare, get_gare, handle_search, add_all_gare, get_destination } from './src/Middleware/gare.js';
import { add_historique_middleware, get_historique_middleware, delete_historique_middleware } from './src/Middleware/historique.js';

import cors from 'cors'
import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';  // Pour la session

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({ secret: 'session' }));

app.set("view engine", 'ejs');

app.use('/views', express.static("views"));
app.use(express.static("Assets"));

app.post('/user/sign', (req, res) => { inscription(req, res); });
app.post('/user/log', (req, res) => { connexion(req, res); });
app.get('/logout', (req, res) => { logout(req, res) })


app.get('/price/from=:from&to=:to', (req, res) => { prices(req, res); });
app.get('/price/from=:from', (req, res) => { prices(req, res); });

app.get('/gare', (req, res) => { get_all_gare(req, res); });
app.get('/gare/q=:q', (req, res) => { get_gare(req, res); });
app.get('/gare/id=:id', (req, res) => { get_destination(req, res) })

app.get('/', (req, res) => {
  res.locals.title = "Home";
  res.render('Templates/accueil');
});

app.get('/search', (req, res) => { handle_search(req, res) });

app.get('/sign', (req, res) => {
  res.locals.title = "Sign In";
  res.render('Templates/sign');
});

app.get('/profil/logged', (req, res) => { profil_logged(req, res) });

app.get('/profil', function (req, res) {

  // Il faut faire une redirection

  if (req.session.email) {
    res.redirect('/profil/logged')
  } else {

    res.redirect("/sign")
  }
});

app.post('/profil/account', (req, res) => { modify_password(req, res) });

app.get('/history/logged', (req, res) => { get_historique_middleware(req, res) });

app.get('/history', (req, res) => {

  if (req.session.email) { // Si la session existe

    res.redirect('/history/logged'); // on redirige vers le log

  } else {

    res.locals.title = "History";
    res.render('Templates/history_no_logged');
  }
});

app.post('/user/history', (req, res) => { add_historique_middleware(req, res) });
app.post('/gare/destination', (req, res) => { get_destination(req, res) });
app.get('/user/history/remove', (req, res) => { delete_historique_middleware(req, res) });

// A retirer après
app.get('/create', (req, res) => { add_all_gare(req, res) })

app.listen(9080)
