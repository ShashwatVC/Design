 //const { response } = require('express');
const express = require('express');
const path = require('path');
const { getProducts } = require('../controllers/shop');
//const rootDir = require('.util/path.js');
//const adminData = require('./admin');
const isAuth = require('../midware/is-auth');

const ShopController = require('../controllers/shop')




const router = express.Router();

router.get('/', ShopController.getIndex);

router.get('/products', ShopController.getProducts);

router.get('/products/:id',ShopController.getProd);

// // router.get('/checkout');

router.get('/cart', isAuth , ShopController.getCart);

router.post('/cart', isAuth , ShopController.postCart);

router.post('/cart-delete-item', isAuth ,ShopController.postCartDeleteProduct);

router.post('/create-order', isAuth , ShopController.postOrder);

router.post('/delete-order', isAuth , ShopController.postDeleteOrder);

router.get('/orders', isAuth , ShopController.getOrders);

// router.get('/checkout', ShopController.getCheckout);


//router.get('/products');

module.exports = router;