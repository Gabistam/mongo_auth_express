// Importation du modèle User
const User = require('../models/User');

// Affichage de la page d'inscription
exports.showRegisterPage = (req, res) => {
    res.render('pages/register');
};

// Enregistrement d'un nouvel utilisateur
exports.registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    const newUser = new User({ username, email, password });
    await newUser.save();
    res.redirect('/users');
};

// Liste des utilisateurs
exports.listUsers = async (req, res) => {
    const users = await User.find();
    res.render('pages/users', { users });
};
