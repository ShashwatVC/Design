const express = require('express');
const path = require('path');
//const rootDir = require('./util/path.js'); not required anymore

const admincontroller = require('../controllers/admin');
const isAuth = require('../midware/is-auth');
const isAuthz = require('../midware/is-authz');


const router = express.Router();


router.get('/add-product', isAuth, admincontroller.getAddProduct);

router.get('/products', isAuth ,admincontroller.getProducts);

router.post ('/add-product', admincontroller.postAddProduct);

router.get ('/edit-product/:id', isAuth ,admincontroller.getEditProduct)

router.get ('/edit-profile/:id', isAuth ,admincontroller.getEditProfile)

router.post ('/update-profile/', isAuth ,admincontroller.postEditProfile)

router.post ('/edit-product/',admincontroller.postEditProduct);

router.post ('/delete-product',admincontroller.postDeleteproduct);

router.get ('/profile',admincontroller.getUsers);

// router.get ('/users', isAuthz, admincontroller.getUsers);






module.exports = router;