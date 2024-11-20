import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const InternshipDetails = () => {
  const { internId } = useParams(); // Get the intern's ID from the URL parameter
  const navigate = useNavigate();
  const [intern, setIntern] = useState(null);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');
  const [evaluation, setEvaluation] = useState('');

  // Fetch intern details on component mount
  useEffect(() => {
    const fetchInternDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/interns/${internId}`);
        setIntern(response.data);
      } catch (err) {
        setError('Failed to fetch intern details.');
      }
    };

    fetchInternDetails();
  }, [internId]);

  // Handle status update
  const handleStatusUpdate = async (status) => {
    try {
      await axios.post(`http://localhost:5000/api/interns/${internId}/status`, { status });
      alert('Internship status updated.');
      setIntern((prevState) => ({
        ...prevState,
        status
      }));
    } catch (err) {
      setError('Failed to update internship status.');
    }
  };

  // Handle report submission status change
  const handleReportStatus = async (reportId, status) => {
    try {
      await axios.post(`http://localhost:5000/api/reports/${reportId}/status`, { status });
      alert('Report status updated.');
      setIntern((prevState) => ({
        ...prevState,
        reports: prevState.reports.map(report =>
          report._id === reportId ? { ...report, status } : report
        ),
      }));
    } catch (err) {
      setError('Failed to update report status.');
    }
  };

  // Handle final evaluation of internship
  const handleEvaluationSubmit = async () => {
    try {
      await axios.post(`http://localhost:5000/api/interns/${internId}/evaluation`, { evaluation });
      alert('Evaluation submitted successfully.');
    } catch (err) {
      setError('Failed to submit evaluation.');
    }
  };

  // Loading Spinner or Error
  if (!intern) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Internship Details</h1>
      
      {/* Display Error */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      <div>
        <h2>{intern.name} - Internship Details</h2>
        <p><strong>Company Name:</strong> {intern.companyName}</p>
        <p><strong>Company Address:</strong> {intern.companyAddress}</p>
        <p><strong>Start Date:</strong> {new Date(intern.startDate).toLocaleDateString()}</p>
        <p><strong>External Mentor:</strong> {intern.externalMentorName}</p>
        <p><strong>Stipend Amount:</strong> {intern.stipendAmount}</p>
        <p><strong>Internship Status:</strong> {intern.status}</p>

        {/* Status Update */}
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">Select Status</option>
          <option value="Verified">Verified</option>
          <option value="Pending">Pending</option>
          <option value="Cancelled">Cancelled</option>
        </select>
        <button onClick={() => handleStatusUpdate(status)}>Update Status</button>
      </div>

      <div>
        <h3>Reports Submitted</h3>
        {intern.reports && intern.reports.length > 0 ? (
          <ul>
            {intern.reports.map((report) => (
              <li key={report._id}>
                <strong>{report.reportType}</strong>: {new Date(report.reportDate).toLocaleDateString()}
                <p>Status: {report.status}</p>
                <button onClick={() => handleReportStatus(report._id, 'Verified')}>Verify Report</button>
                <button onClick={() => handleReportStatus(report._id, 'Pending')}>Mark Pending</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No reports submitted</p>
        )}
      </div>

      <div>
        <h3>Final Evaluation</h3>
        <textarea
          value={evaluation}
          onChange={(e) => setEvaluation(e.target.value)}
          rows="4"
          cols="50"
          placeholder="Provide final evaluation for the intern"
        />
        <button onClick={handleEvaluationSubmit}>Submit Evaluation</button>
      </div>
      
      <button onClick={() => navigate('/coordinator')}>Back to Coordinator Dashboard</button>
    </div>
  );
};

export default InternshipDetails;
