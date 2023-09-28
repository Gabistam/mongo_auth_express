const express = require('express');
const router = express.Router();

//importation et coonfiguration de multer
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Importation du contrôleur utilisateur
const userController = require('../controllers/userController');

// Importation du modèle User
const User = require('../models/User');

////////// Définition des routes utilisateur ///////////

// Route pour afficher la page d'inscription
router.get('/register', userController.showRegisterPage);

// Route pour enregistrer un nouvel utilisateur
router.post('/register', upload.single('avatar'), userController.registerUser);

// Route pour servir les images (avatar)
router.get('/avatar/:id', async (req, res) => {
    try {
        console.log("Requête pour l'avatar reçue"); // Log
        const user = await User.findById(req.params.id);
        console.log("Utilisateur trouvé :", user); // Log
        res.set('Content-Type', user.avatar.contentType);
        res.send(user.avatar.data);
    } catch (error) {
        console.error("Erreur :", error); // Log d'erreur
        res.status(400).send("Erreur lors de la récupération de l'avatar");
    }
});


// Route pour afficher la liste des utilisateurs
router.get('/users', userController.listUsers);

// Route pour afficher la page de modification
router.get('/edit/:id', userController.showEditPage);

// Route pour modifier un utilisateur
router.post('/edit/:id', upload.single('avatar'), userController.editUser);

// Route pour supprimer un utilisateur
router.get('/delete/:id', userController.deleteUser);


// Exportation du routeur
module.exports = router;
