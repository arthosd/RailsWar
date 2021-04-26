import Database from '../Database/Database.js';       // Database 


export function add_historique_middleware(req, res) {

    // On vérifie pour voir si l'utilisatteur est connecté
    const email = req.session.email

    if (email) { // S'il est connecté

        const db = new Database("railswars");
        db.connect();

        db.add_historique(
            email,
            req.body,
            (err, item) => {

                if (err) { res.send(500) }
                else {
                    console.log(item);
                    res.send("OK");
                }
            }
        );

    } else {
        res.send("Not connected")
    }
}

export function get_historique_middleware(req, res) {

    const db = new Database("railswars");
    db.connect();

    const email = req.session.email;

    db.get_historique(
        email, 
        (err, item) => {
    
            if(err) {
                res.send(500);
            } else {

                res.locals.title = "History";
                res.locals.historiques = item;
                
                res.render('Templates/history');
            }
        });
}

export function delete_historique_middleware (req, res) {

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
    }else {
        res.send("Not Connected")
    }
}