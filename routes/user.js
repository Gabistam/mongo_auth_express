const express = require('express');
const router = express.Router();
// Importation du contrôleur utilisateur
const userController = require('../controllers/userController');

// Définition des routes utilisateur
router.get('/register', userController.showRegisterPage);
router.post('/register', userController.registerUser);
router.get('/users', userController.listUsers);

// Exportation du routeur
module.exports = router;
