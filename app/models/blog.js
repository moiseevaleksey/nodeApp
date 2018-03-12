const mongoose = require('mongoose');

const BlogSchema = mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  body: { type: String, required: true },
  date: {type: String, required: true}
});

const Blog = mongoose.model('Blog', BlogSchema);

module.exports = Blog;