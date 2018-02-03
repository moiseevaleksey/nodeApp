const mongoose = require('mongoose');
const { Schema } = mongoose;

const usersSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  }
});

const User = mongoose.model('User', usersSchema);

module.exports = User;
