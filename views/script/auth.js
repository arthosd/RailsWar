
function reset_style_password() {
    $('#not_match_password').attr("hidden",true);
}

function reset_style_form() {

    $('#not_full_form').attr("hidden",true)
    reset_style_password()

     /*$('#name_character').css("border-color","black")

    // On affiche la div d'erreur
    $('#name_error').attr("hidden",true);
    $('#no_character_error').attr("hidden",true);*/
}

function register () {
    // On gère le boutton de register

    // On récupère les valeur du forms
    var email = $('#email').val();
    var password = $('#password').val();
    var verif_password = $('#password_confirmation').val();
    var last_name = $('#last_name').val();
    var first_name = $('#first_name').val();

    if (email.length!=0 && password.length!=0 && verif_password.length!=0 && email.length!=0 && last_name.length!=0 && first_name.length!=0) {

        if (password == verif_password) { // On vérifie le mot de passe

            var data_to_send = {
                name :first_name + " " + last_name,
                password : password,
                email : email,
            }

            console.log(data_to_send)

            // on fait la requete ajax
            $.ajax({
                url :'/user/sign',
                type : 'POST',
                data :data_to_send,
                success :  function (response, status) {
                    console.log(status)
                },
                error : function (resultat, status, erreur) {
                    // Mettre une div d'erreur visible
                    console.log(status)
                }
            })

        } else { // Si les password ne match pas 
            // On affiche la div qui dit que les password doivent matcher
            $('#not_match_password').removeAttr('hidden');
        }

    } else {
        // On affiche la div qui dit qu'il faut tout renseigné
        $('#not_full_form').removeAttr('hidden')
    } 
}

function connexion () {
    // On gère le boutton de connexion

    var data_to_send = {
        password : $('#user_password').val(),
        email : $('#user_email').val()
    }

    if (data_to_send.email.length !=0 && data_to_send.password.length !=0) {
        $.ajax({
            url :'/user/log',
            type : 'POST',
            data :data_to_send,
            success :  function (response, status) {
                console.log(response)
            },
            error : function (resultat, status, erreur) {
                // Mettre une div d'erreur visible
                console.log(status)
            }
        })
    } else {
        // on affiche la div qui dit que le formulaire doit etre rempli
        console.log("C'est vide")
    }

    // Quand la réponse est négatif

    // Quand la réponse est position
}
