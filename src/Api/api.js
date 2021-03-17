// Toutes les fonctions pour récuperer les données de l'api
import axios from 'axios';
import { api } from './../Config/config'

/**
 * 
 * @param { region on chercher les lingnes de metro } region 
 * @returns Une promesse
 */
export function get_lines (region) {

    const url = "https://api.sncf.com/v1/coverage/"+region+"/lines//?";

    return axios(url,api.SNCF_CONFIG);
}
