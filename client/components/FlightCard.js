import React from 'react';
import AddFlight from './AddFlight';

const luxon = require('luxon');

function FlightCard({ flight, k, changeContent }) {
  let dt = luxon.DateTime.fromISO(flight.departure_at);
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
          <AddFlight flight={flight} />
          <button className='card-btn2' onClick={() => changeContent(flight)}>
            Details
          </button>
        </div>
      </div>
    </div>
  );
}

export default FlightCard;
