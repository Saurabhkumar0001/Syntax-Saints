import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // Import global styles
import App from './App'; // Main app component
import { BrowserRouter as Router } from 'react-router-dom'; // React Router for managing routing
import { AuthProvider } from './context/authContext'; // Context provider for auth state
import { InternshipProvider } from './context/internshipContext'; // Context provider for internship data
import { ReportProvider } from './context/reportContext'; // Context provider for report data
import { LocationProvider } from './context/locationContext'; // Context provider for location updates
import { Toaster } from 'react-hot-toast'; // Optional: For toast notifications

// Wrap the App component with necessary context providers and React Router
ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <InternshipProvider>
          <ReportProvider>
            <LocationProvider>
              <Toaster /> {/* Toast notifications */}
              <App />
            </LocationProvider>
          </ReportProvider>
        </InternshipProvider>
      </AuthProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root') // Render the app inside the root div
);
