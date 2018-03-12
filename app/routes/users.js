const express = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/user');
const passport = require('../config/passport');

const router = express.Router();

router.get('/logged', (req, res) => {
  req.isAuthenticated()
    ? res.status(200).json(req.user)
    : res.status(200).json(null);
});

router.post('/login', passport.authenticate('local', {
    successRedirect: false,
    failureRedirect: false,
    failureFlash: false,
  }),
  (req, res) => {
    res.status(200).json(req.user);
  }
);

router.get('/logout', function (req, res) {
  req.logout();
  res.status(200).json({});
});

router.get('/', (req, res, next) => {
  User.find()
    .then(users => res.status(200).json(users))
    .catch(err => next(err));
});

router.get('/:id', (req, res, next) => {
  User.findById(req.params.id)
    .then(user => res.status(200).json(user))
    .catch(err => next(err));
});

router.delete('/:id', (req, res, next) => {
  User.findByIdAndRemove(req.params.id)
    .then(() => res.status(200).send({ message: 'User successfully removed' }))
    .catch(err => next(err));
});

router.post('/', (req, res, next) => {
  req.checkBody('username', 'Username is required').notEmpty();
  req.checkBody('password', 'Password is required').notEmpty();
  req.checkBody('password', 'Password must be from 5 to 15 chars and contain one number').len({
    min: 5,
    max: 15
  }).matches(/\d/);
  req.checkBody('email', 'Email is required').notEmpty();
  req.checkBody('email', 'Wrong email format').isEmail();
  req.checkBody('name', 'Name is required').notEmpty();

  const err = req.validationErrors();

  if (err) next(err);

  const { name, email, username, password, isAdmin } = req.body;
  const newUser = new User({
    name,
    email,
    username,
    password,
    isAdmin
  });
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(newUser.password, salt, function (err, hash) {
      newUser.password = hash;
      newUser.save()
        .then(() => res.status(200).json(newUser))
        .catch((err) => next(err))
    });
  });
});

module.exports = router;
