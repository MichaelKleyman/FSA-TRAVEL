import React, { useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';

function Cart() {
  const [modal, setModal] = useState(false);
  const toggleModal = () => {
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add('active-modal');
  } else {
    document.body.classList.remove('active-modal');
  }

  return (
    <div className='navbar-cart'>
      <button onClick={toggleModal}>
        <FaShoppingCart size={35} />
      </button>
      {modal && (
        <div className='modal'>
          <div onClick={toggleModal} className='overlay'></div>
          <div className='modal-content'>
            <h2>Cart</h2>
            <p>Cart Elements</p>
            <button className='closeModal' onClick={toggleModal}>
              X
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
