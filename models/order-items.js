const { text } = require('body-parser');
const Sqlz= require('sequelize');

const sqlz = require('../util/db');

const OrderItem = sqlz.define('OrderItem',{
    id:{
        type : Sqlz.INTEGER,
        autoIncrement : true,
        allowNull : false,
        primaryKey: true
    },
    quantity: Sqlz.INTEGER,
    
});

module.exports = OrderItem;