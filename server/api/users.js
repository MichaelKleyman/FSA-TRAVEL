const router = require('express').Router()
const { models: { User }} = require('../db')
module.exports = router

//prepened with /users

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'username']
    })
    console.log("in get");
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:username', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.params.username
      }
    })
    res.send(user);
  }
  catch (e) {
    next(e);
  }
})

router.post('/', async (req, res, next) => {
  try {
    const newUser = User.create({
      //creating a new user to the database, I am assuming the body sent will be the same as the database fields
      username : req.body.username,
      password : req.body.password,
      firstName : req.body.firstName,
      lastName : req.body.lastName,
      email : req.body.email,
      phone : req.body.phone,
    })
    res.status(200).send(newUser);
  } catch (err) {
    next(err);
  }
})
