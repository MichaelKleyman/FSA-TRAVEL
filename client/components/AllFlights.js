import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
const luxon = require("luxon");
const selected_origin = "MSY";
const selected_destination = "IAD";

function AllFlights() {
  const [flights, setFlights] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data } = await axios.get(
      `http://api.travelpayouts.com/v1/prices/calendar?depart_date=2022-11&currency=USD&origin=${selected_origin}&destination=${selected_destination}&token=ed36fb1a96dc9c4593b94a42e1a6825a`
    );
    setFlights(data.data);
  };

  return (
    <div className="card-container">
      {Object.entries(flights).map(([k, flight]) => {
        let dt = luxon.DateTime.fromISO(flight.departure_at);
        return (
        <div key={k}>
          {/* <p>{JSON.stringify(flights[k], null, 2)}</p> */}
          <div className="card">
            <div>
              <p>
                {/* 22/12/12 8:42am - 12:20pm */}
                {/* Date:{flight.departure_at.slice(0, 10)}  */}
                Departure:
                {dt.toLocaleString(luxon.DateTime.DATETIME_MED)}
                {/* {flight.departure_at.slice(11)} - {Date(flight.return_at)}{" "} */}
              </p>
            </div>

            <div>
              <p>${flight.price}</p>
            </div>

            <div>
              <p>
                {flight.origin} - {flight.destination}
              </p>
            </div>

            <div>
              <p>{flight.airline} Airlines</p>
            </div>

            <div>
              <p>({flight.transfers} stops)</p>
            </div>
            <div className="add-toCart">
              <button>Add to cart</button>
            </div>
          </div>
        </div>
      )})}
    </div>
  );
}

export default AllFlights;
