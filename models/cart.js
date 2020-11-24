const { text } = require('body-parser');
const Sqlz= require('sequelize');

const sqlz = require('../util/db');

const Cart = sqlz.define('cart',{
    id:{
        type : Sqlz.INTEGER,
        autoIncrement : true,
        allowNull : false,
        primaryKey: true
    }
})

module.exports = Cart;