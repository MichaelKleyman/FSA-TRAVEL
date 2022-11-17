const router = require('express').Router();
const Orders = require('../db/models/Orders');
const Carts = require('../db/models/Cart');
router.get('/', async (req, res, next) => {
  try {
    const orders = await Orders.findAll({
      where: {
        id: req.params.id,
      },
    });
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
    const cart = await Carts.findByPk(req.body.userId);
    const flights = await cart.getFlights();
    await order.setFlights(flights);
    res.json(order);
  } catch (error) {
    console.log('orders post', error);
  }
});

module.exports = router;
