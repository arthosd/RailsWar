import mongoose from 'mongoose';
import create_model,{ user_schema } from './Schema.js';

export default class Database {

    constructor(database_name) {

        this.db = undefined;
        this.database_url = 'mongodb://localhost/'+database_name;
        this.models = {
            "user" : create_model("user", user_schema)
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
     * @param { Le password de l'utilisateur } password 
     * @param { Le nom + prénom de l'utilisateur } name 
     */
    register_user (email, password, name) {

        const User_model = this.models["user"];
        const user_config = {
            name : name,
            mail_adress : email,
            password : password
        };

        const user = new User_model(user_config);
        user.save((err, item) => {
            if (err) return console.log(err)
            console.log("item saved");
        });
    }
    
    find_all_user () {
        
        const User_model = this.models["user"];
        User_model.find({},(err, data) => {

            if (err) {
                console.log(err);
                return undefined;
            }

            data.map((item) => {
                console.log(item);
            })

            return data;
        })
    }
}