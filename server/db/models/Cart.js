const Sequelize = require('sequelize');
const db = require('../db');

const Carts = db.define('cart', {
  // total: {
  //   //in USD no cents
  //   // type: Sequelize.INTEGER,
  //   // allowNull: false,
  // },
});

module.exports = Carts;
