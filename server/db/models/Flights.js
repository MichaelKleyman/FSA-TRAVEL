const Sequelize = require('sequelize')
const db = require('../db')

const Flights = db.define("flight", {
  date : {
    type : Sequelize.STRING,
  },
  origin : {
    type : Sequelize.STRING,
  },
  destination : {
    type : Sequelize.STRING,
  },
  price : {
    type : Sequelize.INTEGER,
  },
  flight_number : {
    type : Sequelize.STRING,
  },
  departure_at :{
    type : Sequelize.STRING,
  },
  return_at :{
    type : Sequelize.STRING,
  }
})

module.exports = Flights
