// Toutes les fonctions pour récuperer les données de l'api
import axios from 'axios';

/**
 * Get all the prices from one origin city to destination. 
 * If no argument is given for destination
 * 
 * @param { Function to excecute when call is done } callback 
 * @param { Deparature city } origin 
 * @param { Destination city } destination 
 */
export function get_price(callback,origin, destination) {

    var url = "https://ressources.data.sncf.com/api/records/1.0/search/?dataset=tarifs-intercites-de-jour&q=&sort=origine&facet=origine&facet=destination&refine.origine="+origin;

    if (destination != undefined) {
        url = url+"&refine.destination="+destination
    }

    axios.get(url).then((response) => {

        callback(response);

    }).catch((err) => {
        console.log(err);
    })
}

/**
 * Will get all stations
 * 
 * @param { Callback function that is triggered when reponse is done} callback 
 */
export function get_all_station (callback) {

    var url = "https://ressources.data.sncf.com/api/records/1.0/search/?dataset=referentiel-gares-voyageurs&q=&rows=41&sort=gare_alias_libelle_noncontraint&facet=departement_libellemin&facet=segmentdrg_libelle&facet=gare_agencegc_libelle&facet=gare_regionsncf_libelle&facet=gare_ug_libelle";

    axios.get(url).then((response) => {
        callback (response);
    }).catch((err) => {
        console.log(err);
    })
}