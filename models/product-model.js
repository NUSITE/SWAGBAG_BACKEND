const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    productTitle: {type: String, required: true},
    productImage: {type: String},
    upc: {type: Number, required: true},
    unitCost: {type: Number, required: true},
    userordersPlaced: [{
        id: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        units: {type: Number}
    }],
    totalOrdersPlaced: {type: Number, default: 0},
    productCountries: [],
    productFormats: [],
    creator: {type: String, required: true},
    currency: {type: String}
})
productSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Product', productSchema);