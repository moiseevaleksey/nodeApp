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

blogsSchema.statics.updateBlog = function (id, newBlog,  cb) {
  console.log(id);
  console.log(newBlog);
  Blogs.update({ _id: id }, { $set: { title: newBlog.title, text: newBlog.text }}, cb);
};


const Blogs = mongoose.model('Blogs', blogsSchema);

module.exports = Blogs;