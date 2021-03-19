import Database from './src/Database/Database.js';
import express from 'express';

const app = express();

app.set("view engine", 'ejs');

app.get('/', function(req, res) {
    res.render('Templates/index')
  });

app.post('/user',(req,res)=>{

  const database= new Database("railswars");

  database.connect( () => {},() => {} );
  database.register_user(req.body.mail,req.body.password,req.body.name);

  res.send(200);
});

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

app.listen(8080)