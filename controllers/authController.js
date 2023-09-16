const passport = require('passport');
const User = require('../models/User'); // Assurez-vous que le chemin est correct

const authController = {};

// Afficher la page d'accueil
authController.home = (req, res) => {
    res.render('pages/index.twig');
};

// Afficher la page d'inscription
authController.registerPage = (req, res) => {
    res.render('pages/register.twig');
};

// Gérer l'inscription
authController.register = (req, res) => {
    User.register(new User({ username: req.body.username }), req.body.password, (err, user) => {
        if (err) {
            return res.render('pages/register.twig', { error: err.message });
        }
        passport.authenticate('local')(req, res, () => {
            res.redirect('/dashboard');
        });
    });
};

// Afficher la page de connexion
authController.loginPage = (req, res) => {
    res.render('pages/login.twig');
};

// Gérer la connexion
authController.login = passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
    failureFlash: true
});

// Afficher le tableau de bord
authController.dashboard = (req, res) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/login');
    }
    res.render('pages/dashboard.twig', { user: req.user });
};

// Gérer la déconnexion
authController.logout = (req, res) => {
    req.logout();
    res.redirect('/');
};

// Afficher la page d'erreur
authController.errorPage = (req, res) => {
    res.render('pages/error.twig');
};

module.exports = authController;
