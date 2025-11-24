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
app.use(cors({
  origin: process.env.FRONTEND_URL || '*'  // chỉ định URL frontend
}));

// Routes
app.use('/api/auth', auth);
app.use('/api/courses', courses);
app.use('/api/writing', writing);

// Port (Vercel sẽ tự set process.env.PORT)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server chạy trên port ${PORT}`));
