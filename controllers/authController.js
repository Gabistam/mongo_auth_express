const passport = require('passport');

exports.login = async (req, res, next) => {
    try {
        console.log("Tentative de connexion");  // Ajout d'un log
        const user = await new Promise((resolve, reject) => {
            passport.authenticate('local', (err, user, info) => {
                if (err) reject(err);
                resolve(user);
            })(req, res, next);
        });

        if (!user) {
            console.log("Utilisateur non trouvé ou mot de passe incorrect");  // Ajout d'un log
            req.session.flash = [{ type: 'warning', message: 'Identifiants incorrects.' }];
            return res.redirect('/login');
        }

        await req.logIn(user, (err) => {
            if (err) throw err;
        });

        console.log("Connexion réussie");  // Ajout d'un log
        req.session.flash = [{ type: 'success', message: 'Connexion réussie.' }];
        return res.redirect('/profile');

    } catch (err) {
        console.log("Erreur :", err);  // Ajout d'un log
        req.session.flash = [{ type: 'danger', message: 'Une erreur est survenue.' }];
        return next(err);
    }
};



exports.showLoginPage = (req, res) => {
    res.render('pages/login');
};

exports.logout = (req, res) => {
    req.logout();
    res.redirect('/login');
};
