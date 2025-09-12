const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

// Import configurations and middleware
const config = require('./src/config');
const logger = require('./src/middleware/logger');
const { notFound, errorHandler } = require('./src/middleware/errorHandler');

// Import routes
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Middleware setup
app.use(logger());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: false, limit: '10mb' }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// CORS middleware (uncomment if needed)
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', config.cors.origin);
//   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
//   res.header('Access-Control-Allow-Credentials', config.cors.credentials);
//   if (req.method === 'OPTIONS') {
//     res.sendStatus(200);
//   } else {
//     next();
//   }
// });

// Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);

// 404 handler
app.use(notFound);

// Global error handler
app.use(errorHandler);

module.exports = app;
