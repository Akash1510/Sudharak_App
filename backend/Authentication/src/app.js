
const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
const ConnectDB = require('./config/db');
ConnectDB()
// Routes

const citizenRoutes = require('./routes/citizen.routes');
const adminRoutes = require('./routes/admin.routes');



// Middleware

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));


// Health Check

app.get('/', (req, res) => {
    res.status(200).json({
        STATUS: "Success",
        SERVICE: "Authentication Service is up and running",
        MESSAGE: "Server is Running"
    })
});

// Route

app.use('/api/citizens', citizenRoutes);
app.use('/api/admins', adminRoutes);

// 404 handler

app.use((req, res) => {
    res.status(404).json({
        STATUS: "Failed",
        MESSAGE: "Route Not Found"
    })
});

// global Error Handler

app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(500).json({
        STATUS: "Failed",
        MESSAGE: "Something went wrong",
        ERROR: err.message
    })
});

// server

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
    console.log(`Authentication Service is running on port ${PORT}`);
    // connect to database

})