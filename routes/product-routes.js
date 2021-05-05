const express = require('express');
const productController = require('./../controllers/product-controller');
const router = express.Router();


router.post('/addProduct', productController.addProduct);
router.get('/searchProduct/:productName', productController.searchProduct);
router.get('/searchProduct/upc/:productFormat/:productCountry/:upc', productController.searchProductAlongwithFormat);
router.get('/searchProduct/productTitle/:productFormat/:productCountry/:productTitle', productController.searchProductAlongwithFormat);



module.exports = router;

