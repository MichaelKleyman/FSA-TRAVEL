import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
const luxon = require('luxon');

const DetailsCard = ({ flight }) => {
  let dt = luxon.DateTime.fromISO(flight.departure_at);
  return (
    <div className='pop-up-card'>
      <h1 className='pop-up-title'>
        Flight-{flight.flight_number}: {flight.origin} to {flight.destination}
      </h1>
      <p className='pop-up-airline'>Airline: {flight.airline}</p>
      <p className='pop-up-origin'>
        Leaving from: {flight.origin} on{' '}
        {dt.toLocaleString(luxon.DateTime.DATETIME_MED)}{' '}
      </p>
      <p className='pop-up-price'>${flight.price}</p>
      <p className='pop-up-description'>
        At FSA-TRAVEL we believe that traveling can bring good into the world,
        and so our mission is to power global travel for everyone, everywhere.
      </p>
      <div className='pop-up-icons'>
        <FaFacebook size={35} />
        <FaTwitter size={35} />
        <FaInstagram size={35} />
      </div>
    </div>
  );
};

export default DetailsCard;
