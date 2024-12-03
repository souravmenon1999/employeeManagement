import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import db_config from './config/db_config.js';
import authRoutes from './routes/authRoutes.js';
import employeeRoutes from './routes/employeeRoutes.js';
import session from 'express-session';
import { sessionMid } from './authentication.js';
import multer from 'multer';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';



// Load environment variables
dotenv.config();

// Initialize the Express app
const app = express();
app.use(cors({
  origin: 'http://localhost:3000', // Replace with the URL of your frontend application
  credentials: true // Allow credentials (cookies)
}));


// Middleware
app.use(express.json()); // Parse JSON bodies
 // Enable CORS
app.use(sessionMid);
app.use(cookieParser());
app.use(morgan('dev'));
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Connect to the database
db_config();

// Routes
app.use('/api/auth', authRoutes); // Authentication routes
app.use('/api/employees', employeeRoutes); // Employee routes



// Start the server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

export default app;
