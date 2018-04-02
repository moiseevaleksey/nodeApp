const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('./config/passport');
const validator = require('express-validator');
const cors = require('cors');

const blogRouter = require('./routes/blogs');
const usersRouter = require('./routes/users');

const winston = require('winston');
const { combine, timestamp, printf } = winston.format;

mongoose.connect(`mongodb://localhost:27017/frontcamp`);

const db = mongoose.connection;
db.on('error', () => console.error('connection error:'));

const myFormat = printf(info => `${info.timestamp}: ${info.message}`);

const logger = winston.createLogger({
  level: 'info',
  format: combine(
    timestamp(),
    myFormat,
  ),
  transports: [
    new winston.transports.File({ filename: 'general.log' }),
  ]
});

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({ secret: 'magic' }));
app.use(validator());

app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.urlencoded({
  extended: true,
}));

app.use((req, res, next) => {
  logger.info(req.method + ' ' + req.url);
  next();
});

const checkAuth = (req, res, next) => req.isAuthenticated()
  ? next()
  : res.status(401).end('Unauthorized');

app.options('*', cors({
  origin: true,
  credentials: true,
}));
app.use(cors({
  origin: true,
  credentials: true,
}));
app.use('/blogs', blogRouter);
app.use('/users', usersRouter);

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json(err);
});

app.listen(3000, () => console.log('Listening on port 3000'));

module.exports = app;
