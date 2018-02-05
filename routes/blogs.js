const express = require('express');
const { Blogs } = require('./../models/index');
const router = express.Router();

router.get('/',
  (req, res) => {
  Blogs.find({}, (err, blogs, next) => {
    if (err) {
     next(err);
    } else {
      res.render('blogs', { blogs: blogs });
    }
  });
});

module.exports = router;