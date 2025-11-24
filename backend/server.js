const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/db');
const auth = require('./routes/auth');
const courses = require('./routes/courses');
const writing = require('./routes/writing');

const app = express();

// Kết nối DB
connectDB();

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', auth);
app.use('/api/courses', courses);
app.use('/api/writing', writing);

// Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server chạy trên port ${PORT}`));
