import React, { useState, useEffect } from 'react';
// import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

function OrderHistory(props) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchHistory();
  }, []);
  const fetchHistory = async () => {
    const orders = await axios.get('/api/users/orderhistory/1');
    console.log('testtttttt', orders.data);
    setOrders(orders.data);
  };

  return (
    <div>
      {orders.map((orderObj) => {
        return (
          <div>
            <div>origin {orderObj.origin}</div>
            <div>destination {orderObj.destination}</div>
            <div>airline {orderObj.airline}</div>
            <div>flight number {orderObj.flight_number}</div>
            <div>travelers {orderObj.travelers}</div>
          </div>
        );
      })}
    </div>
  );
}

export default OrderHistory;
