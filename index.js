import Database from './src/Database/Database.js';
import express from 'express';

const app = express();

app.set("view engine", 'ejs');

app.get('/', function(req, res) {
    res.render('Templates/index')
  });

app.post('/user',(req,res)=>{
  const user={
    name: req.body.name ,
    mail: req.body.mail,
    mdp:req.body.password
  }
  const database=new Database("test");
  database.connect(()=>console.log("connecté"),()=>console.log("erreur"));
  database.register_user(user.email,user.mdp,user.name);
  res.send("Everything is ok");
});

app.listen(8080)