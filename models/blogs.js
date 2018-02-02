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

blogsSchema.statics.getAllBlogs = function (cb) {
  return this.find({}, cb);
};

blogsSchema.statics.getBlogById = function (id, cb) {
  return this.findOne({ _id: id }, cb);
};

blogsSchema.statics.createBlog = function (blogToSave, cb) {
  Blogs.create(blogToSave, (err) => {
    cb(err);
  })
};

blogsSchema.statics.updateBlog = function (id, newBlog, cb) {
  const query = { _id: id };
  const blog = new Blogs(newBlog);
  const error = blog.validateSync();

  Blogs.findOneAndUpdate(query, newBlog, { upsert: true }, function (err) {
    cb(err);
  });
};

const Blogs = mongoose.model('Blogs', blogsSchema);

module.exports = Blogs;