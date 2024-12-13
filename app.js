// Importation des modules nécessaires
var express = require('express');
const { connectDB } = require('./config/database');
const twig = require('twig');
const session = require('express-session');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const flash = require('connect-flash');
// Configuration du port
const PORT = process.env.PORT || 3000;

// Importation des modèles
const User = require('./models/User');

// Importation des routes
const userRoutes = require('./routes/user');

// Importation du middleware d'authentification
const auth = require('./middlewares/auth');

// Initialisation de l'application Express
var app = express();

// Connexion à la base de données
connectDB();

///////// Configuration de l'application /////////////

// Configuration du moteur de vue Twig
app.set('view engine', 'twig');
app.set('views', './views');

// Configuration du dossier public pour les fichiers statiques
app.use(express.static('public'));

// Configuration du body-parser pour parser les requêtes HTTP
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuration de la session
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));

// Utilisation de connect-flash
app.use(flash());

// Middleware pour les messages flash
app.use((req, res, next) => {
  res.locals.flashMessages = req.flash();
  next();
});

// Initialisation de Passport pour l'authentification
app.use(passport.initialize());
app.use(passport.session());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,  // Changé à false
  cookie: {
      secure: false, // Mettez true en production si vous utilisez HTTPS
      maxAge: 24 * 60 * 60 * 1000 // 24 heures
  }
}));

// Configuration de Passport pour utiliser une stratégie locale
passport.use(new localStrategy(User.authenticate()));

// Sérialisation et désérialisation
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Middleware pour rendre l'utilisateur disponible dans toutes les vues
app.use((req, res, next) => {
res.locals.user = req.user;
next();
});

///////// Routes /////////////

// Route pour la page d'accueil
app.get('/', (req, res) => {
  res.render('pages/home');
});

// Utilisation des routes utilisateur définies dans le fichier user.js
app.use('/', userRoutes);

// Gestion des erreurs
app.use((req, res, next) => {
  res.status(404).render('pages/error.twig', { message: 'Page non trouvée' });
  });

// Démarrage du serveur
app.listen(PORT, () => {
	console.log(`🚀🚀 Lancement avec succès du serveur sur le port ${PORT}`);
});

// Exportation de l'application pour utilisation dans d'autres fichiers
module.exports = app;
