import Database from './src/Database/Database.js';
import { inscription } from './src/Middleware/authetification.js';
import express from 'express';

const app = express();

app.set("view engine", 'ejs');

app.get('/', function(req, res) {
    res.render('Templates/index')
  });

app.post('/user',(req, res) =>  { inscription(req, res, undefined); });

app.get('/user/:email&:pwd' , (req, res) => {
    const db = new Database("railswars");

    db.connect(() => {
        console.log("Connected")
    }, () => {
        console.log("Not Connected");
    })

    db.verify_user(req.params.email, req.params.pwd, () => {
        res.send(200);// L'utilisateur est 
    }, () => {
        res.send(400); // l'utilisateur n'est pas dans la base de données
    });
})

app.listen(9080)