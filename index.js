import Database from './src/Database/Database.js';
import { inscription, connexion } from './src/Middleware/authetification.js';
import express from 'express';

const app = express();

app.set("view engine", 'ejs');

app.get('/', function(req, res) {
    res.render('Templates/index')
  });

app.post('/user',(req, res) =>  { inscription(req, res, undefined); });

app.get('/user/:email&:pwd' , (req, res) => {
    connexion(req, res, undefined);
})

app.listen(9080)