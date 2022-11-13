//this is the access point for all things database related!

const db = require('./db');

const User = require('./models/User');
const Orders = require('./models/Orders');
const Airports = require('./models/Airports');
const Airlines = require('./models/Airlines');
const Carts = require('./models/Cart');
const Flights = require('./models/Flights');
//associations could go here!
Flights.belongsToMany(Carts, { through: 'FlightCart' });
Carts.belongsToMany(Flights, { through: 'FlightCart' });

User.hasOne(Carts);
Carts.belongsTo(User);

User.hasMany(Orders);
Orders.belongsTo(User);

Carts.hasMany(Orders);
Orders.belongsTo(Carts);

Orders.hasMany(Flights);
Flights.belongsTo(Orders);

module.exports = {
  db,
  models: {
    User,
    Orders,
    Airports,
    Airlines,
    Carts,
    Flights,
  },
};
