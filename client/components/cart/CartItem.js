import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeCart } from '../../store/addCart';
import axios from 'axios';

const CartItem = (props) => {
  const { item, id, fetchCart } = props;
  const dispatch = useDispatch();

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
      <h3>
        {item.origin}
        {item.destination}
        <button type="button" onClick={handleClick}>
          {console.log('clicked')}
          Remove Item
        </button>
      </h3>
    </div>
  );
};

export default CartItem;
