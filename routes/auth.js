const express = require('express');
const router = express.Router();
const passport = require('../auth');
const { User }= require('../models');

router.get('/',
  function (req, res) {
    res.render('home', { user: req.user });
  });

router.get('/login',
  function (req, res) {
    res.render('login');
  });

router.get('/reg',
  function (req, res) {
    res.render('registration');
  });

router.post('/reg',
  function (req, res) {
    console.log(req.body);
    User.create({ username: req.body.username, password: req.body.password }, function (err, small) {
      if (err) return console.log(err);
      res.redirect('/login');
    })
  });

router.post('/login',
  passport.authenticate('local', { failureRedirect: '/login' }),
  function (req, res) {
    res.redirect('/');
  });

router.get('/logout',
  function (req, res) {
    req.logout();
    res.redirect('/');
  });

router.get('/profile',
  require('connect-ensure-login').ensureLoggedIn(),
  function (req, res) {
    res.render('profile', { user: req.user });
  });

module.exports = router;