const express = require('express');
const blogRouter = express.Router();

const Blog = require('../models/blog');

blogRouter.get('/', (req, res, next) => {
  const { id, page } = req.query;
  if (id) {
    return Blog.findById(id)
    .then(blog => res.status(200).json(blog))
    .catch(err => next(err));
  }
  if (page) {
    return Blog.find({}, null, {limit: page * 10, skip: (page - 1) * 10})
    .then(blogs => res.status(200).json(blogs))
    .catch(err => next(err));
  }
  Blog.find()
  .then(blogs => res.status(200).json(blogs))
  .catch(err => next(err));
});

blogRouter.post('/', (req, res, next) => {
  const blog = {
    title: req.body.title || '',
    author: req.body.author || '',
    body: req.body.body || '',
    date: req.body.date,
  };
  const newBlog = new Blog(blog);
  newBlog.save()
  .then(() => res.status(200).send({ message: 'Blog created successfully' }))
  .catch((err) => next(err));
});


blogRouter.put('/:id', (req, res, next) => {
  const newBlogData = req.body;
  Blog.findById(req.params.id)
  .then(blog => Object.assign(blog, newBlogData))
  .then(blog => blog.save())
  .then(() => res.status(200).send({ message: 'Document updated successfully' }))
  .catch(err => next(err));
});

blogRouter.delete('/:id', (req, res, next) => {
  Blog.findByIdAndRemove(req.params.id)
  .then(() => res.status(200).send({ message: 'Blog successfully removed' }))
  .catch(err => next(err));
});

module.exports = blogRouter;
