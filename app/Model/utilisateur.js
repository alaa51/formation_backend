const mongoose = require('mongoose');
const utilisateur = new mongoose.Schema({
    first_name: {
        type: String,
        default: null
    },
    last_name:{
        type: String,
        default: null
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String
    },
    token: {
        type: String
    }
})
module.exports = mongoose.model("utilisateur", utilisateur)
