import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaShoppingCart } from 'react-icons/fa';
import { fetchCart, removeCart } from '../../store/addCart';
import { Link } from 'react-router-dom';
import CartItem from './CartItem';

function Cart() {
  const [modal, setModal] = useState(false);
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.addCartReducer);
  const auth = useSelector((state) => state.auth.id);
  const userId = auth;

  const toggleModal = () => {
    setModal(!modal);
  };

  useEffect(() => {
    dispatch(fetchCart(auth));
  }, []);

  console.log('CART >>>', cart);
  console.log('AUTH >>>', auth);

  //const allFlights = useSelector((state) => state.flights);

  const removeFromCart = (flightId) => {};

  if (modal) {
    document.body.classList.add('active-modal');
  } else {
    document.body.classList.remove('active-modal');
  }

  return (
    <div className='navbar-cart'>
      <button onClick={toggleModal}>
        {/* <img src='https://i.imgur.com/vmj1zg7.jpg' className='cart image' /> */}
        <FaShoppingCart size={35} />
      </button>
      {modal && (
        <div className='modal'>
          <div onClick={toggleModal} className='overlay'></div>
          <div className='modal-content'>
            <h2>Cart</h2>

            <button className='closeModal' onClick={toggleModal}>
              X
            </button>
            {cart.map((item) => (
              <CartItem
                item={item}
                id={auth}
                fetchCart={fetchCart}
                key={item.id}
              />
            ))}
            <Link to={`/checkout`}>Checkout</Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
