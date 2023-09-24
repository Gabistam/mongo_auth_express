const mongoose = require('mongoose');
require('dotenv').config();



/**
 * Fonction pour établir la connexion à la base de données.
 */
const bizareDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://usernode:Odvjbk1ZeWdJSL8m@cluster1.xw7jt7q.mongodb.net/test_mongo?retryWrites=true&w=majority`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('La connexion à la base de données a été établie avec succès.');
    } catch (error) {
        console.error('Impossible de se connecter à la base de données:', error);
    }
};

module.exports = { bizareDB };
