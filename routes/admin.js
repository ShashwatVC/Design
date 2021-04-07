const express = require('express');
const path = require('path');
//const rootDir = require('./util/path.js'); not required anymore

const admincontroller = require('../controllers/admin');

const router = express.Router();


router.get('/add-product',admincontroller.getAddProduct);

//router.get('/products',admincontroller.getProducts);

router.post ('/add-product', admincontroller.postAddProduct);

// router.get ('/edit-product/:id',admincontroller.getEditProduct)

// router.post ('/edit-product/',admincontroller.postEditProduct);

// router.post ('/delete-product',admincontroller.postDeleteproduct);



module.exports = router;