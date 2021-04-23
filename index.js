import { inscription, connexion } from './src/Middleware/authetification.js';
import { prices } from './src/Middleware/gare.js';
import cors from 'cors'
import express from 'express';
import bodyParser from 'body-parser';

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

app.set("view engine", 'ejs');

app.get('/', function(req, res) {
    res.render('Templates/index')
  });

app.post('/user/sign',(req, res) =>  { inscription(req, res); } );
app.post('/user/log' , (req, res) => { connexion(req, res); } );

app.get('/price/from=:from&to=:to', (req, res) => { prices (req, res); });
app.get('/price/from=:from', (req, res) => { prices (req, res); });

app.listen(9080)