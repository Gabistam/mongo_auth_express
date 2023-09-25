# Cours Rapide sur Twig pour Développeurs Débutants 🌱

## Introduction 📚

Salut à tous ! Aujourd'hui, nous allons explorer le monde fascinant de Twig, un moteur de template flexible et rapide. Vous avez déjà une bonne base en HTML, CSS, et JavaScript, c'est génial ! Maintenant, il est temps de monter d'un cran. 🚀

Twig est souvent associé à PHP, mais saviez-vous qu'il est également possible de l'utiliser dans un environnement Node.js ? Oui, c'est tout à fait possible ! Alors, accrochez-vous, car nous allons plonger dans le vif du sujet.

## Objectifs du Cours 🎯

1. Comprendre ce qu'est Twig et pourquoi l'utiliser.
2. Installer Twig dans un projet Node.js.
3. Apprendre les bases de la syntaxe Twig.
4. Créer des templates simples avec Twig.

---

## Qu'est-ce que Twig ? 🤔

Twig est un moteur de template open-source, souvent utilisé avec PHP. Il permet de séparer la logique métier de la présentation, ce qui rend votre code plus propre et plus facile à maintenir.

### Pourquoi Utiliser Twig ? 🛠

- **Facilité d'utilisation** : Syntaxe intuitive et facile à apprendre.
- **Performance** : Twig est rapide et optimisé pour les performances.
- **Sécurité** : Il offre plusieurs fonctions pour sécuriser votre application.

---

## Installation de Twig dans un Projet Node.js 🛠️

Pour utiliser Twig avec Node.js, vous pouvez utiliser le package npm `twig`.

```bash
npm install twig
```

### Exemple de Code Node.js 📝

```javascript
const express = require('express');
const twig = require('twig');

const app = express();

app.set('view engine', 'twig');

app.get('/', (req, res) => {
  res.render('index', { title: 'Hello Twig!' });
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000/');
});
```

---

## Syntaxe de Base de Twig 📖

### Variables 🧮

```twig
{{ variable }}
```

### Boucles 🔄

```twig
{% for user in users %}
  {{ user.name }}
{% endfor %}
```

### Conditions 🤔

```twig
{% if age > 18 %}
  Vous êtes majeur.
{% else %}
  Vous êtes mineur.
{% endif %}
```

---

## Créer un Template Simple 🎨

Créez un fichier `index.twig` :

```twig
<!DOCTYPE html>
<html>
<head>
  <title>{{ title }}</title>
</head>
<body>
  <h1>{{ title }}</h1>
</body>
</html>
```

---

## Conseil de notre Développeur Senior 👨‍💻

Toujours organiser vos templates de manière logique. Utilisez des dossiers pour séparer les composants, les pages et les partials. Cela facilitera la maintenance à l'avenir.

---

## Ressources Supplémentaires 📚

- [Documentation Officielle de Twig](https://twig.symfony.com/doc/3.x/)
- [Twig.js - Twig pour Node.js](https://github.com/twigjs/twig.js)

---

Et voilà, vous avez maintenant une bonne introduction à Twig ! N'hésitez pas à pratiquer et à explorer davantage. Bon codage ! 🎉