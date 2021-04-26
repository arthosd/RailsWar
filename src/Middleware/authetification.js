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
                        res.redirect('/')
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
                        req.session.name = req.body.name

                        res.send('/');
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

export function logout (req, res) {

    req.session.destroy((err) => {
        if (err) { res.send(500); }

        res.send('/');
    })
}

export function profil_logged(req, res) {

    const email = req.session.email;
    const name = req.session.name;
    const pwd = req.session.password;

    const db = new Database("railswars");
    db.connect();
    
    db.get_user(
        email,
        (data) => {

            res.locals.title = "Profil"
            res.locals.firstname = data.name
            res.locals.email = email
            res.locals.password = data.password
            res.locals.lastname = ""

            res.render('Templates/profil');
        },
        (err) => {
            res.send(500);
        }
    )
}

export function modify_password (req ,res) {

    const email = req.session.email; // On récupère l'email dans la session
    const password = req.body.password; // Le mail a hashed
    const saltRounds = 10;

    bcrypt.hash(password, saltRounds,(err, hash) => {

        if (err) {
            res.sendStatus(500);                            // Code d'erreur serveur
        }else {

            const db = new Database("railswars");           // Connexion à la base de données
             
            db.connect();

            db.modify_password(
                email,                                      // L'email données par post
                hash,                                       // Le mot de passe chiffre
                (err, item) => {
                    if (err) { res.send(500) }
                    else { 
                        console.log(item)
                        res.send("OK"); 
                    }
                }
            )
        }
    });
}
