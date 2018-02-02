const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  name: String,
  role: String,
});

// userSchema.statics.findUserByName = function (cb) {
//   return this.find({}, cb);
// };

const User = mongoose.model('User', userSchema);

module.exports = User;
