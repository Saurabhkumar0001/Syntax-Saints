import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create the Internship context
const InternshipContext = createContext();

// Create a provider component to manage internship state
const InternshipProvider = ({ children }) => {
  const [internship, setInternship] = useState(null); // Store the internship data (reports, status, etc.)
  const [loading, setLoading] = useState(true); // Loading state while fetching internship data
  const [error, setError] = useState(null); // Error state for handling API errors
  const [reports, setReports] = useState([]); // Store the reports submitted by the intern

  // Fetch internship data for the logged-in user (if applicable)
  useEffect(() => {
    const fetchInternshipData = async () => {
      try {
        const response = await axios.get('/api/internship/current'); // API call to fetch internship details
        setInternship(response.data); // Store internship details in state
        setReports(response.data.reports || []); // Store reports if available
      } catch (err) {
        console.error('Error fetching internship data:', err);
        setError('Failed to fetch internship data');
      } finally {
        setLoading(false);
      }
    };

    fetchInternshipData();
  }, []);

  // Function to submit a new report for the internship
  const submitReport = async (reportData) => {
    try {
      const response = await axios.post('/api/internship/reports', reportData); // API call to submit a report
      setReports((prevReports) => [...prevReports, response.data]); // Add new report to the state
    } catch (err) {
      console.error('Error submitting report:', err);
      setError('Failed to submit report');
    }
  };

  // Function to update internship progress or status
  const updateInternshipStatus = async (statusData) => {
    try {
      const response = await axios.put('/api/internship/status', statusData); // API call to update internship status
      setInternship((prevInternship) => ({
        ...prevInternship,
        status: response.data.status, // Update the status in the state
      }));
    } catch (err) {
      console.error('Error updating internship status:', err);
      setError('Failed to update internship status');
    }
  };

  // Function to handle the submission of final industry mentor evaluation
  const submitIndustryMentorEvaluation = async (evaluationData) => {
    try {
      const response = await axios.post('/api/internship/mentor-evaluation', evaluationData);
      setInternship((prevInternship) => ({
        ...prevInternship,
        industryMentorEvaluation: response.data,
      }));
    } catch (err) {
      console.error('Error submitting mentor evaluation:', err);
      setError('Failed to submit mentor evaluation');
    }
  };

  // Provide context values to all children components
  return (
    <InternshipContext.Provider
      value={{
        internship,
        reports,
        loading,
        error,
        submitReport,
        updateInternshipStatus,
        submitIndustryMentorEvaluation,
      }}
    >
      {loading ? <div>Loading...</div> : children} {/* Render children once internship data is loaded */}
    </InternshipContext.Provider>
  );
};

// Custom hook to use internship context in other components
const useInternship = () => {
  return React.useContext(InternshipContext);
};

export { InternshipProvider, useInternship };
