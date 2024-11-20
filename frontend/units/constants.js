// API Endpoints
export const API_BASE_URL = 'https://your-api-url.com/api';
export const API_LOGIN_URL = `${API_BASE_URL}/auth/login`;
export const API_LOGOUT_URL = `${API_BASE_URL}/auth/logout`;
export const API_CURRENT_USER_URL = `${API_BASE_URL}/auth/current-user`;
export const API_INTERNSHIP_DETAILS_URL = `${API_BASE_URL}/internship/current`;
export const API_REPORTS_URL = `${API_BASE_URL}/internship/reports`;
export const API_MENTOR_EVALUATION_URL = `${API_BASE_URL}/internship/mentor-evaluation`;
export const API_LOCATION_URL = `${API_BASE_URL}/location`;

// Internship Statuses
export const INTERNSHIP_STATUS = {
  PENDING: 'Pending',
  IN_PROGRESS: 'In Progress',
  COMPLETED: 'Completed',
  CANCELLED: 'Cancelled',
};

// Internship Types
export const INTERNSHIP_TYPES = {
  FULL_TIME: 'Full-Time',
  PART_TIME: 'Part-Time',
};

// Roles in the System
export const ROLES = {
  STUDENT: 'Student',
  MENTOR: 'Mentor',
  COORDINATOR: 'Coordinator',
  ADMIN: 'Admin',
};

// Error Messages
export const ERROR_MESSAGES = {
  LOGIN_FAILED: 'Login failed. Please check your credentials and try again.',
  NETWORK_ERROR: 'There was an issue connecting to the network. Please try again.',
  REQUIRED_FIELD: 'This field is required.',
  REPORT_SUBMISSION_FAILED: 'Failed to submit the report. Please try again later.',
  FETCH_INTERNSHIP_FAILED: 'Failed to fetch internship details. Please try again later.',
  FETCH_USER_FAILED: 'Failed to fetch user details.',
};

// Success Messages
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Login successful. Redirecting to your dashboard...',
  REPORT_SUBMITTED: 'Your report has been successfully submitted.',
  INTERNSHIP_STATUS_UPDATED: 'Internship status updated successfully.',
  MENTOR_EVALUATION_SUBMITTED: 'Industry mentor evaluation has been submitted.',
};

// Validation Regex Patterns
export const VALIDATION_REGEX = {
  EMAIL: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, // Regex for validating email format
  PHONE: /^[0-9]{10}$/, // Regex for validating 10 digit phone number
};

// File Upload Constraints
export const FILE_UPLOAD = {
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB max file size for uploads
  ALLOWED_FILE_TYPES: ['application/pdf', 'image/jpeg', 'image/png'], // Allowed file types
};

// Report Frequencies
export const REPORT_FREQUENCIES = {
  FORTNIGHTLY: 'Every 15 days',
  MONTHLY: 'Every 30 days',
  FINAL_EVALUATION: 'End of internship',
};

// Status Codes for HTTP responses
export const HTTP_STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

