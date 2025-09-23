const express = require('express');
const userRoutes = require('./src/routes/users');
const packagesRoutes = require('./src/routes/packages');
const errorHandler = require('./src/middleware/errorHandler');
const path = require('path');

const app = express();

app.get('/', (req, res) => {
    res.send('hi there'); 
});

app.use(express.json());

app.use('/api', userRoutes);
app.use('/api/packages', packagesRoutes);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(errorHandler);

module.exports = app;