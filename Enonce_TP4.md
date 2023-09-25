# TP : Création d'un Modèle "User" et Gestion des Utilisateurs 🛠️

## Objectif du TP 🎯

L'objectif de ce TP est de vous apprendre à créer un modèle "User" avec MongoDB et Mongoose, à mettre en place une inscription d'utilisateurs et à afficher la liste des utilisateurs enregistrés.

## Prérequis 📚

- Avoir une connaissance de base de Node.js, Express, MongoDB et Mongoose.
- Avoir suivi les TP précédents sur la mise en place d'un serveur et l'intégration de Twig.

## Étapes du TP 📝

### Étape 1: Création du Modèle "User" 📋

1. Créez un dossier `models` à la racine de votre projet.
2. Dans ce dossier, créez un fichier `User.js`.
3. Définissez un schéma Mongoose pour les utilisateurs.

    ```javascript
    const mongoose = require('mongoose');

    const UserSchema = new mongoose.Schema({
        username: String,
        email: String,
        password: String
    });

    module.exports = mongoose.model('User', UserSchema);
    ```

### Étape 2: Création de la Route d'Inscription 📝

1. Dans votre fichier `app.js` (ou dans un fichier de routes séparé), ajoutez une route pour le formulaire d'inscription.

    ```javascript
    app.get('/register', (req, res) => {
        res.render('pages/register');
    });
    ```

2. Créez un fichier `register.twig` dans le dossier `views/pages` et ajoutez un formulaire d'inscription simple.

    {% extends 'layouts/base.twig' %}

        {% block title %}Inscription{% endblock %}

        {% block content %}
            <div class="container">
                <h1>Inscription 📝</h1>
                <form action="/register" method="POST">
                    <div class="form-group">
                        <label for="username">Nom d'utilisateur</label>
                        <input type="text" class="form-control" id="username" name="username" required>
                    </div>
                    <div class="form-group">
                        <label for="email">Adresse e-mail</label>
                        <input type="email" class="form-control" id="email" name="email" required>
                    </div>
                    <div class="form-group">
                        <label for="password">Mot de passe</label>
                        <input type="password" class="form-control" id="password" name="password" required>
                    </div>
                    <button type="submit" class="btn btn-primary">S'inscrire</button>
                </form>
            </div>
        {% endblock %}


### Étape 3: Enregistrement des Utilisateurs dans la Base de Données 🗃️

1. Ajoutez une route POST pour gérer la soumission du formulaire.

    ```javascript
    //importer le modèle 'User'
    const User = require('./models/User');
    
    //Ajouter le middleware 'body-parser'
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    //Ajouter la route 'register'
    app.post('/register', async (req, res) => {
        const { username, email, password } = req.body;
        const newUser = new User({ username, email, password });
        await newUser.save();
        res.redirect('/users');
    });
    ```

### Étape 4: Affichage de la Liste des Utilisateurs 📋

1. Ajoutez une route pour afficher la liste des utilisateurs.

    ```javascript
    app.get('/users', async (req, res) => {
        const users = await User.find({});
        res.render('pages/users', { users });
    });
    ```

2. Créez un fichier `users.twig` dans le dossier `views/pages` pour afficher la liste des utilisateurs.

    ```twig
    {% extends 'layouts/base.twig' %}

    {% block title %}Liste des Utilisateurs{% endblock %}

    {% block content %}
        <h1>Liste des Utilisateurs 📋</h1>
        <ul>
            {% for user in users %}
                <li>{{ user.username }} - {{ user.email }}</li>
            {% endfor %}
        </ul>
    {% endblock %}
    ```

## Conseil de notre Développeur Senior 👨‍💻

Lorsque vous travaillez avec des données sensibles comme les mots de passe, assurez-vous de les hasher avant de les stocker dans la base de données. Des bibliothèques comme `bcrypt` peuvent vous aider à faire cela de manière sécurisée. 🔒

## Points à Vérifier ✅

- [ ] Le modèle "User" est-il bien défini ?
- [ ] Le formulaire d'inscription fonctionne-t-il correctement ?
- [ ] Les utilisateurs sont-ils enregistrés dans la base de données ?
- [ ] La liste des utilisateurs s'affiche-t-elle correctement ?

Si vous pouvez cocher toutes ces cases, félicitations ! Vous avez réussi à créer un modèle "User" et à gérer les utilisateurs dans votre application ! 🎉🚀