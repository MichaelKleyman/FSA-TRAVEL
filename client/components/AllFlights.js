import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
const luxon = require("luxon");
const selected_origin = "MSY";
const selected_destination = "IAD";

function AllFlights(props) {
  const flights = props.flights;

  return (
    <div className="card-container">
      {Object.entries(flights).map(([k, flight]) => {
        let dt = luxon.DateTime.fromISO(flight.departure_at);
        let rt = luxon.DateTime.fromISO(flight.return_at);
        return (
          <div key={k}>
            <div className="card">
              <div className="card-date">
                <p>{dt.toLocaleString(luxon.DateTime.DATETIME_MED)}</p>
              </div>
              <div className="card-direction-price">
                <p className="card-destination">
                  {flight.origin} - {flight.destination}
                </p>
                <p className="card-price">${flight.price}</p>
              </div>
              <div className="card-buttons">
                <button className="card-btn1">Add to cart</button>
                <button className="card-btn2">Details</button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default AllFlights;
