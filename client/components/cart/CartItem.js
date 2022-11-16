import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeCart } from '../../store/addCart';
import axios from 'axios';
const luxon = require('luxon');

const CartItem = (props) => {
  const { item, id, fetchCart } = props;
  const dispatch = useDispatch();
  let dt = luxon.DateTime.fromISO(item.departure_at);

  const handleClick = async () => {
    console.log('id >>>>', id);
    const something = await axios.delete(`/api/carts/${item.id}`, {
      data: { id: id },
    });
    dispatch(fetchCart(id));
  };

  //dispatch(removeCart(item.id))

  //item.variable comes from flights table
  return (
    <div>
      {id ? (
        <div className='card-container'>
          <div className='cart-card'>
            <h3 className='pop-up-title'>Flight-{item.flight_number}</h3>
            <p>
              From: {item.origin} To: {item.destination}
            </p>
            <p>Travelers {item.travelers}</p>
            <p>{dt.toLocaleString(luxon.DateTime.DATETIME_MED)}</p>
            <button type='button' onClick={handleClick}>
              {console.log('clicked')}
              Remove Item
            </button>
          </div>
        </div>
      ) : null}
      {/* <h3>
        {item.origin}
        {item.destination}
        <button type="button" onClick={handleClick}>
          {console.log('clicked')}
          Remove Item
        </button>
      </h3> */}
    </div>
  );
};

export default CartItem;
