const router = require('express').Router();
const Carts = require('../db/models/Cart');

//api/carts

router.get('/', async (req, res, next) => {
  try {
    const cart = await Carts.findAll({
      //WHERE STATEMENT HERE THAT GETS cart BY DATE
    });
    res.json(cart);
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

module.exports = router;
