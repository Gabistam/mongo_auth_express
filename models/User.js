// models/User.js
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

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

// Intégration de passport-local-mongoose qui sert à gérer les utilisateurs
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);
