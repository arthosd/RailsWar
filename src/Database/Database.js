import mongoose from 'mongoose';
import create_model from './Schema';

export default class Database {

    constructor(collection_name) {

        this.db = undefined;
        this.database_url = 'mongodb://localhost/'+collection_name;
        this.models = new Map();
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
}