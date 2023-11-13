// Importe les modules nécessaires
const express = require('express');
const multer = require('multer');
const User = require('../models/User');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const auth = require('../middlewares/auth');

// Initialise le routeur Express
const router = express.Router();

// Configure le stockage en mémoire pour Multer (pour le téléchargement d'avatar)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

////////// Définition des routes liées à l'authentification ///////////

// Route pour afficher la page de connexion
// Le middleware `auth.redirectIfLoggedIn` redirige vers une autre page si l'utilisateur est déjà connecté
router.get('/login', auth.redirectIfLoggedIn, authController.loginPage);

// Route pour gérer le processus de connexion
router.post('/login', auth.redirectIfLoggedIn, authController.login);

// Route pour déconnecter l'utilisateur
router.get('/logout', authController.logout);

////////// Définition des routes liées aux utilisateurs ///////////

// Route pour afficher la page d'inscription
router.get('/register', auth.redirectIfLoggedIn, userController.showRegisterPage);

// Route pour enregistrer un nouvel utilisateur
// `upload.single('avatar')` permet de télécharger un seul fichier (avatar) dans la requête
router.post('/register',auth.redirectIfLoggedIn, upload.single('avatar'), userController.registerUser);

// Route pour afficher la liste des utilisateurs
router.get('/users', auth.isLoggedIn, auth.isAdmin, userController.listUsers);

// Route pour afficher la page de modification d'un utilisateur
router.get('/edit/:id', auth.isLoggedIn, userController.showEditPage);

// Route pour modifier un utilisateur
router.post('/edit/:id', auth.isLoggedIn, upload.single('avatar'), userController.editUser);

// Route pour supprimer un utilisateur
router.get('/delete/:id', auth.isLoggedIn, userController.deleteUser);

// Route pour servir les images d'avatar
router.get('/avatar/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.set('Content-Type', user.avatar.contentType);
        res.send(user.avatar.data);
    } catch (error) {
        res.status(400).send("Erreur lors de la récupération de l'avatar");
    }
});

////////////////// Gestion du profile //////////////////////////

// Route pour afficher la page de profil
router.get('/profile', auth.isLoggedIn, userController.showProfilePage);

// Route pour afficher la page de mise à jour du profil
router.get('/updateProfile', auth.isLoggedIn, userController.showUpdateProfilePage);

// Route pour afficher la page de suppression du profil
router.get('/deleteProfile', auth.isLoggedIn, userController.showDeleteProfilePage);


// Exporte le routeur pour l'utiliser dans d'autres fichiers
module.exports = router;
