const router = require('express').Router();
const {
  models: { User, Carts },
} = require('../db');
module.exports = router;

//prepened with /users

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!

      attributes: ['id', 'username', 'email', 'phone', 'firstName', 'lastName'],
    });
    console.log('in get');
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.params.id,
      },
    });

    res.send(user);
  } catch (e) {
    next(e);
  }
});

router.get('/orderhistory/:id', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    const orders = await user.getOrders();
    const flightarr = [];
    for (let i = 0; i < orders.length; i++) {
      const insideFlights = await orders[i].getFlights();
      for (let k = 0; k < insideFlights.length; k++) {
        console.log(orders[i].date);
        flightarr.push(insideFlights[k]);
      }
    }
    // const flightone = await orders[0].getFlights();
    // const flights = await orders.getFlights();
    res.json(flightarr);
  } catch (error) {
    console.log('orderhistory error', error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    console.log('created user');
    const newUser = await User.create({
      //creating a new user to the database, I am assuming the body sent will be the same as the database fields
      username: req.body.username,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
    });
    const cart = await Carts.create({});
    console.log('caaaaaaaaaaaaaaaaaaaaaaaaaa', cart);
    cart.setUser(newUser.id);

    res.status(200).send(newUser);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const { username, password, firstName, lastName, email, phone } = req.body;
    const updated = await User.update(
      {
        username,
        password,
        firstName,
        lastName,
        email,
        phone,
      },
      {
        where: {
          id: req.params.id,
        },
        returning: true,
      }
    );
    const [numRows, updatedUser] = updated;
    if (!updatedUser) {
      res.sendStatus(404);
    } else {
      res.status(200).send(updatedUser);
    }
  } catch (e) {
    next(e);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const deletedUser = await User.findByPk(req.params.id);
    if (!deletedUser) {
      res.status(404).send('User not found!');
    } else {
      await deletedUser.destroy();
    }
  } catch (e) {
    next(e);
  }
});
