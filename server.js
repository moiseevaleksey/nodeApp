const express = require('express');
const passport = require('./auth');
const mongoose = require('mongoose');
const morgan = require('morgan')('combined');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressSessions = require('express-session');
const { auth, blogs, apiBlogs } = require('./routes');
const connectEnsureLogin = require('connect-ensure-login');
const app = express();
const { config } = require('./config');

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(morgan);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSessions({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', auth);
app.use('/api/blogs', apiBlogs);
app.use(connectEnsureLogin.ensureLoggedIn());
app.use('/blogs', blogs);

// error handling
app.use((err, req, res, next) => {
  const isNotFound = err.message.indexOf('not found');
  const isCastError = err.message.indexOf('Cast to ObjectId failed');

  if (err.message || (isNotFound && isCastError)) {
    return next(err);
  }
  res.status(500).json({ error: err.stack });
});

app.use((err, req, res, next) => {
  res.sendStatus(404);
});

const startServer = () => {
  app.listen(config.port);
  console.log(`App started on port ${config.port}`);
};

const connectDb = () => {
  mongoose.connect('mongodb://localhost:27017/frontcamp');
  return mongoose.connection;
};

connectDb()
  .on('error', console.log)
  .on('disconnected', connectDb)
  .once('open', startServer);

module.exports = connectDb;
