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

function logout () {

    $.ajax({
        url :'/logout',
        type : 'GET',
        success : (response, status) => {
            window.location.pathname = response     // On redirige
        },
        error : (resultat, status, erreur) => {
            // Mettre une div d'erreur visible
            console.log(status)
        }
    })
}

function send() {

    const password_to_send = $('#new_password').val();

    $.ajax({
        url :'/profil/account',
        type : 'POST',
        data : { password : password_to_send },
        success : (response, status) => {
            console.log(response)
        },
        error : (resultat, status, erreur) => {
            // Mettre une div d'erreur visible
            console.log(status)
        }
    })
}

function modify() {

    $('#new_password').removeAttr('disabled'); // On retire le disabled
    $('#password_button').attr("value","send");   // On change le nom  du bouton

    $("#password_button").attr("onclick","send()");// La nouvelle fonction
}