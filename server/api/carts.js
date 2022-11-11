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

module.exports = router;
