const Product = require('../models/product-model');

const addProduct = async (req, res, next) => {
    let {
        productTitle, upc, unitCost, productCountries, productFormats, creator, currency
    } = req.body;
    let addedProduct = new Product({
        productTitle, upc, unitCost, productCountries, productFormats, creator, currency
    });
    try {
        await addedProduct.save();
    } catch (error) {
        res.json({"message": "Unable to add! Please contact support team"});
    }
    res.json({"message": "Successfully added"});
}

exports.addProduct = addProduct;