const express = require('express');
const path = require('path');
//const rootDir = require('./util/path.js'); not required anymore

const authController = require('../controllers/auth');

const router = express.Router();


router.get('/login',authController.getLogin);
router.post('/login',authController.postLogin);
router.post('/logout', authController.postLogout);
router.get('/signup', authController.getSignup);
router.post('/signup', authController.postSignup);
router.get('/reset', authController.getReset);
router.post('/reset', authController.postReset);





module.exports = router;