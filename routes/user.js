// Importe les modules nécessaires
const express = require('express');
const multer = require('multer');
const User = require('../models/User');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const auth = require('../middlewares/auth');

// Initialise le routeur Express
const router = express.Router();

// Configure le stockage en mémoire pour Multer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

////////// Routes d'authentification ///////////

router.get('/login', auth.redirectIfLoggedIn, authController.showLoginPage);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

////////// Routes utilisateur ///////////

router.get('/profile', auth.isLoggedIn, userController.showProfile);
router.get('/register', userController.showRegisterPage);
router.post('/register', upload.single('avatar'), userController.registerUser);
router.get('/users', auth.isLoggedIn, userController.listUsers);
router.get('/edit/:id', auth.isLoggedIn, userController.showEditPage);
router.post('/edit/:id', auth.isLoggedIn, upload.single('avatar'), userController.editUser);
router.get('/delete/:id', auth.isLoggedIn, userController.deleteUser);

// Route pour les avatars
router.get('/avatar/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.set('Content-Type', user.avatar.contentType);
        res.send(user.avatar.data);
    } catch (error) {
        res.status(400).send("Erreur lors de la récupération de l'avatar");
    }
});

module.exports = router;