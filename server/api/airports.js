const router = require('express').Router();

router.get('/', async (req, res, next) => {
  try {
    const airports = await Airports.findAll();
    res.json(airports);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const airport = await Airports.findByPk(req.params.id);
    res.json(airport);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
