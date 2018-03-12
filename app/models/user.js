const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    index: true,
    unique: true
  },
  password: String,
  email: String,
  name: String,
  isAdmin: Boolean,
});

const User = mongoose.model('User', UserSchema);

module.exports = User;