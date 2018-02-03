const express = require('express');
const { Blogs } = require('./../models/index');
const router = express.Router();

router.get('/', (req, res) => {
  Blogs.find({}, (err, blogs) => {
    console.log(err, blogs);
    res.send(blogs);
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

router.post('/', (req, res) => {
  Blogs.create(req.body, (err) => {
    console.log(err);
    res.sendStatus(200);
  });
});

router.put('/:id', (req, res) => {
  Blogs.findOneAndUpdate({ _id: req.params.id }, req.body, { upsert: false }, (err) => {
    if (err) return res.send(err);
    return res.sendStatus(200);
  });
});

router.delete('/:id', (req, res) => {
  Blogs.remove({ _id: req.params.id }, (err) => {
    (err) ? res.send(err) : res.sendStatus(200);
  });
});

module.exports = router;