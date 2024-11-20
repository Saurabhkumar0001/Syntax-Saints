import React, { useState, useEffect } from 'react';
import axios from 'axios'; // For API calls (if needed for fetching and submitting data)

const ReportCard = ({ user }) => {
  const [reports, setReports] = useState([]); // List of reports (either submitted or needing submission)
  const [newReport, setNewReport] = useState(''); // For intern to type in a new report
  const [feedback, setFeedback] = useState(''); // For mentor to add feedback to report
  const [isSubmitting, setIsSubmitting] = useState(false); // For managing the report submission loading state

  // Fetching reports (intern/mentor specific reports)
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/reports/${user.role}/${user.id}`);
        setReports(response.data);
      } catch (err) {
        console.error('Error fetching reports', err);
      }
    };

    if (user) {
      fetchReports();
    }
  }, [user]);

  // Handle report submission for Intern
  const handleReportSubmit = async (e) => {
    e.preventDefault();
    if (newReport.trim() === '') {
      alert('Please enter a report before submitting!');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await axios.post('http://localhost:5000/api/reports/submit', {
        internId: user.id,
        reportContent: newReport,
        type: 'fortnightly', // Example: report type can be dynamic
      });
      setReports([...reports, response.data]); // Update the list of reports with the new one
      setNewReport(''); // Clear the input
      alert('Report submitted successfully!');
    } catch (err) {
      console.error('Error submitting report', err);
      alert('Failed to submit report. Try again later.');
    }
    setIsSubmitting(false);
  };

  // Handle mentor feedback submission
  const handleFeedbackSubmit = async (reportId) => {
    if (feedback.trim() === '') {
      alert('Please enter feedback before submitting!');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/reports/feedback', {
        reportId,
        mentorId: user.id,
        feedback,
      });
      const updatedReports = reports.map(report => 
        report.id === reportId ? { ...report, feedback: response.data.feedback } : report
      );
      setReports(updatedReports);
      setFeedback('');
      alert('Feedback submitted successfully!');
    } catch (err) {
      console.error('Error submitting feedback', err);
      alert('Failed to submit feedback. Try again later.');
    }
  };

  return (
    <div className="report-card">
      <h2>{user.role === 'intern' ? 'Intern Reports' : 'Mentor Feedback'}</h2>
      
      {/* Report submission form for Intern */}
      {user.role === 'intern' && (
        <div className="report-submit">
          <h3>Submit New Report</h3>
          <textarea
            value={newReport}
            onChange={(e) => setNewReport(e.target.value)}
            placeholder="Write your report here..."
            rows="6"
            cols="50"
          />
          <button onClick={handleReportSubmit} disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit Report'}
          </button>
        </div>
      )}

      {/* List of Reports or Feedbacks */}
      <div className="report-list">
        <h3>All Reports</h3>
        {reports.length === 0 ? (
          <p>No reports available.</p>
        ) : (
          <ul>
            {reports.map(report => (
              <li key={report.id} className="report-item">
                <p><strong>Report Type:</strong> {report.type}</p>
                <p><strong>Status:</strong> {report.status}</p>
                <p><strong>Submitted on:</strong> {new Date(report.submissionDate).toLocaleDateString()}</p>
                
                {/* For Interns: Show mentor feedback */}
                {user.role === 'intern' && report.feedback && (
                  <div className="feedback">
                    <h4>Feedback from Mentor</h4>
                    <p>{report.feedback}</p>
                  </div>
                )}
                
                {/* For Mentors: Show input for feedback if not provided yet */}
                {user.role === 'mentor' && !report.feedback && (
                  <div className="feedback-input">
                    <textarea
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      placeholder="Provide feedback for this report..."
                      rows="4"
                      cols="50"
                    />
                    <button onClick={() => handleFeedbackSubmit(report.id)}>
                      Submit Feedback
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ReportCard;
