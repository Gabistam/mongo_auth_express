var express = require('express');
const { connectToDatabase } = require('./config/database');
var path = require('path');

var app = express();

// Connexion à la base de données
connectToDatabase();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Route de base pour tester
app.get('/', (req, res) => {
  res.render('index');
});

module.exports = app;
