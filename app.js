var express = require('express');
const { connectDB } = require('./config/database');
const PORT = process.env.PORT || 3000;
const twig = require('twig');

//Importation des modèles
const User = require('./models/User');

// Importation du fichier de route user.js
const userRoutes = require('./routes/user');




var app = express();

// Connexion à la base de données
connectDB();

// Configuration de Twig
app.set('view engine', 'twig');
app.set('views', './views');

// Configuration du dossier public
app.use(express.static('public'));

// Configuration du body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

///////// Routes /////////////

// Route pour la page d'accueil
app.get('/', (req, res) => {
  res.render('pages/home');
});

// Utilisation des routes définies dans user.js
app.use('/', userRoutes);

app.listen(PORT, () => {
	console.log(`🚀🚀 Lancement avec succès du server ${PORT}`);
});

module.exports = app;
