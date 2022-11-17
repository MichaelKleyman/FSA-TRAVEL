const Sequelize = require('sequelize');
const db = require('../db');

const Orders = db.define('order', {
  completed: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  //date purchased
  date: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  total: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = Orders;
