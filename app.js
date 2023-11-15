var express = require('express');
var path = require('path');
var logger = require('morgan');

const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/User'); // Assurez-vous que le chemin est correct


const { initDatabase } = require('./config/database');

// Importation des routes
const userRouter = require('./routes/user');
const TaskRoutes = require('./routes/taskRoutes');

var app = express();

// Connexion à la base de données
initDatabase();

// Configuration de la session
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

// Initialisation de Passport qui va gérer l'authentification
app.use(passport.initialize());// Sert à initialiser Passport
app.use(passport.session());//Sert à utiliser les sessions avec Passport

// Utilisation de passport-local-mongoose pour la stratégie locale
passport.use(new LocalStrategy(User.authenticate()));

// Sérialisation et désérialisation de l'utilisateur qui veut dire que Passport va lire les informations de session et les encoder/décoder
passport.serializeUser(User.serializeUser());//
passport.deserializeUser(User.deserializeUser());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

// Routes spécifiques
app.use('/', TaskRoutes);
app.use('/', userRouter);

// Routes générales
app.get('/', (req, res) => {
  res.render('pages/index', { user: req.user._id });
});



// Gestionnaire d'erreurs 404
app.use((req, res, next) => {
  res.status(404).render('pages/error.twig', { message: 'Page non trouvée' });
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('pages/error.twig', { message: 'Une erreur s\'est produite!' });
});

module.exports = app;