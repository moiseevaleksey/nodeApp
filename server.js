const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { CONFIG } = require('./data');
const routes = require('./routes');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).json({error: err.stack});
});
app.set('view engine', 'pug');
routes(app);

const startServer = () => {
  app.listen(CONFIG.port);
  console.log(`App started on port ${CONFIG.port}`);
};

const connectDb = () => {
  mongoose.connect('mongodb://localhost:27017/frontcamp');
  return mongoose.connection;
};

connectDb()
  .on('error', console.log)
  .on('disconnected', connectDb)
  .once('open', startServer);
