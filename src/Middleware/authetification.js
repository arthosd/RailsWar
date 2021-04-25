import Database from '../Database/Database.js';       // Database 
import bcrypt from 'bcrypt';                          // Hashing librairies

/**
 * 
 * Inscription à la BDD sur le site
 * 
 * @param { Request sent to server } req 
 * @param { Response received from server } res 
 * @param { The next middleware } next 
 */
export function inscription(req, res) {

    const saltRounds = 10;
    const pwd = req.body.password;                           // Le mot de passe donnée par post


    const obj = {
        name : req.body.name,
        password : req.body.password,
        email: req.body.email
    }
    console.log(obj)
    bcrypt.hash(pwd, saltRounds,(err, hash) => {

        if (err) {
            res.sendStatus(500);                            // Code d'erreur serveur
        }else {

            const db = new Database("railswars");           // Connexion à la base de données
             
            db.connect();

            db.register_user(
                obj.email,                                  // L'email données par post
                hash,                                       // Le mot de passe chiffré
                obj.name,                                   // Le nom données par post
                (err, item_saved) => {
                    if (err) {
                        res.json(err);
                    } else {
                        console.log("ici")
                        console.log(item_saved)
                        res.redirect("/")
                    }
                }
            )
        }
    });
} 

/**
 * 
 * MiddleWare pour la connexion à la base de données
 * 
 * @param { Request sent to server } req 
 * @param { Response received from server } res 
 * @param { The next middleware } next 
 */
export function connexion (req, res) {

    const db = new Database("railswars");

    db.connect();

    db.get_user(
        req.body.email,
        (data) => {
            if (data.length === 0) {
                res.send("Email mismatch");
            } else {

                bcrypt.compare(req.body.password, data.password,(err, result) => {

                    if (result === true) {
                        req.session.email = req.body.email;
                        req.session.password = req.body.password;

                        res.send("/");
                    }else {
                        res.send("Password not Macth");
                    }
                });
            }
            db.close();
        },
        (err) => { 
            db.close();
            res.sendStatus(500); 
        }
    );
}

export function profil_logged(req, res) {

    const email = req.session.email;

    const db = new Database("railswars");
    db.connect();
    
    db.get_user(
        email,
        (data) => {

            res.locals.title = "Profil"
            res.locals.firstname = data.name
            res.locals.lastname = ""

            res.render('Templates/profil');
        },
        (err) => {
            res.send(500);
        }
    )
}