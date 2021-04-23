import { get_price } from './../Api/api.js';            // API file
import Database from './../Database/Database.js';       // Database 

/**
 * Renvoies les prix à en fonction de la destination
 * 
 * @param { Request } req 
 * @param { Resoslved } res 
 */
export function prices (req, res) {

    const origin = req.params.from;
    const destination = req.params.to;                   // Peut être undefined

    get_price((response) => {                           // Success callback
        
        console.log(response.data.records)
        var data_to_send = [];

        response.data.records.forEach(element => {
            console.log("-----------------------------------");
            console.log(element);
            data_to_send.push(element.fields);
        });

        res.send(data_to_send); 
    },
    (err) => {                                          // Rejection callback
        console.log(err);
        res.sendStatus(500);                            // Code d'erreur interne
    },
    origin,
    destination
    );
}

/**
 * Renvoie toutes les gares
 * 
 * @param {*} req 
 * @param {*} res 
 */
export function get_all_gare (req, res) {

    const db = new Database("railswars");                   // On se connexte à la bdd

    db.connect(
        () => {                                             // Quand on est connecté
            db.get_all_gare(
                (err, data) => {
                    
                    if (err) {
                        res.sendStatus(500);                // Code d'erreur serveur
                    }else {
                        res.send(data);                     // On envoie toutes les gares
                    }
                } 
            );
        },
        () => {
            res.senStatus(500);                             // Code d'erreur serveur
        }
    );
}

/**
 * Renvoie une gare si elle est dans la Base de données
 * 
 * @param {*} req 
 * @param {*} res 
 */
export function get_gare (req, res) {


}