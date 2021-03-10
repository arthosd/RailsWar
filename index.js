import Database from './src/Database/Database';

var db = new Database("railswars");
db.connect(() => {
  console.log("Connexion succes");
}, () => {
  console.log("connexion error");
})
//db.register_user("elie.debs@outlook.fr","2222222222","elie DEBS")
//db.find_all_user();

/*import express from 'express';

var app = express();

app.set("view engine", 'ejs');

app.get('/', function(req, res) {
    res.render('Templates/index')
  });

app.listen(8080)*/