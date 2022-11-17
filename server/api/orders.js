const router = require('express').Router();
const Orders = require('../db/models/Orders');
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
    res.json(order);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const timestamp = new Date().toDateString();
    const order = await Orders.create({
      completed: true,
      date: timestamp,
      userId: req.body.userId,
      //work around for now
      cartId: req.body.userId,

      total: req.body.total,
    });

    order.setFlights(req.body.flightId);

    res.json(order);
  } catch (error) {
    console.log('orders post', error);
  }
});

module.exports = router;
