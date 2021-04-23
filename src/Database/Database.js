import mongoose from 'mongoose';
import models from './Schema.js';

export default class Database {

    constructor(database_name) {

        this.db = undefined;
        this.database_url = 'mongodb://localhost/'+database_name;
        this.models = {
            "user" : models.user,
            "gare" : models.gare
        };
    }
    
    /**
     * Connect à la base de données et trigger les callbacks
     * si elles sont définit.
     * 
     * @param { Callback si tout se passe bien (optionnel) } success_callback 
     * @param { Callback s'il y a une erreur (optionnel) } rejection_callback 
     */
    connect(success_callback, rejection_callback) {

        mongoose.connect(this.database_url, {
            useNewUrlParser: true, 
            useUnifiedTopology: true
        });

        const db = mongoose.connection;

        db.then(() => {
            if (success_callback != undefined) { success_callback(); }
        }).catch(() => {
            if (rejection_callback != undefined) { rejection_callback(); }
        })
    }
    /**
     * Ajoute un model dans le map de model BDD
     * 
     * @param { Le nom du schéma } name_schema 
     * @param { le schéma } schema 
     */
    add_model (name_schema, schema) { this.models.set(name_schema, create_model(name_schema,schema)); }
    /**
     * Retourne le model en fonction du nom du schéma.
     * 
     * @param { Le nom du schéma } name_schema 
     */
    get_model (name_schema) { return this.models.get(name_schema); }
    /**
     * Enregistre les données utilisateurs dans la base de données
     * 
     * @param { L'email de l'utilisateur } email 
     * @param { Le password de l'utilisateur } hashed_password 
     * @param { Le nom + prénom de l'utilisateur } name 
     */
    register_user (email, hashed_password, name, callback) {

        const User_model = this.models["user"];

        const user_config = {
            name : name,
            mail_adress : email,
            password : hashed_password
        };

        const user = new User_model(user_config);
        user.save((err, item) => callback(err,item) );
    }
    
    /**
     * 
     * Va récupérer l'utilisateur dans la base de données
     * en fonction du filtre donné en argument 
     * 
     * @param {*} email De l'utilisateur
     * @param {*} pwd de l'utilisateur
     * @param {*} user_in_callback  fonction à déclencher si mle 
     * @param {*} user_out_callback 
     */
    verify_user (email,pwd, user_in_callback, err_callback) {
        
        const User_model = this.models["user"];
        User_model.find({"mail_adress" : email, "password":pwd },(err, data) => {

            if (err) {
                console.log(err);
                err_callback (err);
            }else {
                user_in_callback(data)// On appelle la fonction de "rejet"
            }
        })
    }

    get_user (email, success_callback, error_callback) {

        const User_model = this.models["user"];
        User_model.findOne({"mail_adress" : email} , (err, data) => {
            if (err) {
                error_callback (err);
            }else {
                success_callback(data);
            }
        })
    }

    get_gare_data (callback,gare_name) {
        const Gare_model = this.models["gare"];

        Gare_model.find({"nom_gare": gare_name},(err, data) => {
            callback(err, data);
        });
    }
    get_all_gare (callback) {
        const Gare_model = this.models["gare"];

        Gare_model.find({},(err, data) => {
            callback(err, data);
        });
    }

    add_gare (list_gare){
        // Ajoute la liste des gares dasn la bdd
        const Gare_model = this.models["gare"];

        list_gare.forEach(element => {
    
            const gare_config = {
                id : element.id,
                nom_gare: element.Nom_Gare,
                NOM_REG : element.NOM_REG,
                NOM_DEP : element.NOM_DEP,
                Latitude : element.Latitude,
                Longitude : element.Longitude
            };

            console.log(gare_config.nom_gare)
           
            const gare = new Gare_model(gare_config);
            gare.save((err, item) => {
                if (err) {
                    console.log(err);
                }else {
                    console.log(item);
                }
            } );
        });
        
    }
}