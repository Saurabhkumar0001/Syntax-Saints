// Required for setting up Enzyme (if you're using it for React testing)
import '@testing-library/jest-dom'; // For convenient DOM assertions
import { server } from './mocks/server'; // Mock service worker (if using MSW for API mocking)

// Global setup for tests using React Testing Library or Enzyme

// Setup mock API server (for mocking API calls in tests)
beforeAll(() => {
  // Start the mock service worker before tests are run
  server.listen();
});

// Reset any runtime requests handlers that may have been added during the tests
afterEach(() => {
  server.resetHandlers();
});

// Clean up after tests are finished to ensure no memory leaks
afterAll(() => {
  // Close the mock service worker server when all tests are done
  server.close();
});

// Optional: Global setup for any custom mock or configurations needed across tests
// Example: You can configure the test environment to handle mock responses, etc.

