const router = require('express').Router();

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
    res.json(order);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
