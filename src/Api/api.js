// Toutes les fonctions pour récuperer les données de l'api
import axios from 'axios';

/**
 * 
 * @param { region on chercher les lingnes de metro } region 
 * @returns Une promesse
 */
export function get_lines (region) {

    const url = "https://api.sncf.com/v1/coverage/"+region+"/lines//?";

    const auth = {
        username :"20207a24-a66a-4324-8cdb-a9983d61bf65",
        password : ''
    }

    return axios(url,auth);
}
