const mongoose = require('mongoose');
const config = require('./config');

// Function to connect to the MongoDB database
const connectDB = async () => {
  try {
    // MongoDB connection URI from config.js (process.env.DB_URI or fallback to local DB)
    const dbURI = config.db.uri;
    
    // Connect to MongoDB using Mongoose
    await mongoose.connect(dbURI, config.db.options);
    
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err.message);
    process.exit(1); // Exit the process with failure if the DB connection fails
  }
};

// Export the connection function
module.exports = connectDB;
