
function erase_history () {

    $.ajax({
        url :'/user/history/remove',
        type : 'GET',
        success :  function (response, status) {
            console.log(response)
        },
        error : function (resultat, status, erreur) {
            // Mettre une div d'erreur visible
            console.log(status)
        }
    })
}