import React, { useState } from 'react';
import { Button, Offcanvas, Navbar, Modal } from 'react-bootstrap';
import { FaShoppingCart } from 'react-icons/fa';

function Cart() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="cart">
      <Navbar expand="sm">
        <Navbar.Brand href="/">Your Cart</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Button onClick={handleShow}>
            <FaShoppingCart size={35} />
          </Button>
        </Navbar.Collapse>
      </Navbar>
      <div className="cart-container">
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Cart</Modal.Title>
          </Modal.Header>
          <div className="cart-body">
            <Modal.Body>
              <h2>Cart Elements</h2>
            </Modal.Body>
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default Cart;
