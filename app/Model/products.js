var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var schema =  new Schema({
    name: {
        type: String,
        require: true,
        default: ''
    },
    price: {
        type: String,
        default: ''
    },
    description: {
        type: String,
        default: ''
    },
    owner: String,
})
var products = new mongoose.model('Products', schema);

module.exports = products;
