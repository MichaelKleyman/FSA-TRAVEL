const Sequelize = require('sequelize');
const db = require('../db');

const Airlines = db.define('airline', {
  IATA: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
  },
  imgurl: {
    type: Sequelize.STRING,
  },
});

module.exports = Airlines;
