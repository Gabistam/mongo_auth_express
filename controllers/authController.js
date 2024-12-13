const passport = require('passport');

exports.login = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            console.log("Erreur d'authentification:", err);
            return next(err);
        }
        
        if (!user) {
            console.log("Utilisateur non trouvé");
            req.session.flash = [{ type: 'warning', message: 'Identifiants incorrects.' }];
            return res.redirect('/login');
        }

        req.logIn(user, (err) => {
            if (err) {
                console.log("Erreur de login:", err);
                return next(err);
            }
            console.log("Connexion réussie pour:", user.email);
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