 //const { response } = require('express');
const express = require('express');
const path = require('path');
const { getProducts } = require('../controllers/shop');
//const rootDir = require('.util/path.js');
//const adminData = require('./admin');

const ShopController = require('../controllers/shop')




const router = express.Router();

router.get('/', ShopController.getIndex);

router.get('/products', ShopController.getProducts);

router.get('/products/:id',ShopController.getProd);

// router.get('/checkout');

router.get('/cart', ShopController.getCart);

router.post('/cart', ShopController.postCart);

router.post('/cart-delete-item',ShopController.postCartDeleteProduct);

router.post('/create-order', ShopController.postOrder);

router.get('/orders', ShopController.getOrders);

// router.get('/checkout', ShopController.getCheckout);


//router.get('/products');

module.exports = router;