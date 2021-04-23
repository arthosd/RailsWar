/**
 * Fichier regroupant les schémas de la bdd
 */

import mongoose from 'mongoose';

const user_schema = {
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

const models = {
    user : mongoose.model("user", user_schema)
}

export default models;
