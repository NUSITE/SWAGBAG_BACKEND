const Product = require('../models/product-model');


// Add Product
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

// Search Product

const searchProduct = async (req, res, next) => {
    console.log('Req', req.params.productName);
    let products;
    try {
        products = await (await Product.find({})).filter(item => item.productTitle.toLowerCase().includes(req.params.productName.toLowerCase()));
    } catch (error) {
        res.json({"message": "Please try after some time"});
    }
    res.json({
        products: [...products],
        "message": "Sucessfull",
    })
}

exports.addProduct = addProduct;
exports.searchProduct = searchProduct;