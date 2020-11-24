const { text } = require('body-parser');
const Sqlz= require('sequelize');

const sqlz = require('../util/db');

const CartItem = sqlz.define('cartItem',{
    id:{
        type : Sqlz.INTEGER,
        autoIncrement : true,
        allowNull : false,
        primaryKey: true
    },
    quantity: Sqlz.INTEGER,
    
})

module.exports = CartItem;