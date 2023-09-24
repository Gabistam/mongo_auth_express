var express = require('express');
const { bizareDB } = require('./config/database');
const PORT = process.env.PORT || 3000;

var app = express();

// Connexion à la base de données
bizareDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Route de base pour tester
app.get('/', (req, res) => {
  res.send('Yeah ! Ça marche ! Je suis dans le navigateur ! 🎉🚀');
});

app.listen(PORT, () => {
	console.log(`🚀🚀 Lancement avec succès du port ${PORT}`);
});

module.exports = app;
