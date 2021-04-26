/**
 * Fichier regroupant les schémas de la bdd
 */

import mongoose from 'mongoose';

const gare_schema = {
    nom_gare : {
        type : String,
        lowercase : true
    },
    id : {
        unique : true,
        required : true,
        type : Number
    },
    NOM_REG : String,
    NOM_DEP : String,
    Latitude : Number,
    Longitude : Number
}

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

const historique_schema = {
    origine : String,
    destination : String,
    prix1 : String ,
    prix2 : String,
    email : {
        required:true,
        lowercase:true,
        type : String
    },
    timestamp : Date
}

const models = {
    user : mongoose.model("user", user_schema),
    gare : mongoose.model("gare", gare_schema),
    historique : mongoose.model("historique", historique_schema)
}

export default models;
