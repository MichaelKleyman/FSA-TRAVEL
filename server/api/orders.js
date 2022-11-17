const router = require('express').Router();
const Orders = require('../db/models/Orders');
require('dotenv').config();
const stripe = require('stripe')(process.env.SECRET_KEY);
const Carts = require('../db/models/Cart');
router.get('/', async (req, res, next) => {
  try {
    const orders = await Orders.findAll();
    res.json(orders);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const order = await Orders.findByPk(req.params.id);
    console.log('test');
    res.json(order);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    console.log(req.body);
    const timestamp = new Date().toDateString();
    const order = await Orders.create({
      completed: true,
      date: timestamp,
      userId: req.body.userId,
      //work around for now
      cartId: req.body.userId,
      total: req.body.total,
    });
    const payment = await stripe.paymentIntents.create({
      amount: req.body.total,
      currency: 'USD',
      description: 'Flight Booking',
      payment_method: req.body.paymentId,
      confirm: true,
    });
    const cart = await Carts.findByPk(req.body.userId);
    const flights = await cart.getFlights();
    await order.setFlights(flights);
    res.json({
      message: 'Payment successful',
      success: true,
      order,
    });
  } catch (error) {
    console.log('orders post error', error);
    res.json({
      message: 'Payment failed',
      success: false,
    });
  }
});

module.exports = router;
