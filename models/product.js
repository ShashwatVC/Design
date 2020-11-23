const Sqlz = require('sequelize');

const sqlz = require('../util/db');

const Product = sqlz.define('product',{
  id:{
    type: Sqlz.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  title:Sqlz.STRING,
  price:{
    type:Sqlz.DOUBLE,
    allowNull:false
  },
  imageurl:{
    type:Sqlz.STRING,
    allowNull:false
  },
  description:{
    type:Sqlz.STRING,
    allowNull:false
  }
  
});

module.exports = Product;