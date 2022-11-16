import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './PaymentForm';

const PUBLIC_KEY =
  'pk_test_51M4tu0GsacnObOBiEnQ59RIKATF4IySlwfqSr6VZ4UfUufGkKQqoWDXn8fYXM2IiHUV2zgRrGLZjmYbIjvXYNE4G00xjLR7jzF';
const stripeTestPromise = loadStripe(PUBLIC_KEY);

function StripeContainer() {
  return (
    <Elements stripe={stripeTestPromise}>
      <PaymentForm />
    </Elements>
  );
}

export default StripeContainer;
