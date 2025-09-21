const errorHandler = (err, req, res, next) => {
  // Log error
  console.error(err);

  // Default error
  let statusCode = 500;
  let message = 'Internal Server Error';

  if (err.message === 'User already exists') {
    statusCode = 409;
    message = err.message;
  }

  res.status(statusCode).json({ error: message });
};

module.exports = errorHandler;