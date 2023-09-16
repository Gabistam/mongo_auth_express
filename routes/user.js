const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { isAuthenticated } = require('../middlewares/auth');

// Page d'accueil
router.get('/', authController.home);

// Page d'inscription
router.get('/register', authController.registerPage);
router.post('/register', authController.register);

// Page de connexion
router.get('/login', authController.loginPage);
router.post('/login', authController.login);

// Tableau de bord (protégé par le middleware d'authentification)
router.get('/dashboard', isAuthenticated, authController.dashboard);

// Déconnexion
router.get('/logout', authController.logout);

// Page d'erreur
router.get('/error', authController.errorPage);

module.exports = router;
