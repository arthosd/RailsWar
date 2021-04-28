import { get_price } from './../Api/api.js';            // API file
import Database from './../Database/Database.js';       // Database 
import {data} from './../Database/data.js';

/**
 * Renvoies les prix à en fonction de la destination
 * 
 * @param { Request } req 
 * @param { Resoslved } res 
 */
export function prices (req, res) {

    const origin = req.params.from;
    const destination = req.params.to;                  // Peut être undefined

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

    db.connect();

    db.get_all_gare(
        (err, data) => {
            if (err) {
                res.sendStatus(500);
            } else {
                res.json(data)
            }
        },
        () => {

        }
    )
}

/**
 * Renvoie une gare si elle est dans la Base de données
 * 
 * @param {*} req 
 * @param {*} res 
 */
export function get_gare (req, res) {
    
    const db = new Database("railswars");                   // On se connexte à la bdd

    db.connect();

    db.get_gare_data(
        (err, data) => {
            if (err) {
                res.sendStatus(500);                // Code d'erreur serveur
            } else {
                res.json(data);                     // On envoie toutes les gares
            }
        },
        req.params.q
    )
}

export function handle_search(req, res) {


    // on récupre les passage en parametre

    const depart = req.query.lieu_depart.toUpperCase();
    const arrive = req.query.lieu_arrivee.length ==0 ? undefined : req.query.lieu_arrivee.toUpperCase();

    // On récupère les prix
    get_price(
        (data) => {

            res.locals.title = "Search";
            res.locals.records = data.data.records

            req.session.records = data.data.records;

            res.render('Templates/search');
        },
        (err) => {

        },
        depart,
        arrive
    )
}

export function add_all_gare (req, res) {

    const db = new Database("railswars");

    db.connect();

    db.add_gare(data);

    res.send("200");
}