import mongoose from 'mongoose';
import models from './Schema.js';

export default class Database {

    constructor(database_name) {

        this.db = undefined;
        this.database_url = 'mongodb://localhost/'+database_name;
        this.models = {
            "user" : models.user,
            "gare" : models.gare,
            "historique" : models.historique
        };
    }
    
    /**
     * Connect à la base de données et trigger les callbacks
     * si elles sont définit.
     */
    connect() {

        mongoose.connect(this.database_url, {
            useNewUrlParser: true, 
            useUnifiedTopology: true
        });

         this.db = mongoose.connection;
    }

    /**
     * Déconnecte de la base de données
     */
    disconnect() {

        mongoose.disconnect(this.database_url);
        this.db = undefined
    }

    /**
     * Ferme la base de données
     */
    close () { mongoose.connection.close(); }
    /**
     * 
     * @returns la connexion
     */
    get_instance () { return mongoose.connection }
    
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

    modify_password (email_to_update, hashed_password,callback) {

        const User_model = this.models['user'];
        const email = email_to_update;
        const new_password = hashed_password;

        console.log(new_password)
        console.log(email)

        User_model.findOneAndUpdate(
            { email : email },
            { password : new_password },
            {  new : true },
            (err, data) => {
                callback(err, data);
            }
        )
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

           
            const gare = new Gare_model(gare_config);
            gare.save((err, item) => {
                if (err) {
                    console.log(err);
                }else {
                    console.log(item);
                }
            } );
        });
        console.log("Les gares ont été ajouter dans la base de données")   
    }

    /**
     * Ajoute Les données d'historique dans la base de données
     * 
     * @param {*} email 
     * @param {*} historique_data 
     */
    add_historique (email,historique_data, callback) {

        const Historique_model = this.models['historique'];

        console.log(historique_data)

        const historique_data_to_store = {
            origine :  historique_data.origine,
            destination : historique_data.destination,
            prix1 : historique_data.prix1,
            prix2 : historique_data.prix2,
            email : email,
            timestamp : new Date().toDateString()
        }

        const historique = new Historique_model(historique_data_to_store); 

        historique.save(
            (err, item) => { callback (err, item) }
        )
    }

    /**
     * Récupère l'historique d'un utilisateur
     * 
     * @param { L'email de l'utilisateur } email 
     */
    get_historique (email, callback) {

        const Historique_model = this.models["historique"];

        Historique_model.find({"email": email},(err, data) => {
            callback(err, data);
        });
    }

    /**
     * Efface tout l'historique d'un certain utilisateur
     * 
     * @param { L'email de l'utilisateur } email 
     */
    remove_historique (email , callback) {

        const Historique_model = this.models["historique"];

        Historique_model.deleteMany({
            "email" : email
        }, (err, data) => {
            callback(err, data)
        })
    }
}