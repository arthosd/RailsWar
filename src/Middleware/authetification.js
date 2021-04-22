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
export function inscription(req, res, next) {

    const saltRounds = 10;                                 // Pour aider le hashing
    const password_to_hash = res.body.password;            // Le password à chiffrer

    bcrypt.hash(password_to_hash, saltRounds, (err, hash) => {

        if (err) {                                          // S'il y a une erreur
            console.log(err)
            res.send(400);                                  // On sort de la fonction en retournant un code d'erreur 400
        }

        const database= new Database("railswars");          // On ouvre une connexion à la base de données
        database.connect(() => {
            
            database.register_user(                         // On enregistre dans la base de données
                res.body.email,
                hash,                                       // Le mot de passe chiffré
                res.body.name
            );

                res.send(200);                              // Code de succès
                return 200;
        }, () => {
            console.log("C'est pas bon")
            res.send(500);
            return 500;
        })
    });

    if (next != undefined) { next (); }                     // on appelle le prochain middleware

    res.send(200)
} 

/**
 * 
 * MiddleWare pour la connexion à la base de données
 * 
 * @param { Request sent to server } req 
 * @param { Response received from server } res 
 * @param { The next middleware } next 
 */
export function connexion (req, res, next) {

    const database = new Database("railswars");             // On ouvre la bdd

    database.connect(() => {

        database.verify_user(req.params.email, req.params.pwd, () => {
            // Si c'est bon
            console.log("C'est bon");
            res.send(200);
            return;

        } , () => {
            // Si c'est pas bon
            console.log("C'est pas bon");
            res.send(400);
            return;
        })

    } , () => {
        res.send(500);
        return;
    })
    
    if (next != undefined) {
        next();
    }
}