const passport = require('passport');

exports.login = (req, res, next) => {
    console.log("Tentative de connexion");  // Ajout d'un log
    passport.authenticate('local', (err, user, info) => {
        console.log("Dans la fonction d'authentification");  // Ajout d'un log
        if (err) {
            console.log("Erreur :", err);  // Ajout d'un log
            req.session.flash = [{ type: 'danger', message: 'Une erreur est survenue.' }];
            return next(err);
        }
        if (!user) {
            console.log("Utilisateur non trouvé ou mot de passe incorrect");  // Ajout d'un log
            req.session.flash = [{ type: 'warning', message: 'Identifiants incorrects.' }];
            return res.redirect('/login');
        }
        req.logIn(user, (err) => {
            if (err) {
                console.log("Erreur lors de la connexion :", err);  // Ajout d'un log
                req.session.flash = [{ type: 'danger', message: 'Une erreur est survenue.' }];
                return next(err);
            }
            console.log("Connexion réussie");  // Ajout d'un log
            req.session.flash = [{ type: 'success', message: 'Connexion réussie.' }];
            return res.redirect('/profile');
        });
    })(req, res, next);
};


exports.showLoginPage = (req, res) => {
    res.render('pages/login');
};

exports.logout = (req, res) => {
    req.logout();
    res.redirect('/login');
};
