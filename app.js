var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/User'); // Assurez-vous que le chemin est correct


const { initDatabase } = require('./config/database');

// var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const userRouter = require('./routes/user');

var app = express();

// Connexion à la base de données
initDatabase();

// Configuration de la session
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

// Initialisation de Passport
app.use(passport.initialize());
app.use(passport.session());

// Utilisation de passport-local-mongoose pour la stratégie locale
passport.use(new LocalStrategy(User.authenticate()));

// Sérialisation et désérialisation de l'utilisateur
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});


// Utilisez les routes définies dans routes.js
app.use('/', userRouter);
app.get('/', (req, res) => {
  res.render('pages/index', { user: req.user._id });
});
// app.use('/', indexRouter);

// app.use('/users', usersRouter);

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
