const Sqlz = require('sequelize');

const sqlz = new Sqlz('node-complete', 'root', '1234', {
    dialect: 'mysql', 
    host:'localhost'
});

module.exports = sqlz;