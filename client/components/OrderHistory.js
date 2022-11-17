import React, { useState, useEffect } from 'react';
// import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';

function OrderHistory(props) {
  const [orders, setOrders] = useState([]);

  const user = useSelector((state) => state.auth);

  useEffect(() => {
    fetchHistory();
  }, []);
  const fetchHistory = async () => {
    const orders = await axios.get(`/api/users/orderhistory/${user.id}`);
    setOrders(orders.data);
  };

  return (
    <div className='order-history'>
      <h2 className='order-header'>{user.username}'s order history</h2>
      <h5 className='order-quantity'>Order quantity:{orders.length}</h5>
      {orders.map((orderObj, k) => {
        return (
          <div className='order-item'>
            <div className='order-detail'>order #{k + 1}</div>
            <div className='order-detail'>origin {orderObj.origin}</div>
            <div className='order-detail'>
              destination {orderObj.destination}
            </div>
            <div className='order-detail'>airline {orderObj.airline}</div>
            <div className='order-detail'>
              flight number {orderObj.flight_number}
            </div>
            <div className='order-detail'>travelers {orderObj.travelers}</div>
          </div>
        );
      })}
    </div>
  );
}

export default OrderHistory;
