import React from 'react';
import { useState } from 'react';
import { fetchCart } from '../../store/addCart';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

const UserInfoModal = ({
  user,
  userInfo,
  handleSubmit,
  handleChange,
  popUpToggle,
  changeContent,
  role,
}) => {
  const [viewCart, setViewCart] = useState(false);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.addCartReducer);
  const totalPrice = cart.reduce((accum, item) => {
    return accum + item.price;
  }, 0);

  function usersCart() {
    setViewCart(!viewCart);
    dispatch(fetchCart(userInfo.id));
    console.log('>>>>CART', cart);
  }

  async function handleClick(itemId) {
    const something = await axios.delete(`/api/carts/${itemId}`, {
      data: { id: userInfo.id },
    });
    dispatch(fetchCart(userInfo.id));
  }

  return (
    <div>
      {popUpToggle && (
        <div className='pop-up-container'>
          <div
            className='admin-pop-up-body'
            onClick={(e) => e.stopPropagation()}
          >
            <div className='admin-popup-header'>
              <div className='pop-up-card'>
                <div
                  className='pop-up-x'
                  onClick={() => {
                    changeContent();
                    setViewCart(!viewCart);
                  }}
                >
                  X
                </div>

                {role === 'admin' ? (
                  <p className='admin-task2' onClick={usersCart}>
                    Users Cart
                  </p>
                ) : null}

                {role === 'admin' && viewCart ? (
                  <div className='users-cart'>
                    <header
                      style={{
                        fontWeight: 'lighter',
                        textDecoration: 'underline',
                      }}
                    >
                      Cart Info
                    </header>
                    <small>Quantity: {cart.length}</small>
                    {cart.map((cartItem) => (
                      <h6 key={cartItem.id} className='admin-cart-item'>
                        <p>Flying from: {cartItem.origin}</p>
                        <p>Landing at: {cartItem.destination}</p>
                        <p>Price: ${cartItem.price}</p>
                        <p>Travelers: {cartItem.travelers}</p>
                        <button
                          onClick={() => handleClick(cartItem.id)}
                          className='remove-flight'
                        >
                          Remove Flight
                        </button>
                      </h6>
                    ))}
                    <small>Total Price: ${totalPrice}</small>
                  </div>
                ) : null}
              </div>
            </div>
            <div className='pop-up-content'>
              <div className='pop-up-card'>
                <h4>User Name</h4>
                <input
                  type='text'
                  name='username'
                  value={userInfo.username}
                  placeholder={user.username}
                  onChange={handleChange}
                />
              </div>
              <div className='pop-up-card'>
                <h4>First Name</h4>
                <input
                  type='text'
                  name='firstName'
                  value={userInfo.firstName}
                  placeholder={user.firstName}
                  onChange={handleChange}
                />
              </div>
              <div className='pop-up-card'>
                <h4>Last Name</h4>
                <input
                  type='text'
                  name='lastName'
                  value={userInfo.lastName}
                  placeholder={user.lastName}
                  onChange={handleChange}
                />
              </div>
              <div className='pop-up-card'>
                <h4>Email</h4>
                <input
                  type='text'
                  name='email'
                  value={userInfo.email}
                  placeholder={user.email}
                  onChange={handleChange}
                />
              </div>
              <div className='pop-up-card'>
                <h4>Phone Number</h4>
                <input
                  type='text'
                  name='phone'
                  value={userInfo.phone}
                  placeholder={user.phone}
                  onChange={handleChange}
                />
              </div>
              <button
                type='submit'
                className='edit-button'
                onClick={handleSubmit}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserInfoModal;
