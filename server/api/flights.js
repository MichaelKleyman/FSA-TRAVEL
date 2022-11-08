const router = require('express').Router();

router.get('/', async (req, res, next) => {
  try {
    const flights = await Flights.findAll({
      attributes: ['origin', 'destination'],
      //WHERE STATEMENT HERE THAT GETS FLIGHTS BY DATE
    });
    res.json(flights);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const flight = await Flights.findByPk(req.params.id);
    res.json(flight);
  } catch (err) {
    next(err);
  }
});

//MAY NOT NEED THIS AND INSTEAD JUST NOT GET FLIGHTS THAT ARE IN THE PAST
// router.delete('/:id', async (req, res, next) => {
//   try {
//     let id = Number(req.params.id);
//     if (!id) {
//       res.status(400).send('Not a number!');
//     } else {
//       let flight = await Flights.findByPk(id);
//       if (!flight) {
//         res.status(404).send('Flight not found!');
//       } else {
//         await Flights.destroy({
//           where: {
//             id: id,
//           },
//         });
//         res.status(204).send('Deleted flight!');
//       }
//     }
//   } catch (err) {
//     next(err);
//   }
// });

module.exports = router;
