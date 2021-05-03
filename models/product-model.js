const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    productTitle: {type: String, required: true},
    upc: {type: Number, required: true},
    unitCost: {type: Number, required: true},
    userordersPlaced: [{
        id: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        units: {type: Number}
    }],
    totalOrdersPlaced: {type: Number},
    productCountries: [],
    productFormats: [],
    creator: {type: Number, required: true}
})

module.exports = mongoose.model('Product', productSchema);