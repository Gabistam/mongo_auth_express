## Qu'est-ce qu'un Contrôleur ? 🎮

Les contrôleurs en Node.js jouent un rôle crucial dans l'architecture MVC (Modèle-Vue-Contrôleur). Ils agissent comme des intermédiaires entre les modèles et les vues, gérant la logique métier de votre application. 🎛️

Un contrôleur est essentiellement un ensemble de fonctions qui gèrent les requêtes HTTP entrantes, interagissent avec les modèles pour récupérer ou manipuler des données, et envoient des réponses HTTP.

### Comment ça marche ? 🛠️

1. **Création d'un Contrôleur**: Vous pouvez créer un fichier pour chaque contrôleur. Par exemple, pour un contrôleur utilisateur, vous pourriez avoir un fichier `userController.js`.
    
    ```jsx
    // userController.js
    exports.getAllUsers = (req, res) => {
      // Logique pour récupérer tous les utilisateurs
    };
    
    exports.createUser = (req, res) => {
      // Logique pour créer un nouvel utilisateur
    };
    
    ```
    
2. **Utilisation dans les Routes**: Une fois que vous avez défini vos fonctions de contrôleur, vous pouvez les utiliser dans vos routes.
    
    ```jsx
    const userController = require('./userController');
    
    router.get('/users', userController.getAllUsers);
    router.post('/users', userController.createUser);
    
    ```
    
3. **Interaction avec les Modèles**: Les contrôleurs interagissent souvent avec les modèles pour récupérer ou stocker des données.
    
    ```jsx
    // Dans userController.js
    const User = require('./userModel');
    
    exports.getAllUsers = async (req, res) => {
      const users = await User.find();
      res.json(users);
    };
    
    ```
    
    ### Conseil de notre Développeur Senior 👨‍💻
    
    Séparez toujours la logique métier de la logique de routage. Utilisez des contrôleurs pour organiser votre logique métier. Cela rendra votre code plus propre, plus facile à gérer et à tester. 🧪
    
    ### Exemple Complet 📝
    
    ```jsx
    // userController.js
    exports.getAllUsers = (req, res) => {
      res.send('Liste de tous les utilisateurs');
    };
    
    // routes.js
    const express = require('express');
    const router = express.Router();
    const userController = require('./userController');
    
    router.get('/users', userController.getAllUsers);
    
    // app.js
    const express = require('express');
    const userRoutes = require('./routes');
    const app = express();
    
    app.use('/api', userRoutes);
    
    app.listen(3000, () => {
      console.log('Serveur en écoute sur le port 3000 🚀');
    });
    
    ```