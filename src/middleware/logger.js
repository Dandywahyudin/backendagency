const morgan = require('morgan');
const config = require('../config');

const logger = () => {
  if (config.app.env === 'development') {
    return morgan('dev');
  }
  return morgan('combined');
};

module.exports = logger;
