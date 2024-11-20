// Import dotenv to load environment variables from a .env file
require('dotenv').config();

// Configuration object
const config = {
  // Application settings
  app: {
    port: process.env.PORT || 5000, // Server port (default is 5000 if not specified)
    env: process.env.NODE_ENV || 'development', // Application environment (development, production, etc.)
    appName: 'Internship Management System',
  },

  // Database configuration (MongoDB in this case)
  db: {
    uri: process.env.DB_URI || 'mongodb://localhost:27017/internship_management', // MongoDB connection URI
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },

  // JWT Authentication settings
  jwt: {
    secretKey: process.env.JWT_SECRET_KEY || 'your-secret-key', // JWT secret key (used to sign JWT tokens)
    expiresIn: process.env.JWT_EXPIRES_IN || '1h', // Token expiry time (default is 1 hour)
  },

  // API Keys or External Services configuration
  externalApis: {
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY || 'your-google-maps-api-key', // For location-based features
    sendGridApiKey: process.env.SENDGRID_API_KEY || 'your-sendgrid-api-key', // For sending emails (if using SendGrid)
  },

  // Email service settings (for notifications, reminders, etc.)
  emailService: {
    smtpHost: process.env.SMTP_HOST || 'smtp.example.com',
    smtpPort: process.env.SMTP_PORT || 587, // Default SMTP port
    smtpUser: process.env.SMTP_USER || 'your-smtp-user',
    smtpPass: process.env.SMTP_PASS || 'your-smtp-password',
    fromEmail: process.env.EMAIL_FROM || 'no-reply@example.com',
  },

  // Server logging configuration
  logging: {
    level: process.env.LOG_LEVEL || 'info', // Log level: 'debug', 'info', 'warn', 'error'
    logToFile: process.env.LOG_TO_FILE || false, // If logs should be written to a file
    logFilePath: process.env.LOG_FILE_PATH || './logs/server.log', // Path to log file (if enabled)
  },

  // Session Configuration (for user sessions)
  session: {
    secret: process.env.SESSION_SECRET || 'your-session-secret', // Secret for signing session ID cookie
    resave: false, // Whether to save the session even if it was not modified
    saveUninitialized: false, // Whether to save uninitialized sessions
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week expiration for the session cookie
    },
  },

  // File Upload Configuration (for reports, documents)
  fileUpload: {
    maxFileSize: process.env.MAX_FILE_SIZE || 5 * 1024 * 1024, // Max file size in bytes (default: 5MB)
    allowedFileTypes: ['application/pdf', 'image/jpeg', 'image/png'], // Allowed file types for reports and documents
  },

  // CORS Configuration (for handling cross-origin requests)
  cors: {
    allowedOrigins: process.env.CORS_ALLOWED_ORIGINS || ['http://localhost:3000'], // Allow these origins to make requests
  },
};

module.exports = config;
