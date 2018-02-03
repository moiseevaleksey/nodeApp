const express = require ('express');
const bodyParser = require ('body-parser');
const { blogs } = require('./routes');

const app = express ();

app.use (bodyParser.json ());
app.use (bodyParser.urlencoded ({extended: true}));
app.use('/blogs', blogs);
app.set ('view engine', 'pug');

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

module.exports = app;
