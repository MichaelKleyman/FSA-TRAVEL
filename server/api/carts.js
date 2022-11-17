const router = require('express').Router();
const Carts = require('../db/models/Cart');
const Flights = require('../db/models/Flights');

//api/carts

router.get('/:id', async (req, res, next) => {
  try {
    const cart = await Carts.findByPk(req.params.id);
    const flights = await cart.getFlights();
    res.json(flights);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const cart = await Carts.create({
      total: req.body.total,
    });
    res.json(cart);
  } catch (error) {
    console.log('post cart', error);
  }
});

//delete route to unassociate flight
router.put('/', async (req, res, next) => {
  //getting cart with user id for now, may update it to cart id
  const cart = await Carts.findByPk(req.body.userId);
  cart.removeFlights(req.body.flightId);
  res.send(200);
});

//delete all flights from cart
router.delete('/all/:id', async (req, res, next) => {
  try {
    console.log('REQ BODY >>>', req.params.id);
    const cart = await Carts.findByPk(req.params.id);
    const flights = await cart.getFlights();

    await cart.removeFlights(flights);
    res.status(204).json('Delete');
  } catch (err) {
    next(err);
  }
});

//delete singular flights
router.delete('/:id', async (req, res, next) => {
  try {
    //body is user id
    //params is flight id
    const cart = await Carts.findByPk(req.body.id);
    await cart.removeFlights(req.params.id);

    res.status(204).json('Delete');
  } catch (err) {
    next(err);
  }
});

module.exports = router;
