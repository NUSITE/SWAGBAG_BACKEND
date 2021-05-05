const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');

const schema = mongoose.Schema;
const userSchema = new schema({
    userFirstName: {type: String, required: true},
    userSecondName: {type: String, required: true},
    purchasedProducts: [{
        productId: {type: Number},
        productCount: {type: Number}
    }],
    cartAddedProducts: [{
        productId: {type: Number},
        productCountrySelected: {type: String},
        productFormatSelected: {type: String},
        productCount: {type: Number}
    }],
    addedProducts: [{type: Number}],
    totalPurchasedProductsCount: {type: Number},
    userEmail: {type: String, required: true},
    role: {type: String, required: true},
    password: {type: String, required: true},
    addess: {
        dNo: {type: String},
        streetName: {type: String},
        state: {type: String},
        country: {type: String},
        city: {type: String},
        postalCode: {type: String}
    }
});
userSchema.plugin(uniqueValidator);
module.exports = mongoose.model('User', userSchema);