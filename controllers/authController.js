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
    console.log("Début de l'enregistrement");
    User.register(new User({ 
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
     }), 
     req.body.password, (err, user) => {
        console.log("Tentative d'enregistrement");
        if (err) {
            console.error("Erreur lors de l'enregistrement:", err);
            return res.render('pages/register.twig', { error: err.message });
        }
        console.log("Utilisateur enregistré, tentative d'authentification");
        passport.authenticate('local')(req, res, () => {
            console.log("Utilisateur authentifié");
            res.redirect('/login');
        });
    });

};

// Afficher la page de connexion
authController.loginPage = (req, res) => {
    res.render('pages/login.twig');
};

// Gérer la connexion
authController.login = passport.authenticate('local', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash: true
});

// Afficher le tableau de bord
authController.profile = (req, res) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/login');
    }
    res.render('pages/profile.twig', { user: req.user });
};

// Gérer la déconnexion
authController.logout = (req, res) => {
    res.clearCookie('connect.sid'); // Supprime le cookie de session
    res.redirect('/login');
};

// Afficher la page d'erreur
authController.errorPage = (req, res) => {
    res.render('pages/error.twig');
};

module.exports = authController;
