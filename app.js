const express = require('express');
const userRoutes = require('./src/routes/users');
const packagesRoutes = require('./src/routes/packages');
const errorHandler = require('./src/middleware/errorHandler');
const path = require('path');
const cors = require('cors');


const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.get('/', (req, res) => {
    res.send('hi there'); 
});

app.use('/uploads', express.static(path.join(__dirname, 'src/uploads')));

app.use(express.json());

app.use('/api', userRoutes);
app.use('/api/packages', packagesRoutes);




app.use(errorHandler);



module.exports = app;