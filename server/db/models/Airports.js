const Sequelize = require('sequelize')
const db = require('../db')

const Airports = db.define("airport", {
  IATA : {
    type : Sequelize.STRING,
    unique : true,
    allowNull: false,
  },
  city :{
    type : Sequelize.STRING,
  },
  airport :{
    type : Sequelize.STRING
  }
})


module.exports = Airports;
