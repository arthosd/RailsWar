import Database from '../Database/Database.js';       // Database 


export function add_historique_middleware(req, res) {

    // On vérifie pour voir si l'utilisatteur est connecté
    const email = req.session.email;

    const index = req.body.id;              // On récupère l'id
    const obj = req.session.records[index];        // On a la réponse

    const data_to_save = {
        origine: obj.fields.origine,
        destination: obj.fields.destination,
        prix1: obj.fields.plein_tarif_1ere,
        prix2: obj.fields.plein_tarif_2nde,
        email: email
    }

    if (email) { // S'il est connecté


        const db = new Database("railswars");
        db.connect();

        db.add_historique(
            email,
            data_to_save,
            (err, item) => {

                if (err) { res.send(500) }
                else {
                    console.log(item);
                    res.send(item);
                }
            }
        );

    } else {
        const db = new Database("railswars");
        db.connect();

        db.add_historique(
            'nomail',
            data_to_save,
            (err, item) => {

                if (err) { res.send(500) }
                else {
                    console.log(item);
                    res.send(item);
                }
            }
        );
    }
}

export function get_historique_middleware(req, res) {

    const email = req.session.email;

    if (email) { // Si l'email n'exite pas en session

        const db = new Database("railswars");
        db.connect();

        db.get_historique(
            email,
            (err, item) => {

                if (err) {
                    res.send(500);
                } else {

                    res.locals.title = "History";
                    res.locals.historiques = item;

                    res.render('Templates/history');
                }
            });
    } else {

        res.redirect('/history'); // on redirige
    }
}

export function delete_historique_middleware(req, res) {

    const db = new Database("railswars");
    db.connect();

    const email = req.session.email;

    if (email) {

        db.remove_historique(
            email,
            (err, data) => {
                res.send(data);
            }
        );
    } else {
        res.send("Not Connected")
    }
}