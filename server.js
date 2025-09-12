const app = require('./app');
const config = require('./src/config');

const port = config.app.port;

const server = app.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
  console.log(`📍 Environment: ${config.app.env}`);
  console.log(`🌐 Local: http://localhost:${port}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('👋 SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('💻 HTTP server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('👋 SIGINT signal received: closing HTTP server');
  server.close(() => {
    console.log('💻 HTTP server closed');
    process.exit(0);
  });
});

module.exports = server;
