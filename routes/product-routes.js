const express = require('express');
const productController = require('./../controllers/product-controller');
const router = express.Router();


router.post('/addProduct', productController.addProduct);


module.exports = router;

