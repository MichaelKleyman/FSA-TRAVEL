const router = require('express').Router();

router.get('/', async (req, res, next) => {
  try {
    const airlines = await Airlines.findAll();
    res.json(airlines);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const airline = await Airlines.findByPk(req.params.id);
    res.json(airline);
  } catch (err) {
    next(err);
  }
});
