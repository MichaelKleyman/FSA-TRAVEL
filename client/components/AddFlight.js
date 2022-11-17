import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { connect } from 'react-redux';
import { addFlight } from '../store/addFlight';
import { fetchCart } from '../store/addCart';

function AddFlight(props) {
  const dispatch = useDispatch();
  const [added, setAdded] = useState(false);
  const auth = useSelector((state) => state.auth.id);

  const addFlightToCart = (flight) => {
    flight.userId = auth;
    window.localStorage.setItem('save', JSON.stringify(flight));
    const trav = document.getElementById('travelers-num');
    flight.travelers = parseInt(trav.innerHTML);
    dispatch(addFlight(flight));
    dispatch(fetchCart(auth));
    setAdded({ added: !added });
  };

  return (
    <>
      {!added ? (
        <button
          className='card-btn2'
          onClick={() => addFlightToCart(props.flight)}
        >
          Add To Cart
        </button>
      ) : (
        <button className='card-btn3'>Added</button>
      )}
    </>
  );
}

export default AddFlight;
