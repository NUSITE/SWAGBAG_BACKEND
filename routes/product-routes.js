const express = require('express');
const productController = require('./../controllers/product-controller');
const router = express.Router();

router.get('/getProducts', productController.getProducts);
router.post('/addProduct', productController.addProduct);
router.get('/searchProduct/:productName', productController.searchProduct);
router.get('/searchProduct/upc/:productFormat/:productCountry/:upc', productController.searchProductAlongwithFormat);
router.get('/searchProduct/productTitle/:productFormat/:productCountry/:productTitle', productController.searchProductAlongwithFormat);
router.get('/deleteProduct/:id', productController.deleteProduct);



module.exports = router;

