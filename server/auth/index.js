const router = require('express').Router();
const {
  models: { User, Carts },
} = require('../db');
module.exports = router;

router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { username: req.body.username } });
    if (!user) {
      console.log('No such user found:', req.body.username);
      res.status(401).send('Wrong username and/or password');
    } else if (!user.correctPassword(req.body.password)) {
      console.log('Incorrect password for user:', req.body.username);
      res.status(401).send('Wrong username and/or password');
    } else {
      res.send({ token: await User.authenticate(req.body) });
    }
  } catch (err) {
    next(err);
  }
});

router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    const cart = await Carts.create({});
    console.log('caaaaaaaaaaaaaaaaaaaaaaaaaa', cart);
    cart.setUser(user.id);
    res.send({ token: await user.generateToken() });
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists');
    } else if (err.name === 'SequelizeValidationError') {
      res.status(401).send('All Fields Must Be Filled Out');
    } else {
      next(err);
    }
  }
});

router.get('/me', async (req, res, next) => {
  try {
    res.send(await User.findByToken(req.headers.authorization));
  } catch (ex) {
    next(ex);
  }
});
