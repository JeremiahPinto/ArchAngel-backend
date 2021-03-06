const mongoose = require('mongoose');

module.exports = (app) => {
  mongoose.connect(app.get('mongodb'), { useNewUrlParser: true });
  mongoose.set('useCreateIndex', true);
  mongoose.Promise = global.Promise;

  app.set('mongooseClient', mongoose);
};
