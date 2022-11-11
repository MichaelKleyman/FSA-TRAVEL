import React from 'react';

const SingleFlight = ({ content, changeContent }) => {
  return (
    <div className='popup'>
      <div className='popup-inner'>
        <div className='popup-header'>
          <button onClick={changeContent}>Close</button>
        </div>
        <div className='popup-content'>
          {content.map((flight) => {
            return (
              <div className='popup-box'>
                <p>Flying from: {flight.origin}</p>
                <p>Landing in: {flight.destination}</p>
                <p>Price: ${flight.price}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SingleFlight;
