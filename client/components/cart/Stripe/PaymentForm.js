import React, { useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useSelector } from 'react-redux';

const CARD_OPTIONS = {
  iconStyle: 'solid',
  style: {
    base: {
      iconColor: '#c4f0ff',
      color: '#fff',
      fontWeight: 500,
      fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
      fontSize: '16px',
      fontSmoothing: 'antialiased',
      ':-webkit-autofill': { color: '#fce883' },
      '::placeholder': { color: '#87bbfd' },
    },
    invalid: {
      iconColor: '#ffc7ee',
      color: '#ffc7ee',
    },
  },
};

function PaymentForm() {
  const [success, setSuccess] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const userId = useSelector((state) => state.auth.id);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });
    if (!error) {
      try {
        const { id } = paymentMethod;
        const response = await axios.post('/api/orders', {
          total: 500,
          userId: userId,
          paymentId: id,
        });
        await axios.delete(`/api/carts/all/${userId}`);

        if (response.data.success) {
          console.log('Success');
          setSuccess(true);
        }
      } catch (err) {
        console.log('Error', err);
      }
    } else {
      console.log('somewhere incomplete', error.message);
    }
  };

  return (
    <>
      {!success ? (
        <form onSubmit={handleSubmit}>
          <fieldset className='FormGroup'>
            <div className='FormRow'>
              <CardElement options={CARD_OPTIONS} />
            </div>
          </fieldset>
          <button className='stripe-button'>
            Pay
          </button>
        </form>
      ) : (
        <div>
          <h2>Purchase complete!</h2>
        </div>
      )}
    </>
  );
}
export default PaymentForm;
