const Sequelize = require('sequelize');
const db = require('../db');

const Flights = db.define('flight', {
  // date: {
  //   type: Sequelize.STRING,
  //   allowNull: false,
  // },
  origin: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  destination: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  flight_number: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  departure_at: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  airline: {
    type: Sequelize.STRING,
    defaultValue: 'FS',
  },
  // travelers: {
  //   type: Sequelize.INTEGER,
  //   allowNull: false,
  //   min: 1,
  //   max: 6,
  // },
});

module.exports = Flights;
