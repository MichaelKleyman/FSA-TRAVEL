'use strict';
const papa = require('papaparse');
const fs = require('fs/promises');
const options = { header: true, skipEmptyLines: true };
const {
  db,
  models: { User, Orders, Airports, Airlines, Carts, Flights },
} = require('../server/db');
const { default: tr } = require('date-fns/locale/tr');

const flights = {
  '2022-11-07': {
    origin: 'MSY',
    destination: 'WAS',
    price: 23374,
    airline: '',
    flight_number: 6114,
    departure_at: '2022-11-07T12:15:00-06:00',
    return_at: '2022-12-07T06:06:00-05:00',
    transfers: 1,
    expires_at: '2022-11-08T05:16:51Z',
  },
  '2022-11-08': {
    origin: 'MSY',
    destination: 'WAS',
    price: 35774,
    airline: 'UA',
    flight_number: 786,
    departure_at: '2022-11-08T08:00:00-06:00',
    return_at: '2022-11-30T17:28:00-05:00',
    transfers: 0,
    expires_at: '2022-11-08T05:16:51Z',
  },
  '2022-11-09': {
    origin: 'MSY',
    destination: 'WAS',
    price: 24939,
    airline: 'UA',
    flight_number: 786,
    departure_at: '2022-11-09T08:00:00-06:00',
    return_at: '2022-11-30T17:28:00-05:00',
    transfers: 0,
    expires_at: '2022-11-08T05:16:51Z',
  },
  '2022-11-10': {
    origin: 'MSY',
    destination: 'WAS',
    price: 20407,
    airline: 'NK',
    flight_number: 452,
    departure_at: '2022-11-10T10:25:00-06:00',
    return_at: '2022-11-13T14:45:00-05:00',
    transfers: 1,
    expires_at: '2022-11-08T05:16:51Z',
  },
};

const dumOrders = [
  {
    date: '2022-11-11',
    total: '999',
  },
];

const dumCart = [
  {
    total: '999',
  },
];
const dummy = [
  {
    IATA_CODE: 'VLD',
    city: 'Valdosta',
    airport: 'Valdosta Regional Airport',
  },
  {
    IATA_CODE: 'VPS',
    city: 'Destin-Fort Walton Beach Airport',
    airport: 'Valparaiso',
  },
];
//Airport seeding function
async function parseAirports() {
  try {
    //reads airport.csv into a string called data
    const data = await fs.readFile('./airports.csv', { encoding: 'utf8' });
    //papa parse returns an object where data is array of objects
    const arr = papa.parse(data, options).data;
    //looping through object array to create each airports
    for (let i = 0; i < arr.length; i++) {
      try {
        await Airports.create({
          IATA: arr[i].IATA_CODE,
          city: arr[i].CITY,
          airport: arr[i].AIRPORT,
        });
      } catch (error) {
        console.log('in for each', error);
      }
    }
  } catch (error) {
    console.log('my err', error);
  }
}

async function parseAirlines() {
  try {
    //reads airlines.csv and sets data to a string of the text from csv
    const data = await fs.readFile('./airlines.csv', { encoding: 'utf8' });
    //papa parse returns object where data is array of objects
    const arr = papa.parse(data, options).data;
    //creat instances with sequalize
    for (let i = 0; i < arr.length; i++) {
      await Airlines.create({
        IATA: arr[i].IATA_CODE,
        name: arr[i].AIRLINE,
        imgurl: arr[i].Logo,
      });
    }
  } catch (error) {
    console.log(error);
  }
}
/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log('db synced!');

  // Creating Users
  const users = await Promise.all([
    User.create({
      username: 'cody',
      password: '123',
      firstName: 'Cody',
      lastName: 'Mcmillan',
      email: 'cm@gmail.com',
      phone: '1234567890',
    }),
    User.create({
      username: 'murphy',
      password: '456',
      firstName: 'Murphy',
      lastName: 'Cordova',
      email: 'mc@gmail.com',
      phone: '0123456789',
    }),
  ]);
  //create an order test
  const orders = await Promise.all([
    Orders.create({ completed: true, date: '2022-11-08', total: 200 }),
    Orders.create({ date: '2022-11-11', total: 999 }),
  ]);
  //seed cart
  const cart = await Promise.all([
    Carts.create({
      total: 999,
    }),
    Carts.create({
      total: 444,
    }),
  ]);

  //seed flights
  const flights = await Promise.all([
    Flights.create({
      date: '2022-11-11',
      origin: 'IAD',
      destination: 'WSY',
      price: '999',
      flight_number: '1234',
      departure_at: 'NOV 11 5:52',
      airline: 'FS',
      travelers: 1,
    }),
    Flights.create({
      date: '2022-11-12',
      origin: 'WSY',
      destination: 'IAD',
      price: '222',
      flight_number: '4321',
      departure_at: 'NOV 11 5:52',
      airline: 'AA',
      travelers: 1,
    }),
  ]);
  //seeding airport table
  await parseAirports();

  //seeding airline table
  await parseAirlines();

  await test();

  console.log(`seeded ${users.length} users`);
  console.log(`seeded successfully`);
  return {
    users: {
      cody: users[0],
      murphy: users[1],
    },
    orders: {
      orderOne: orders[0],
    },
  };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    // await db.close();
    console.log('db connection closed');
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}
async function test() {
  const flight = await Flights.findByPk(1);
  console.log(flight);
  flight.addCart(1);
}

// console.log(Object.keys(Flights.prototype));
// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
