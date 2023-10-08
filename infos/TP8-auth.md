# TP : Authentification par Session avec Passport 🛂

## Objectif du TP 🎯

Dans ce TP, nous allons mettre en place une authentification par session en utilisant Passport, Express-Session et Passport-Local. Nous créerons également des middlewares pour gérer les accès aux différentes routes.

## Prérequis 📚

- Avoir une connaissance de base de Node.js, Express, MongoDB, Mongoose et Twig.
- Avoir suivi les TP précédents sur la gestion des utilisateurs et l'ajout d'avatars.

## Étapes du TP 📝

### Étape 1: Installation des Dépendances 📦

1. Installez les packages nécessaires :

    ```bash
    npm install passport express-session passport-local connect-flash
    ```

### Étape 2: Configuration de `.env` 🗝️

1. Ajoutez une clé secrète pour la session dans votre fichier `.env`.

    ```env
    SESSION_SECRET=your_secret_key_here
    ```

### Étape 3: Création du Middleware `auth.js` 🛡️

1. Créez un nouveau dossier `middleware` et ajoutez-y un fichier `auth.js`.
2. Ajoutez les fonctions `isAuthenticated`, `isLoggedIn` et `redirectIfLoggedIn`.

    ```javascript
    // middleware/auth.js
    /**
    * Middleware pour vérifier si l'utilisateur est connecté.
    * Si l'utilisateur est connecté, il continue vers la prochaine route/middleware.
    * Sinon, il est redirigé vers la page de connexion.
    */
    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated()) return next();
        res.redirect('/login');
    }

    /**
    * Middleware pour rediriger l'utilisateur s'il est déjà connecté.
    * Si l'utilisateur est connecté, il est redirigé vers la page de profil.
    * Sinon, il continue vers la prochaine route/middleware.
    */
    function redirectIfLoggedIn(req, res, next) {
        if (req.isAuthenticated()) return res.redirect('/users');
        next(); 
    }

    module.exports = {
        isLoggedIn,
        redirectIfLoggedIn
    };
    ```

### Étape 4: Mise à Jour de `routes/user.js` 🛣️

1. Importez les middlewares et ajoutez-les aux routes appropriées.

    ```javascript
    // Importation des middlewares
    const { isAuthenticated, isLoggedIn, redirectIfLoggedIn } = require('../middleware/auth');

    // Ajout des middlewares aux routes
    const express = require('express');
    const router = express.Router();
    const authController = require('../controllers/authController');
    const userController = require('../controllers/userController');
    const { isLoggedIn, redirectIfLoggedIn } = require('../middlewares/auth');

    // Page d'accueil
    router.get('/', authController.home);

    // Page d'inscription
    router.get('/register',redirectIfLoggedIn, authController.registerPage);
    router.post('/register',redirectIfLoggedIn, authController.register);


    module.exports = router;
    ```
2. Ajout des routes `login, error et logout`

    ```javascript

    // Page de connexion
    router.get('/login',redirectIfLoggedIn, authController.loginPage);
    router.post('/login',redirectIfLoggedIn, authController.login);

    // Déconnexion
    router.get('/logout', authController.logout);

    // Page d'erreur
    router.get('/error', authController.errorPage);

    // Route pour afficher la liste des utilisateurs
    router.get('/users', auth.isLoggedIn, userController.listUsers);

    // Route pour afficher la page de modification d'un utilisateur
    router.get('/edit/:id', auth.isLoggedIn, userController.showEditPage);

    // Route pour modifier un utilisateur
    router.post('/edit/:id', auth.isLoggedIn, upload.single('avatar'), userController.editUser);

    // Route pour supprimer un utilisateur
    router.get('/delete/:id', auth.isLoggedIn, userController.deleteUser);


    ```

### Étape 5: Création de `authController.js` 🎮

1. Créez un nouveau fichier `authController.js` dans le dossier `controllers`.
2. Ajoutez les fonctions pour gérer l'authentification et récupération des routes `register et home`

    ```javascript
    const passport = require('passport');
    const User = require('../models/User'); 

    const authController = {};

    // Afficher la page d'accueil
    authController.home = (req, res) => {
        res.render('pages/home.twig');
    };

    // Afficher la page d'inscription
    authController.registerPage = (req, res) => {
        res.render('pages/register.twig');
    };

    // Gérer l'inscription
    authController.register = (req, res) => {
        console.log("Début de l'enregistrement");
        User.register(new User({ 
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        }), 
        req.body.password, (err, user) => {
            console.log("Tentative d'enregistrement");
            if (err) {
                console.error("Erreur lors de l'enregistrement:", err);
                req.flash('error', '📚 Oops ! Un problème est survenu pendant l\'inscription. Réessaie !');
                return res.redirect('/register');
            }
            console.log("Utilisateur enregistré, tentative d'authentification");
            req.flash('success', '👍 Inscription réussie ! Bienvenue à la fac virtuelle !');
            passport.authenticate('local')(req, res, () => {
                console.log("Utilisateur authentifié");
                res.redirect('/login');
            });
        });
    };

    // Afficher la page de connexion
    authController.loginPage = (req, res) => {
        res.render('pages/login.twig');
    };

    // Gérer la connexion
    authController.login = passport.authenticate('local', {
        successRedirect: '/users',
        failureRedirect: '/login',
        failureFlash: '📚 Oops ! T\'as oublié tes identifiants comme tes cours ? Réessaie !',
        successFlash: '🎉 Bien joué ! T\'es prêt pour la session, mec !'
    });

    // Gérer la déconnexion
    authController.logout = (req, res) => {
        req.flash('info', '👋 Pause café ? Reviens vite, les cours t\'attendent !');
        res.clearCookie('connect.sid'); // Supprime le cookie de session
        res.redirect('/login');
    };

    // Afficher la page d'erreur
    authController.errorPage = (req, res) => {
        res.render('pages/error.twig');
    };

    module.exports = authController;
    ```

### Étape 6: Mise à Jour des Vues Twig 🎨

#### Créez les pages twig `login`, `error` et actualisez la page `home`.

1. Actualisation de `home.twig`. Le contenu de la page home change si le user est connecté:

    ```html
    {% extends "layout/base.twig" %}

        <!-- Définit le titre de la page -->
        {% block title %}Accueil{% endblock %}

        <!-- Définit le contenu principal de la page -->
        {% block content %}

            <!-- Conteneur principal pour le contenu -->
            <div class="wrapper text-white">

                <!-- Affiche un message de bienvenue -->
                <h1>
                    <!-- Vérifie si l'utilisateur est connecté -->
                    {% if user %}
                        <!-- Si l'utilisateur est connecté, affiche son nom -->
                        Bonjour {{ user.username }}! <br>
                    {% endif %}

                    <!-- Message général pour tous les visiteurs -->
                    Ceci est la page d'accueil de notre application Express avec Twig.

                    <br>
                </h1>

                <!-- Affiche une image si l'utilisateur est connecté -->
                {% if user %}
                    <div class="d-flex justify-content-center">
                        <img src="/img/welcome-minion.gif" alt="Image de bienvenue avec un minion" >
                    </div>
                {% endif %}

            </div>

        {% endblock %}
2. Création de `login.twig`

    ```html
    {% extends 'layout/base.twig' %}

    {% block title %}Connexion{% endblock %}

    {% block content %}
        <div class="wrapper mt-5 text-white">
            <h1>Connexion 🗝️</h1>

            {# Affichage des messages flash #}
            {% if flashMessages %}
                {% for flashMessage in flashMessages %}
                    <div class="alert alert-{{ flashMessage.type }}">
                        {{ flashMessage.message }}
                    </div>
                {% endfor %}
            {% endif %}

            <form action="/login" method="post" class="mt-4">
                <div class="form-group">
                    <label for="username" class="form-label">Nom d'utilisateur</label>
                    <input type="text" class="form-control" id="username" name="username" required>
                </div>
                <div class="form-group">
                    <label for="password">Mot de passe</label>
                    <input type="password" class="form-control" id="password" name="password" required>
                </div>
                <button type="submit" class="btn btn-primary mt-5">Se connecter</button>
            </form>
        </div>
    {% endblock %}


3. Création de la page `error`

    ```html

    {% extends "layout/base.twig" %}

    {% block title %}404 - Page non trouvée{% endblock %}

    {% block content %}

        <div class="wrapper text-white">

            <h1>404 - Page non trouvée</h1>

            <div class="card text-center">
                <p>Désolé, la page que vous recherchez n'existe pas ou a été déplacée.</p>
                <p>
                    <a href="/users" class="btn btn-primary mb-4 current-btn">Aller à la liste utilisateurs</a> ou
                    <a href="/" class="btn btn-primary mb-4 current-btn">Retourner à la page d'accueil</a>
                </p>
            </div>
        </div>
    {% endblock %}

#### Mettez à jour `partials/header.twig` pour afficher des liens différents selon l'état de connexion de l'utilisateur.

    ```html
        <!-- En-tête du site -->
<header>

    <!-- Barre de navigation principale -->
    <nav class="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">

        <!-- Conteneur fluide pour un espacement uniforme -->
        <div class="container-fluid">

            <!-- Logo et nom de l'application -->
            <a class="navbar-brand" href="/">
                <img src="/img/logo4.png" width="50px" alt="Logo WelcomApp">
                <span class="fs-6 text-color-primary">WelcomApp</span>
            </a>

            <!-- Bouton pour le menu mobile -->
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
                aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <!-- Liens de navigation -->
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">

                <!-- Conteneur fluide pour un espacement uniforme -->
                <div class="container-fluid d-flex">

                    <!-- Liens principaux de la navigation -->
                    <ul class="navbar-nav p-2 flex-grow-1">
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="/">Accueil</a>
                        </li>
                        {% if user %}
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="/users">Userlist</a>
                        </li>
                        {% endif %}

                    </ul>

                    <!-- Vérification si l'utilisateur est connecté -->
                    {% if user %}

                        <!-- Menu pour les utilisateurs connectés -->
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0 p-2">
                            <li class="nav-item">
                                <a class="nav-link active" aria-current="page" href="/profile">
                                    <img src="/avatar/{{ user._id }}" alt="{{ user.username }}" width="30">
                                    <span class="fs-6">{{ user.username }} dashboard</span>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link text-white" aria-current="page">|</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link active" aria-current="page" href="/logout">
                                    <i class="fa-solid fa-right-from-bracket fa-lg" style="color: red">Deconnexion</i>
                                </a>
                            </li>
                        </ul>

                    {% else %}

                        <!-- Menu pour les visiteurs non connectés -->
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0 p-2">
                            <li class="nav-item">
                                <a class="nav-link text-primary" aria-current="page" href="/register">Inscription</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link text-primary" aria-current="page">|</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link text-primary" aria-current="page" href="/login">Connexion</a>
                            </li>
                        </ul>

                    {% endif %}
                </div>
            </div>
        </div>
    </nav>
</header>
    ```

### Étape 7: Mise à Jour de `app.js` 🌐

1. Importez et configurez `express-session`, `passport` et `passport-local`.
2. Importez et utilisez le middleware `flash` pour les messages flash.
3. Importez et utilisez le middleware `auth.js`.

    ```javascript
    // Initialisation de Passport
    app.use(passport.initialize());
    app.use(passport.session());

    // Stratégie locale avec passport-local-mongoose
    passport.use(new LocalStrategy(User.authenticate()));

    // Sérialisation et désérialisation
    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());

    // Middleware pour rendre l'utilisateur disponible dans toutes les vues
    app.use((req, res, next) => {
    res.locals.user = req.user;
    next();
    });

    // Gestion des erreurs
    app.use((req, res, next) => {
    res.status(404).render('pages/error.twig', { message: 'Page non trouvée' });
    });

    ```

### Étape 8: Mise à Jour du modèle `User.js` 🌐

    ```javascript
    //Import  de passport-Local-mongoose
    const passportLocalMongoose = require('passport-local-mongoose');

    const UserSchema = new Schema({
    ... //codes
    });

    // Intégration de passport-local-mongoose qui sert à gérer les utilisateurs
    UserSchema.plugin(passportLocalMongoose);


## Conseil de Développeur Senior 👨‍💻

Assurez-vous de bien sécuriser votre clé secrète de session et de ne jamais la pousser sur un dépôt public. Utilisez des variables d'environnement pour la stocker. 🛡️

## Points à Vérifier ✅

- [ ] Les dépendances sont-elles installées ?
- [ ] Le middleware `auth.js` est-il créé ?
- [ ] Les routes sont-elles mises à jour ?
- [ ] Le contrôleur `authController.js` est-il créé ?
- [ ] Les vues Twig sont-elles mises à jour ?
- [ ] `app.js` est-il mis à jour ?

Si vous pouvez cocher toutes ces cases, félicitations ! Vous avez réussi à mettre en place une authentification par session ! 🎉🚀