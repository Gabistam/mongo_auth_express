# TP : Ajout d'un Avatar au Modèle User 📸

## Objectif du TP 🎯

Dans ce TP, nous allons ajouter une fonctionnalité pour permettre aux utilisateurs d'ajouter un avatar à leur profil. Nous mettrons à jour notre modèle `User`, notre contrôleur `userController`, nos routes et nos vues.

## Prérequis 📚

- Avoir une connaissance de base de Node.js, Express, MongoDB, Mongoose et Twig.
- Avoir suivi les TP précédents sur la mise en place d'un serveur, la gestion des utilisateurs et l'architecture MVC.

## Étapes du TP 📝

### Étape 1: Mise à Jour du Modèle `User.js` 📋

1. Mettez à jour votre modèle `User` pour inclure un champ `avatar` qui contiendra les données de l'image et son type.

    ```javascript
        const UserSchema = new mongoose.Schema({
            username: { 
                type: String, 
                required: true 
            },
            email: { 
                type: String, 
                required: true, 
                unique: true 
            },
            password: { 
                type: String, 
                required: true 
            },
            avatar: {
                data: Buffer,
                contentType: String
            }
        });

    ```

### Étape 2: Installation et Configuration de Multer 📦

1. Installez le package `multer` pour gérer le téléchargement de fichiers.

    ```bash
    npm i multer
    ```

2. Configurez Multer dans `userController.js` et `routes/user.js`.

    ```javascript
    // Importation du module multer
    const multer = require('multer');

    // Configuration de multer
    const storage = multer.memoryStorage();
    const upload = multer({ storage: storage });
    ```

### Étape 3: Mise à Jour de `userController.js` 🎮

1. Modifiez la méthode `registerUser` pour inclure le téléchargement de l'avatar.

    ```javascript
    // Enregistrement d'un nouvel utilisateur
    exports.registerUser = async (req, res) => {
        try {
            const { username, email, password } = req.body;
            const newUser = new User({
                username,
                email,
                password,
                avatar: {
                    data: req.file.buffer,
                    contentType: req.file.mimetype
                }
            });
            await newUser.save();
            res.redirect('/users');
        } catch (error) {
            console.error("Erreur lors de l'enregistrement de l'utilisateur :", error);
            res.status(500).send("Erreur lors de l'enregistrement de l'utilisateur.");
        }
    };


    ```

2. Mettez à jour la méthode `editUser` pour permettre la modification de l'avatar.

    ```javascript
    // Modification d'un utilisateur
    exports.editUser = async (req, res) => {
        try {
            const { username, email, password } = req.body;
            const updateData = { username, email, password };

            if (req.file) {
                updateData.avatar = {
                    data: req.file.buffer,
                    contentType: req.file.mimetype
                };
            }

            await User.findByIdAndUpdate(req.params.id, updateData);
            res.redirect('/users');
        } catch (error) {
            console.error("Erreur lors de la modification de l'utilisateur :", error);
            res.status(500).send("Erreur lors de la modification de l'utilisateur.");
        }
    };

    ```

### Étape 4: Mise à Jour des Routes 🛣️

Mettez à jour `routes/user.js` pour inclure le middleware Multer.

    ```javascript
    //// Ajoutez ces lignes pour gérer l'avatar///
 
    1. Mettez à jour la route pour enregistrer un nouveau user

    // Route pour enregistrer un nouvel utilisateur
    router.post('/register', upload.single('avatar'), userController.registerUser);


    2. Mettez à jour la route pour modifier le user

    // Route pour modifier un utilisateur
    router.post('/edit/:id', upload.single('avatar'), userController.editUser);


    3. Ajoutez une nouvelle route pour servir les images d'avatar.


    // Route pour servir les images (avatar)
    router.get('/avatar/:id', async (req, res) => {
        try {
            console.log("Requête pour l'avatar reçue"); // Log
            const user = await User.findById(req.params.id);
            console.log("Utilisateur trouvé :", user); // Log
            res.set('Content-Type', user.avatar.contentType);
            res.send(user.avatar.data);
        } catch (error) {
            console.error("Erreur :", error); // Log d'erreur
            res.status(400).send("Erreur lors de la récupération de l'avatar");
        }
    });
    ```

### Étape 5: Mise à Jour des Vues Twig 🎨

1. Dans `users.twig`, ajoutez un élément `<img>` pour afficher l'avatar en l'insérant dans le même <td> que {{ user.username }}.

    ```html
    <td>
        <img src="/avatar/{{ user._id }}" alt="{{ user.username }}" width="50">
        {{ user.username }}
    </td>
    ```

2. Dans `reister.twig`, ajoutez un champ pour le téléchargement de l'avatar.
        
    ```html    
    <!-- Ajout de l'attribut enctype pour le téléchargement de fichiers -->
    <form action="/register" method="POST" enctype="multipart/form-data">
        <!-- ... -->
        <div class="form-group">
            <label for="avatar">Avatar</label>
            <input type="file" class="form-control" id="avatar" name="avatar">
        </div>
        <!-- ... -->
    </form>


3. Dans `edit.twig`, modifier les attributs de <form> et ajoutez un champ pour le téléchargement de l'avatar.

    ```html
    <!-- Avatar centré -->
    <div class="text-center mb-5">
        <img src="/avatar/{{ user._id }}" alt="{{ user.username }}" width="200" style="border-radius: 40%;">
    </div>

    <!-- Ajout de l'attribut enctype pour le téléchargement de fichiers -->
    <form action="/edit/{{ user._id }}" method="post" enctype="multipart/form-data">
        <!-- ... -->
        <div class="mb-3">
            <label for="avatar" class="form-label">Avatar</label>
            <input type="file" class="form-control" id="avatar" name="avatar">
        </div>
        <!-- ... -->
    </form>

    ```

## Conseil de notre Développeur Senior 👨‍💻

N'oubliez pas de valider le type et la taille de l'image avant de l'enregistrer dans la base de données. C'est une bonne pratique pour la sécurité et l'optimisation. 🛡️

## Points à Vérifier ✅

- [ ] Le modèle `User` a-t-il été mis à jour ?
- [ ] Multer est-il installé et configuré ?
- [ ] Les méthodes `registerUser` et `editUser` ont-elles été mises à jour ?
- [ ] La route `user.js` a-t-elle été mise à jour ?
- [ ] Les vues Twig `register, edit et users` ont-elles été mises à jour ?

Si vous pouvez cocher toutes ces cases, félicitations ! Vous avez réussi à ajouter une fonctionnalité d'avatar à votre application ! 🎉🚀