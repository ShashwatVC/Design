const { text } = require('body-parser');
const Sqlz= require('sequelize');

const sqlz = require('../util/db');

const Order = sqlz.define('order',{
    id:{
        type : Sqlz.INTEGER,
        autoIncrement : true,
        allowNull : false,
        primaryKey: true
    },
    quantity: Sqlz.INTEGER,
    
})

module.exports = Order;