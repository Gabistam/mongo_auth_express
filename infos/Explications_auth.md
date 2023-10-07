## Comprendre la Logique de l'Authentification par Session 🤔

### 1. Installation des Dépendances 📦

- **Passport**: C'est le middleware d'authentification pour Node.js.
- **Express-Session**: Gère les sessions pour Express.
- **Passport-Local**: Stratégie d'authentification locale pour Passport.

### 2. Configuration de `.env` 🗝️

- **SESSION_SECRET**: Il s'agit de la clé secrète utilisée pour signer le cookie de session. Elle ajoute une couche de sécurité.

### 3. Middleware `auth.js` 🛡️

- **isAuthenticated**: Vérifie si l'utilisateur est authentifié. Si oui, il peut accéder à la route. Sinon, il est redirigé vers la page de connexion.
- **isLoggedIn**: Fait le contraire de `isAuthenticated`. Utilisé pour les pages où les utilisateurs non authentifiés doivent avoir accès.
- **redirectIfLoggedIn**: Redirige vers le profil si déjà connecté.

### 4. Mise à Jour de `routes/user.js` 🛣️

- Les middlewares d'authentification sont ajoutés aux routes pour contrôler l'accès.

### 5. Création de `authController.js` 🎮

- **login et logout**: Gèrent la logique de connexion et de déconnexion.

### 6. Mise à Jour des Vues Twig 🎨

- Les nouvelles pages `login`, `profile` et `updateProfile` sont créées.
- `partials/header.twig` est mis à jour pour afficher des liens différents selon l'état de connexion.

### 7. Mise à Jour de `app.js` 🌐

- **express-session**: Crée une session.
- **passport**: Initialise Passport et l'intègre dans la session Express.
  
## Interaction entre les Composants 🔄

1. L'utilisateur tente d'accéder à une route.
2. Le middleware d'authentification (`isAuthenticated`, `isLoggedIn`, etc.) intervient pour vérifier l'état de la session.
3. Si l'utilisateur est authentifié, il accède à la route. Sinon, il est redirigé.
4. Les contrôleurs (`authController.js`, `userController.js`) gèrent la logique métier.
5. Les vues Twig affichent le contenu en fonction de l'état de la session.

## Conseil d'un Développeur Senior 👨‍💻

L'authentification est un aspect critique de toute application. Assurez-vous de comprendre chaque étape et chaque ligne de code. Cela vous aidera à identifier et à corriger les éventuelles failles de sécurité. 🛡️
