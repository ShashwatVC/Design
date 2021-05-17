const express = require('express');
const path = require('path');
//const rootDir = require('./util/path.js'); not required anymore

const admincontroller = require('../controllers/admin');
const isAuth = require('../midware/is-auth');

const router = express.Router();


router.get('/add-product', isAuth, admincontroller.getAddProduct);

router.get('/products', isAuth ,admincontroller.getProducts);

router.post ('/add-product', admincontroller.postAddProduct);

router.get ('/edit-product/:id', isAuth ,admincontroller.getEditProduct)

router.post ('/edit-product/',admincontroller.postEditProduct);

router.post ('/delete-product',admincontroller.postDeleteproduct);

router.get ('/profile',admincontroller.getProfile);




module.exports = router;