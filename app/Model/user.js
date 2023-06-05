var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var schema =  new Schema({
    email: {
        type: String,
        require: true,
        unique: true
    },
    firstName: {
        type: String,
        default: ''
    },
    lastName: {
        type: String,
        default: ''
    },
    phone: String,
})
var user = new mongoose.model('User', schema);

module.exports = user;
