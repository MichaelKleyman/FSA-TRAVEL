import React from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import FlightCard from './FlightCard';
import DetailsCard from './DetailsCard';
import { addFlight } from '../store/addFlight';
import { fetchCart } from '../store/addCart';

function AllFlights(props) {
  const flights = props.flights;
  const dispatch = useDispatch();
  const [popUpContent, setPopUpContent] = useState([]);
  const [popUpToggle, setPopUpToggle] = useState(false);
  const [added, setAdded] = useState(false);
  const auth = useSelector((state) => state.auth.id);
  const changeContent = (flight) => {
    setPopUpContent([flight]);
    setPopUpToggle(!popUpToggle);
  };

  const addFlightToCart = (flight) => {
    flight.userId = auth;
    window.localStorage.setItem('save', JSON.stringify(flight));
    dispatch(addFlight(flight));
    dispatch(fetchCart(auth));
    setAdded({ added: !added });
  };

  return (
    <div className='card-container'>
      {flights.map(([k, flight]) => {
        return (
          <FlightCard flight={flight} k={k} changeContent={changeContent} />
        );
      })}
      {popUpToggle && (
        <div className='pop-up-container' onClick={changeContent}>
          <div className='pop-up-body' onClick={(e) => e.stopPropagation()}>
            <div className='pop-up-header'>
              <div className='pop-up-x' onClick={changeContent}>
                X
              </div>
            </div>
            <div className='pop-up-content'>
              {popUpContent.map((flight) => (
                <div>
                  <DetailsCard flight={flight} />
                  {!added ? (
                    <button
                      className='card-btn2'
                      onClick={() => addFlightToCart(flight)}
                    >
                      Add To Cart
                    </button>
                  ) : (
                    <button className='card-btn3'>Added</button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AllFlights;
