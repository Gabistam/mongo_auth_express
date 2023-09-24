var express = require('express');
const { bizareDB } = require('./config/database');


var app = express();

// Connexion à la base de données
bizareDB();

// Route de base pour tester
app.get('/', (req, res) => {
  res.send('Yeah ! Ça marche ! Je suis dans le navigateur ! 🎉🚀');
});

app.listen(3333, () => {
	console.log(`🚀🚀 Lancement avec succès du server`);
});

module.exports = app;
