// Importation des modules nécessaires
var express = require('express');
const { connectDB } = require('./config/database');
const twig = require('twig');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
require('dotenv').config();

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
    secret: process.env.SESSION_SECRET || 'votre_secret_temporaire',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production', // true en production si HTTPS
        maxAge: 24 * 60 * 60 * 1000 // 24 heures
    }
}));

// Initialisation de Passport pour l'authentification
app.use(passport.initialize());
app.use(passport.session());

// Configuration de la stratégie locale de Passport
passport.use(new LocalStrategy({
    usernameField: 'email',    // Utilise l'email comme identifiant
    passwordField: 'password'  // Champ pour le mot de passe
}, async (email, password, done) => {
    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            return done(null, false, { message: 'Email non trouvé' });
        }
        
        // Vérification du mot de passe
        const isValid = await user.authenticate(password);
        if (!isValid) {
            return done(null, false, { message: 'Mot de passe incorrect' });
        }
        
        return done(null, user);
    } catch (err) {
        return done(err);
    }
}));

// Sérialisation de l'utilisateur pour la session
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// Désérialisation de l'utilisateur depuis la session
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
});

// Middleware pour les messages flash
app.use((req, res, next) => {
    res.locals.flashMessages = req.session.flash || [];
    req.session.flash = [];
    next();
});

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

// Utilisation des routes utilisateur
app.use('/', userRoutes);

// Gestion des erreurs 404
app.use('/', userRoutes);

// Gestion des erreurs 404
app.use((req, res, next) => {
    res.status(404).render('pages/error', { 
        message: 'Page non trouvée'
    });
});

// Gestion des erreurs globales
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('pages/error', { 
        message: 'Une erreur est survenue',
        error: process.env.NODE_ENV === 'development' ? err : {}
    });
});

// Démarrage du serveur
app.listen(PORT, () => {
    console.log(`🚀🚀 Lancement avec succès du serveur sur le port ${PORT}`);
});