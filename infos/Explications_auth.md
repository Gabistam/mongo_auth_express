# Explication de la Logique et de l'Interaction pour la Mise en Place de l'Authentification 🛂

## Introduction 🌟

Après avoir suivi ce TP, vous avez maintenant une application web qui permet aux utilisateurs de s'authentifier. Mais comment tout cela fonctionne-t-il ensemble ? C'est ce que nous allons explorer dans cette section.

## Middleware `auth.js` 🛡️

Le middleware `auth.js` joue un rôle crucial dans notre application. Il contient des fonctions qui vérifient si un utilisateur est authentifié ou non. Ces fonctions sont utilisées dans `routes/user.js` pour protéger certaines routes.

- `isLoggedIn`: Cette fonction vérifie si l'utilisateur est authentifié. Si c'est le cas, l'utilisateur peut accéder à la route suivante. Sinon, il est redirigé vers la page de connexion.
  
- `redirectIfLoggedIn`: Cette fonction fait le contraire. Si l'utilisateur est déjà authentifié, il est redirigé vers la page de profil.

## `routes/user.js` 🛣️

Ce fichier a été mis à jour pour inclure notre middleware d'authentification. Nous avons également ajouté de nouvelles routes pour gérer la connexion (`login`), la déconnexion (`logout`) et les erreurs (`error`).

- Les routes comme `/users`, `/edit/:id`, etc., utilisent maintenant le middleware `isLoggedIn` pour s'assurer que seuls les utilisateurs authentifiés peuvent y accéder.

## `authController.js` 🎮

Ce contrôleur gère tout ce qui concerne l'authentification. Il utilise Passport pour authentifier les utilisateurs et gérer les sessions.

- `authController.login`: Cette fonction utilise Passport pour authentifier l'utilisateur. Si l'authentification réussit, l'utilisateur est redirigé vers la page `/users`.

- `authController.logout`: Cette fonction déconnecte l'utilisateur et le redirige vers la page de connexion.

## Vues Twig 🎨

Les vues Twig ont été mises à jour pour refléter l'état de connexion de l'utilisateur. Par exemple, le fichier `partials/header.twig` affiche différents liens en fonction de l'état de connexion de l'utilisateur.

## `app.js` 🌐

Ce fichier a été mis à jour pour inclure et configurer les modules nécessaires pour l'authentification, tels que `passport`, `express-session`, et `passport-local`.

- Le middleware `flash` a également été ajouté pour afficher des messages flash, qui sont des messages temporaires utilisés pour donner un feedback à l'utilisateur.

## Conseil de Développeur Senior 👨‍💻

N'oubliez pas de bien sécuriser votre clé secrète de session. Utilisez des variables d'environnement pour la stocker et assurez-vous qu'elle n'est jamais exposée publiquement. 🛡️

## Conclusion 🎉

L'authentification par session est un élément clé de toute application web sécurisée. En suivant ce TP, vous avez non seulement implémenté cette fonctionnalité, mais vous avez également une meilleure compréhension de la manière dont les différentes parties interagissent pour rendre cela possible. Bravo ! 🚀🎉