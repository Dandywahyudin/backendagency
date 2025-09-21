const express = require('express');
const userRoutes = require('./src/routes/users');
const errorHandler = require('./src/middleware/errorHandler');

const app = express();

app.get('/', (req, res) => {
    res.send('hi there'); 
});

app.use(express.json());

app.use('/api/users', userRoutes);

app.use(errorHandler);

module.exports = app;