import Database from './../Database/Database.js';       // Database 
import bcrypt from 'bcrypt';                            // Hashing librairies


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
    const pwd = req.body.pwd;                               // Le mot de passe donnée par post

    bcrypt.hash(pwd, saltRounds,(err, hash) => {

        if (err) {
            res.sendStatus(500);                            // Code d'erreur serveur
        }else {

            const db = new Database("railswars");           // Connexion à la base de données

            db.connect( () => {
                // Connexion établit
                db.register_user(
                    req.body.email,                         // L'email données par post
                    hash,                                   // Le mot de passe chiffré
                    req.body.name,                          // Le nom données par post
                    (err, item_saved) => {
                        if (err) {
                            res.json(err);                  // On envoie l'erreur
                        } else {
                            res.json(item_saved);           // On envoie l'item enregistré
                        }
                    }
                );
            }, () => {
                // Connexion raté
                res.sendStatus(500);                        // Code d'erreur serveur
            });
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

    db.get_user(
        req.body.email,
        (data) => {
            if (data.length === 0) {
                res.send("Email mismatch");
            }else {

                bcrypt.compare(req.body.pwd, data.password,(err, result) => {
                    
                    if (result === true) {
                        res.send("OK");
                    }else {
                        res.send("Password not Macth");
                    }
                });
            }
        },
        (err) => {
            res.sendStatus(500);
        }
    );
}