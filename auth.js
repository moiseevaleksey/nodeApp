const passport = require('passport');
const { Strategy } = require('passport-local');
const { User } = require('./models');

passport.use(new Strategy(
  (username, password, cb) => {
    User.findOne({ 'username': username }, (err, user) => {
      if (err) {
        return cb(err);
      }
      if (!user) {
        return cb(null, false);
      }
      if (user.password !== password) {
        return cb(null, false);
      }
      return cb(null, user);
    });
  }));

passport.serializeUser(function (user, cb) {
  cb(null, user._id);
});

passport.deserializeUser(function (id, cb) {
  User.findById(id, (err, user) => {
    if (err) {
      return cb(err);
    }
    cb(null, user);
  });
});

module.exports = passport;