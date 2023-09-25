var express = require('express');
const { connectDB } = require('./config/database');
const PORT = process.env.PORT || 3000;
const twig = require('twig');


var app = express();

// Connexion à la base de données
connectDB();

// Configuration de Twig
app.set('view engine', 'twig');
app.set('views', './views');

// Route de base pour tester
app.get('/', (req, res) => {
  res.render('home');
});

app.listen(PORT, () => {
	console.log(`🚀🚀 Lancement avec succès du server ${PORT}`);
});

module.exports = app;
