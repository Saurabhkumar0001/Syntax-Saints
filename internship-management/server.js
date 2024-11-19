// Import necessary dependencies
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const path = require('path');

// Import routes
const authRoutes = require('./routes/auth');
const coordinatorRoutes = require('./routes/coordinator');
const locationRoutes = require('./routes/location');
const mentorReportsRoutes = require('./routes/mentor-reports');
const reportRoutes = require('./routes/reports');

// Initialize the express app
const app = express();

// Load environment variables
dotenv.config();

// Middleware to parse incoming request bodies as JSON
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware for Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Set up static files (for frontend build if using in production)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'frontend', 'build')));

  // Serve the frontend build for any unmatched route
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  });
}

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('Error connecting to MongoDB', err);
    process.exit(1); // Stop the app if connection fails
  }
};

// Invoke the database connection
connectDB();

// Use Routes
app.use('/api/auth', authRoutes); // Authentication routes
app.use('/api/coordinator', coordinatorRoutes); // Coordinator routes
app.use('/api/location', locationRoutes); // Location tracking routes
app.use('/api/mentor-reports', mentorReportsRoutes); // Mentor report routes
app.use('/api/reports', reportRoutes); // Reports routes

// Error handling middleware (catch all errors)
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({ message });
});

// Define the port to listen on
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
