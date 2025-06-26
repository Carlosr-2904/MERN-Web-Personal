const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: {
        type: String,
        unique: true,
    },
    password: String,
    role: String,
    active: Boolean,
    avatar: String,
})

module.exports = mongoose.model('User', UserSchema); // Export the model to use it in other files