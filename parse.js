const papa = require('papaparse');
// const fr = new FileReader();
const fs = require('fs/promises');
const options = { header: true, skipEmptyLines: true };
let arr;
// const csv = fs.readFile("./airports.csv", "utf-8", async (err, data) => {
//  arr = await papa.parse(data, options).data;
// // console.log(arr);
// });

// console.log(arr);

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

async function parse() {
  try {
    const data = await fs.readFile('./airports.csv', { encoding: 'utf8' });
    // console.log(papa.parse(data, options));
    arr = papa.parse(data, options).data;
    // const newarr = arr.map(obj => console.log(obj.IATA_CODE, obj.AIRPORT, obj.CITY))
    // console.log(newarr);
    // return newarr;
    // arr.forEach((obj) => console.log(obj.IATA_CODE, obj.AIRPORT));
  } catch (error) {
    console.log(error);
  }
}

// const test = parse();

async function parseAirlines() {
  try {
    const data = await fs.readFile('./airlines.csv', { encoding: 'utf8' });
    arr = papa.parse(data, options).data;
    arr.forEach((obj) => console.log(obj));
  } catch (error) {
    console.log(error);
  }
}

parseAirlines();
