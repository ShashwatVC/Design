const Sqlz = require('sequelize');

const sqlz  = require('../util/db');

const User = sqlz.define('user',{
    id: {
        type:Sqlz.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey: true
    },
    name:Sqlz.STRING,
    email:Sqlz.STRING
});

module.exports = User;