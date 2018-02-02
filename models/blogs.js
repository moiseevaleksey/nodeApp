const mongoose = require('mongoose');
const { Schema } = mongoose;

const blogsSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  }
});

const Blogs = mongoose.model('Blogs', blogsSchema);

module.exports = Blogs;