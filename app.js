var express = require('express');
const { connectDB } = require('./config/database');
const PORT = process.env.PORT || 3000;
const twig = require('twig');

//Importation des modèles
const User = require('./models/User');



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


// Route de la page d'accueil
app.get('/', (req, res) => {
  res.render('pages/home');
});

// Route de la page d'inscription
app.get('/register', (req, res) => {
  res.render('pages/register');
});

app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  const newUser = new User({ username, email, password });
  await newUser.save();
  res.redirect('/users');
});

//Afficher la liste des utilisateurs
app.get('/users', async (req, res) => {
  const users = await User.find();
  res.render('pages/users', { users });
});





app.listen(PORT, () => {
	console.log(`🚀🚀 Lancement avec succès du server ${PORT}`);
});

module.exports = app;
