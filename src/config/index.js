require('dotenv').config();

module.exports = {
  app: {
    port: process.env.PORT || 3000,
    env: process.env.NODE_ENV || 'development'
  },
  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials: true
  },
  // Database configuration (uncomment jika menggunakan database)
  // database: {
  //   host: process.env.DB_HOST || 'localhost',
  //   port: process.env.DB_PORT || 27017,
  //   name: process.env.DB_NAME || 'backendagency'
  // },
  // jwt: {
  //   secret: process.env.JWT_SECRET || 'fallback-secret-key'
  // }
};
