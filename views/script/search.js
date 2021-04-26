var lat = 48.852969;
var lon = 2.349903;
var macarte = null;
            
// Fonction d'initialisation de la carte
            
function initMap() {
                
    // Créer l'objet "macarte" et l'insèrer dans l'élément HTML qui a l'ID "map"
                
    macarte = L.map('map').setView([lat, lon], 11);
                
    // Leaflet ne récupère pas les cartes (tiles) sur un serveur par défaut. Nous devons lui préciser où nous souhaitons les récupérer. Ici, openstreetmap.fr
                
    L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {      
    // Il est toujours bien de laisser le lien vers la source des données   
    attribution: 'données © <a href="//osm.org/copyright">OpenStreetMap</a>/ODbL - rendu <a href="//openstreetmap.fr">OSM France</a>',
                minZoom: 1,
                maxZoom: 20
            }).addTo(macarte);
        }

        /////////////////////////////////////////////


        window.onload = function () {
                
            // Fonction d'initialisation qui s'exécute lorsque le DOM est chargé
                
            initMap();
            $('[data-toggle="canvas"][aria-expanded="false"]').click();
        };
            jQuery(document).ready(function ($) {
                var bsDefaults = {
                    offset: false,
                    overlay: true,
                    width: '430px'
                },
                    bsMain = $('.bs-offset-main'),
                    bsOverlay = $('.bs-canvas-overlay');

                $('[data-toggle="canvas"][aria-expanded="false"]').on('click', function () {
                    var canvas = $(this).data('target'),
                        opts = $.extend({}, bsDefaults, $(canvas).data()),
                        prop = $(canvas).hasClass('bs-canvas-right') ? 'margin-right' : 'margin-left';

                    if (opts.width === '100%')
                        opts.offset = false;

                    $(canvas).css('width', opts.width);
                    if (opts.offset && bsMain.length)
                        bsMain.css(prop, opts.width);

                    $(canvas + ' .bs-canvas-close').attr('aria-expanded', "true");
                    $('[data-toggle="canvas"][data-target="' + canvas + '"]').attr('aria-expanded', "true");
                    if (opts.overlay && bsOverlay.length)
                        bsOverlay.addClass('show');
                    return false;
                });

                $('.bs-canvas-close, .bs-canvas-overlay').on('click', function () {
                    var canvas, aria;
                    if ($(this).hasClass('bs-canvas-close')) {
                        canvas = $(this).closest('.bs-canvas');
                        aria = $(this).add($('[data-toggle="canvas"][data-target="#' + canvas.attr('id') + '"]'));
                        if (bsMain.length)
                            bsMain.css(($(canvas).hasClass('bs-canvas-right') ? 'margin-right' : 'margin-left'), '');
                    } else {
                        canvas = $('.bs-canvas');
                        aria = $('.bs-canvas-close, [data-toggle="canvas"]');
                        if (bsMain.length)
                            bsMain.css({
                                'margin-left': '',
                                'margin-right': ''
                            });
                    }
                    canvas.css('width', '');
                    aria.attr('aria-expanded', "false");
                    if (bsOverlay.length)
                        bsOverlay.removeClass('show');
                    return false;
                });
            });

function item_selected (origine, destination, prix1, prix2) {

    // Faire une ajax call pour ajouter les données dans la bdd

    const data_to_send = {
        origine : origine,
        destination : destination,
        prix1 : prix1,
        prix2 : prix2
    }

    $.ajax({
        url:'/user/history',
        type:'POST',
        data : data_to_send,
        success : (response, status) => {
            console.log(response);
        },
        error : (result, status, erreur) => {
            console.log(erreur);
        }
    })

    var layerGroup1 = L.layerGroup().addTo(macarte);
    var layerGroup2 = L.layerGroup().addTo(macarte);

    $.ajax({
        url :'/gare/q='+origine,
        type : 'GET',
        success : (origine, status1) => {

            $.ajax({
                url : '/gare/q='+destination,
                type : 'GET',
                success : (destination, status2) => {

                    var orgine = L.marker([ origine[0].Latitude, origine[0].Longitude]).addTo(layerGroup1);
                    var detination = L.marker([ destination[0].Latitude, destination[0].Longitude]).addTo(layerGroup2);
                },
                error : (resultat, status, erreur) => {
                    // Mettre une div d'erreur visible
                    console.log(status)
                }
            })
        },
        error : (resultat, status, erreur) => {
            // Mettre une div d'erreur visible
            console.log(status)
        }
    }) 
}