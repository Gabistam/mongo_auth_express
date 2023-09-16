// Importation des modules nécessaires
const User = require('../models/User'); // Assurez-vous que ce modèle est maintenant défini avec Mongoose
const { userResponseParser } = require('../utils/userResponseParser');//

// Fonction pour récupérer le profil de l'utilisateur
exports.getProfile = async (req, res) => {
    try {
        // Cherche l'utilisateur en fonction de l'ID stocké dans le token
        const user = await User.findById(req.user._id);

        // Si l'utilisateur n'est pas trouvé, renvoie une erreur 404
        if (!user) {
            return res.status(404).send('Utilisateur non trouvé.');
        }

        // Rend la page de profil avec les informations de l'utilisateur
        res.render('pages/profile', { user: userResponseParser(user) }); // parser sert 
    } catch (error) {
        // En cas d'erreur, log l'erreur et renvoie une erreur 500
        console.error(error);
        res.status(500).send('Erreur lors de la récupération du profil.');
    }
};

// Fonction pour mettre à jour le profil de l'utilisateur
exports.updateProfile = async (req, res) => {
    try {
        // Récupère le nom d'utilisateur et l'e-mail du corps de la requête
        const { username, email } = req.body;

        // Met à jour l'utilisateur en fonction de l'ID stocké dans le token
        await User.findByIdAndUpdate(req.user._id, { username, email });

        // Redirige vers la page de profil après la mise à jour
        res.redirect('/profile');
    } catch (error) {
        // En cas d'erreur, log l'erreur et renvoie une erreur 500
        console.error(error);
        res.status(500).send('Erreur lors de la mise à jour du profil.');
    }
};

// Fonction pour supprimer le compte utilisateur
exports.deleteAccount = async (req, res) => {
    try {
        // Supprime l'utilisateur en fonction de l'ID stocké dans le token
        await User.findByIdAndDelete(req.user._id);

        // Après la suppression, déconnecte l'utilisateur en le redirigeant vers la page de déconnexion
        res.redirect('/logout');
    } catch (error) {
        // En cas d'erreur, log l'erreur et renvoie une erreur 500
        console.error(error);
        res.status(500).send('Erreur lors de la suppression du compte.');
    }
};

// Des méthodes supplémentaires liées à l'utilisateur peuvent être ajoutées ici
