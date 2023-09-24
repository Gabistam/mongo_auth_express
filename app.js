var express = require('express');
const { bizareDB } = require('./config/database');

var app = express();

// Connexion à la base de données
bizareDB();





app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Route de base pour tester
app.get('/', (req, res) => {
  res.send('Yeah ! Ça marche ! Je suis dans le navigateur ! 🎉🚀');
});

module.exports = app;
