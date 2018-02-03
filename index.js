const app = require('./server');
const mongoose = require ('mongoose');
const { config } = require ('./data');

const startServer = () => {
  app.listen (config.port);
  console.log (`App started on port ${config.port}`);
};

const connectDb = () => {
  mongoose.connect ('mongodb://localhost:27017/frontcamp');
  return mongoose.connection;
};

connectDb ()
  .on ('error', console.log)
  .on ('disconnected', connectDb)
  .once ('open', startServer);