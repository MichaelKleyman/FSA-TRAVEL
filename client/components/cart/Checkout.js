import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CheckoutItem from './CheckoutItem';
import CheckoutForm from './CheckoutForm';
import StripeContainer from './Stripe/StripeContainer';
import { fetchCart } from '../../store/addCart';

const Checkout = () => {
  const dispatch = useDispatch;

  const cart = useSelector((state) => state.addCartReducer);
  const userId = useSelector((state) => state.auth.id);
  console.log('outsideUserId >>>', userId);
  console.log('outsideCart >>>', cart);
  // useEffect(() => {
  //   if (userId) {
  //     dispatch(fetchCart(userId));
  //   } else {
  //     console.log('loading');
  //   }
  // }, []);

  return (
    <div className="checkout">
      <h1>Checkout</h1>
      <div className="checkout-form">
        <StripeContainer />
      </div>

      <div className="checkout-items">
        {cart.map((item) => (
          <CheckoutItem
            item={item}
            id={userId}
            fetchCart={fetchCart}
            key={item.id}
          />
        ))}
      </div>
    </div>
  );
};

export default Checkout;

/*
{cart.map((item) => (
          <CartItem
            item={item}
            id={userId}
            fetchCart={fetchCart}
            key={item.id}
          />
        ))}


        <CheckoutForm />
        */
