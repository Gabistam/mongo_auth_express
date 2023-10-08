const passport = require('passport');
const User = require('../models/User'); 

const authController = {};

// Afficher la page d'accueil
authController.home = (req, res) => {
    res.render('pages/home.twig');
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
            req.flash('error', '📚 Oops ! Un problème est survenu pendant l\'inscription. Réessaie !');
            return res.redirect('/register');
        }
        console.log("Utilisateur enregistré, tentative d'authentification");
        req.flash('success', '👍 Inscription réussie ! Bienvenue à la fac virtuelle !');
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
    successRedirect: '/users',
    failureRedirect: '/login',
    failureFlash: '📚 Oops ! T\'as oublié tes identifiants comme tes cours ? Réessaie !',
    successFlash: '🎉 Bien joué ! T\'es prêt pour la session, mec !'
});

// Gérer la déconnexion
authController.logout = (req, res) => {
    req.flash('info', '👋 Pause café ? Reviens vite, les cours t\'attendent !');
    res.clearCookie('connect.sid'); // Supprime le cookie de session
    res.redirect('/login');
};

// Afficher la page d'erreur
authController.errorPage = (req, res) => {
    res.render('pages/error.twig');
};

module.exports = authController;
