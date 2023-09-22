const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const { isLoggedIn, redirectIfLoggedIn } = require('../middlewares/auth');

// Page d'accueil
router.get('/', authController.home);

// Page d'inscription
router.get('/register',redirectIfLoggedIn, authController.registerPage);
router.post('/register',redirectIfLoggedIn, authController.register);

// Page de connexion
router.get('/login',redirectIfLoggedIn, authController.loginPage);
router.post('/login',redirectIfLoggedIn, authController.login);

// Page de gestion du profil
router.get('/updateprofile', isLoggedIn, userController.getUpdateProfile);
router.post('/updateprofile', isLoggedIn, userController.postUpdateProfile);
router.get('/deleteprofile', isLoggedIn, userController.getDeleteProfile);
router.post('/deleteprofile', isLoggedIn, userController.postDeleteProfile);

// Déconnexion
router.get('/logout', authController.logout);

// Page d'erreur
router.get('/error', authController.errorPage);

// ===============================================
// Routes liées aux opérations de l'utilisateur 
// Ces routes nécessitent une authentification
// ===============================================

// Route pour afficher le profil de l'utilisateur
router.get('/profile', isLoggedIn, userController.getProfile);



module.exports = router;
