const createError = require('http-errors');

// 404 handler
const notFound = (req, res, next) => {
  next(createError(404, `Route ${req.originalUrl} not found`));
};

// Global error handler
const errorHandler = (err, req, res, next) => {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Log error in development
  if (req.app.get('env') === 'development') {
    console.error(err.stack);
  }

  // Render error page or send JSON response
  res.status(err.status || 500);
  
  // Check if request accepts JSON
  if (req.accepts('json')) {
    res.json({
      error: {
        message: err.message,
        status: err.status || 500,
        ...(req.app.get('env') === 'development' && { stack: err.stack })
      }
    });
  } else {
    res.render('error');
  }
};

module.exports = {
  notFound,
  errorHandler
};
