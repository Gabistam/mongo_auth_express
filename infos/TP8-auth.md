Bien sûr, allons-y ! 🚀

### Étape 3: Création du Middleware `auth.js` 🛠️

Dans `middleware/auth.js` :

```javascript
exports.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
};

exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).send('Vous devez être connecté pour accéder à cette ressource.');
};

exports.redirectIfLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return res.redirect('/profile');
    }
    next();
};
```

### Étape 5: Création de `authController.js` 🎮

Dans `controllers/authController.js` :

```javascript
const passport = require('passport');

exports.login = (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/profile',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res, next);
};

exports.logout = (req, res) => {
    req.logout();
    res.redirect('/login');
};
```

### Étape 4: Mise à Jour de `routes/user.js` 🛣️

Dans `routes/user.js` :

```javascript
const auth = require('../middleware/auth');

router.get('/profile', auth.isAuthenticated, userController.showProfile);
router.get('/login', auth.redirectIfLoggedIn, authController.showLoginPage);
router.post('/login', authController.login);
router.get('/logout', authController.logout);
```

### Étape 6: Création des Vues Twig 🎨

1. `login.twig` :

```twig
{% extends 'layout/base.twig' %}

{% block title %}Connexion{% endblock %}

{% block content %}
    <form action="/login" method="post">
        <!-- Votre formulaire de connexion ici -->
    </form>
{% endblock %}
```

2. `profile.twig` :

```twig
{% extends 'layout/base.twig' %}

{% block title %}Profil{% endblock %}

{% block content %}
    <!-- Les informations du profil ici -->
{% endblock %}
```

3. `updateProfile.twig` :

```twig
{% extends 'layout/base.twig' %}

{% block title %}Mettre à jour le profil{% endblock %}

{% block content %}
    <form action="/updateProfile" method="post">
        <!-- Votre formulaire de mise à jour du profil ici -->
    </form>
{% endblock %}
```

## Conseil de notre Développeur Senior 👨‍💻

Lorsque vous travaillez avec des sessions et des authentifications, assurez-vous de bien comprendre le flux de données entre le client et le serveur. Cela vous aidera à déboguer plus efficacement et à créer une application plus sécurisée. 🛡️

Voilà, vous avez maintenant un système d'authentification par session complet ! 🎉🚀