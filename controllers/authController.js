const passport = require('passport');

exports.login = (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/profile',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res, next);
};

exports.showLoginPage = (req, res) => {
    res.render('pages/login');
};

exports.logout = (req, res) => {
    req.logout();
    res.redirect('/login');
};
