const mongoose = require('mongoose');

module.exports = mongoose.model ('User', {
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
});
