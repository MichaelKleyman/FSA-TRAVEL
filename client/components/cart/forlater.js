import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaShoppingCart } from 'react-icons/fa';
import { fetchCart, removeCart } from '../../store/addCart';
import { Link } from 'react-router-dom';

function Cart() {
  const [modal, setModal] = useState(false);
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  const userId = user.id;

  const toggleModal = () => {
    setModal(!modal);
  };

  useEffect(() => {
    dispatch(fetchCart(userId));
  }, [cart]);

  const allFlights = useSelector((state) => state.flights);

  const removeFromCart = (flightId) => {};

  if (modal) {
    document.body.classList.add('active-modal');
  } else {
    document.body.classList.remove('active-modal');
  }

  return (
    <div className="cart-container">
      <button onClick={toggleModal} className="cart float-cart">
        <FaShoppingCart size={35} />
      </button>

      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          {userId ? (
            <div className="modal-content">
              <h2>Cart</h2>
              <button className="closeModal" onClick={toggleModal}>
                X
              </button>
              {cart.map((item) => (
                <CartItem item={item} key={item.id} />
              ))}
              <Link to={`/checkout`}>Checkout</Link>
            </div>
          ) : (
            <div>
              <h3>Your Cart is Empty!</h3>
            </div>
          )}
          )
        </div>
      )}
    </div>
  );
}

export default Cart;
