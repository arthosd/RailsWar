/**
 * Fichier regroupant les schémas de la bdd
 */

import mongoose from 'mongoose'

export const ratp_schema = {

};

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