import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
const luxon = require("luxon");
const selected_origin = "MSY";
const selected_destination = "IAD";

function AllFlights(props) {

  const flights = props.flights

  return (
    <div className="card-container">
      {Object.entries(flights).map(([k, flight]) => {
        let dt = luxon.DateTime.fromISO(flight.departure_at);
        return (
        <div key={k}>
          <div className="card">
            <div>
              <p>

                Departure:
                {dt.toLocaleString(luxon.DateTime.DATETIME_MED)}
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
