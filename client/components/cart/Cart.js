import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaShoppingCart } from 'react-icons/fa';
import { fetchCart, removeCart } from '../../store/addCart';
import { Link } from 'react-router-dom';
import CartItem from './CartItem';
import Checkout from './Checkout';

function Cart({ userId }) {
  const [modal, setModal] = useState(false);
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.addCartReducer);

  const toggleModal = () => {
    setModal(!modal);
    if (userId) {
      dispatch(fetchCart(userId));
    } else {
      console.log('no cart');
    }
  };

  useEffect(() => {
    if (userId) {
      dispatch(fetchCart(userId));
    } else {
      console.log('loading');
    }
  }, [userId]);

  if (modal) {
    document.body.classList.add('active-modal');
  } else {
    document.body.classList.remove('active-modal');
  }

  return (
    <div className="navbar-cart">
      <button onClick={toggleModal}>
        {/* <img src='https://i.imgur.com/vmj1zg7.jpg' className='cart image' /> */}
        <FaShoppingCart size={35} />
      </button>
      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <div className="cart-close">
              <button className="closeModal" onClick={toggleModal}>
                X
              </button>
            </div>
            <div className="modal-inside">
              <h2>Cart</h2>

              {cart.map((item) => (
                <CartItem
                  item={item}
                  id={userId}
                  fetchCart={fetchCart}
                  key={item.id}
                />
              ))}

              <Link onClick={toggleModal} to={'/checkout'}>
                Checkout
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
