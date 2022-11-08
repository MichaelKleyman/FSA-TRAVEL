const Sequelize = require('sequelize')
const db = require('../db')

const Orders = db.define("order", {
  completed : {
    type : Sequelize.BOOLEAN,
    defaultValue: false
  },
  date :{
    type : Sequelize.DATEONLY,
  },
  invoice :{
    type : Sequelize.INTEGER
  }
})


module.exports = Orders;
