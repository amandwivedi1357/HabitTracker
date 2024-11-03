const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const habitRoutes = require('./routes/habitRoutes');
const { connection } = require('./config/db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
const corsOptions = {
    origin: ['https://habit-tracker-blush.vercel.app', 'http://localhost:5173'], 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    credentials: true 
};
app.use(cors(corsOptions));

// Routes
app.use('/api/auth/', userRoutes);
 app.use('/api/habits', habitRoutes);


 app.get('/', (req, res) => {
    res.send('Welcome to the Habit Tracker Backend!');
});
// MongoDB connection


app.listen(PORT, async() => {
    try {
        await connection;
        console.log(`connected to MongoDB atlas`)
    } catch (error) {
        console.log(error)
    }
  console.log(`Server running on port ${PORT}`);
});