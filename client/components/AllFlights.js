import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
const luxon = require('luxon');
const selected_origin = 'MSY';
const selected_destination = 'IAD';

function AllFlights(props) {
  const flights = props.flights;
  const [popUpContent, setPopUpContent] = useState([]);
  const [popUpToggle, setPopUpToggle] = useState(false);
  const changeContent = (flight) => {
    setPopUpContent([flight]);
    setPopUpToggle(!popUpToggle);
  };
  console.log(flights);
  return (
    <div className='card-container'>
      {flights.map(([k, flight]) => {
        let dt = luxon.DateTime.fromISO(flight.departure_at);
        let rt = luxon.DateTime.fromISO(flight.return_at);
        return (
          <div key={k}>
            <div className='card'>
              <div className='card-date'>
                <p>{dt.toLocaleString(luxon.DateTime.DATETIME_MED)}</p>
              </div>
              <div className='card-direction-price'>
                <p className='card-destination'>
                  {flight.origin} - {flight.destination}
                </p>
                <p className='card-price'>${flight.price}</p>
              </div>
              <div className='card-buttons'>
                <button className='card-btn1'>Add to cart</button>
                <button
                  className='card-btn2'
                  onClick={() => changeContent(flight)}
                >
                  Details
                </button>
              </div>
            </div>
          </div>
        );
      })}
      {popUpToggle && (
        <div className='pop-up-container' onClick={changeContent}>
          <div className='pop-up-body' onClick={(e) => e.stopPropagation()}>
            <div className='pop-up-header'>
              <button className='pop-up-x' onClick={changeContent}>
                X
              </button>
            </div>
            <div className='pop-up-content'>
              {popUpContent.map((flight) => {
                let dt = luxon.DateTime.fromISO(flight.departure_at);
                let rt = luxon.DateTime.fromISO(flight.return_at);
                return (
                  <div className='pop-up-card'>
                    <h1 className='pop-up-title'>
                      Flight-{flight.flight_number}: {flight.origin} to{' '}
                      {flight.destination}
                    </h1>
                    <p>Airline: {flight.airline}</p>
                    <p>
                      Leaving from: {flight.origin} on{' '}
                      {dt.toLocaleString(luxon.DateTime.DATETIME_MED)}{' '}
                    </p>
                    <p>
                      Returning from: {flight.destination} on{' '}
                      {rt.toLocaleString(luxon.DateTime.DATETIME_MED)}
                    </p>

                    <p>Round trip price: ${flight.price}</p>
                    <p>
                      At FSA-TRAVEL, where saftey is are main concern, believe
                      that traveling can bring good into the world, and so our
                      mission is to power global travel for everyone,
                      everywhere.
                    </p>
                    <p>For more information contact at us / / / </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AllFlights;
