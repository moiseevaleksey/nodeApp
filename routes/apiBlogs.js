const express = require('express');
const { Blogs } = require('./../models/index');

const router = express.Router();

router.get('/',
  (req, res) => {
    Blogs.find({}, (err, blogs, next) => {
      if (err) {
        next(err);
      } else {
        res.json(blogs);
      }
    });
  });

router.get('/:id', (req, res, next) => {
  Blogs.findById(req.params.id, (err, blog) => {
    if (err) {
      return next(err);
    }
    res.json(blog);
  });
});

router.post('/', (req, res, next) => {
  Blogs.create(req.body, (err) => {
    if (err) {
      next(err);
    } else {
      res.sendStatus(200);
    }
  });
});

router.put('/:id', (req, res, next) => {
  Blogs.findOneAndUpdate({ _id: req.params.id }, req.body, { upsert: false }, (err) => {
    if (err) next(err);
    return res.sendStatus(200);
  });
});

router.delete('/:id', (req, res, next) => {
  Blogs.remove({ _id: req.params.id }, (err) => {
    (err) ? next(err) : res.sendStatus(200);
  });
});

module.exports = router;