const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Import your user model

// Secret key for JWT signing, usually stored in an environment variable for security
const JWT_SECRET = process.env.JWT_SECRET || 'your-jwt-secret-key'; 

// Function to register a new user
const registerUser = async (userData) => {
  try {
    // Destructure user data from the input
    const { email, password, firstName, lastName } = userData;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error('User already exists with this email');
    }

    // Hash the password before saving it to the database
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new User({
      email,
      password: hashedPassword,
      firstName,
      lastName,
    });

    // Save the user to the database
    await newUser.save();
    
    return { message: 'User registered successfully' };
  } catch (error) {
    throw new Error(`Registration failed: ${error.message}`);
  }
};

// Function to login a user and return a JWT token
const loginUser = async (email, password) => {
  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('Invalid email or password');
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid email or password');
    }

    // Generate a JWT token for the user (with an expiration time of 1 hour)
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    return { token, userId: user._id, message: 'Login successful' };
  } catch (error) {
    throw new Error(`Login failed: ${error.message}`);
  }
};

// Function to verify and decode JWT token
const verifyToken = (token) => {
  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded; // Returns the decoded payload (userId and email)
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};

// Function to get user details based on their userId
const getUserById = async (userId) => {
  try {
    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    // Return user details excluding password
    const { password, ...userDetails } = user.toObject();
    return userDetails;
  } catch (error) {
    throw new Error(`User fetch failed: ${error.message}`);
  }
};

module.exports = {
  registerUser,
  loginUser,
  verifyToken,
  getUserById,
};
