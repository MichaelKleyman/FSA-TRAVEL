//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User')
const Orders = require('./models/Orders')
const Airports = require('./models/Airports')
//associations could go here!

module.exports = {
  db,
  models: {
    User,
    Orders,
    Airports
  },
}
