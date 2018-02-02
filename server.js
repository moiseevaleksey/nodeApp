const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { CONFIG } = require('./data');
const { Users, Blogs } = require('./models');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'pug');

const startServer = () => {
  app.listen(CONFIG.port);
  console.log(`App started on port ${CONFIG.port}`);
};

const connectDb = () => {
  mongoose.connect('mongodb://localhost:27017/frontcamp');
  return mongoose.connection;
};

connectDb()
  .on('error', console.log)
  .on('disconnected', connectDb)
  .once('open', startServer);

app.get('/blogs', (req, res) => {
  Blogs.getAllBlogs((err, blogs) => {
    res.send(blogs);
  });
});

app.get('/blogs/:id', (req, res) => {
  const requestedId = req.params.id;
  Blogs.getBlogById(requestedId, (err, blog) => {
    if (blog) {
      res.send(blog);
    } else {
      res.sendStatus(404);
    }
  });
});

app.post('/blogs', (req, res) => {
  const blog = req.body;

  Blogs.createBlog(blog, (err) => {
    if (err) {
      res.send(err.message)
    } else {
      res.sendStatus(200);
    }
  });
});