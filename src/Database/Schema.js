/**
 * Fichier regroupant les schémas de la bdd
 */

import mongoose from 'mongoose';

export const user_schema = {
    name : String,
    mail_adress : {
        type :String,
        unique : true,
        required : true,
        lowercase :true
    },
    password : {
        type : String,
        required : true
    }
}

export const sncf_schema = {
    
};

/**
 * Créer un model mongoose.
 * 
 * @param { Le nom du schéma } name_schema 
 * @param { Le schéma lui même } schema 
 */
export default function create_model (name_schema, schema) {

    return mongoose.model(name_schema, schema);
}