var express = require('express');
const { connectDB } = require('./config/database');
const PORT = process.env.PORT || 3000;


var app = express();

// Connexion à la base de données
connectDB();

// Route de base pour tester
app.get('/', (req, res) => {
  res.send('Yeah ! Ça marche ! Je suis dans le navigateur ! 🎉🚀');
});

app.listen(PORT, () => {
	console.log(`🚀🚀 Lancement avec succès du server ${PORT}`);
});

module.exports = app;
