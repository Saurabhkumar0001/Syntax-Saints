const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');

// Load environment variables
dotenv.config();

// Initialize the app
const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('MongoDB connection error: ', err));

// Use the authentication routes
app.use('/api/auth', authRoutes);

// Example of protected route
app.get('/api/protected', authenticateJWT, (req, res) => {
  res.status(200).json({ message: 'This is a protected route', user: req.user });
});

// Home route
app.get('/', (req, res) => {
  res.send('Internship Management API');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
