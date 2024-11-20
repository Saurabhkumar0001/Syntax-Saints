import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const Report = () => {
  const { internId } = useParams();  // Get internId from the URL params
  const [reportContent, setReportContent] = useState('');
  const [reportType, setReportType] = useState('Fortnightly');  // Default to "Fortnightly"
  const [error, setError] = useState('');
  const [reports, setReports] = useState([]);
  const navigate = useNavigate();

  // Fetch existing reports for this intern
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/reports/${internId}`);
        setReports(response.data);
      } catch (err) {
        console.log(err);
        setError('Failed to fetch reports');
      }
    };

    fetchReports();
  }, [internId]);

  // Submit report
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:5000/api/reports', {
        internId,
        reportContent,
        reportType,
      });
      setReportContent('');  // Reset form
      setReportType('Fortnightly');
      alert('Report submitted successfully!');
    } catch (err) {
      console.log(err);
      setError('Failed to submit report');
    }
  };

  // Delete report
  const handleDelete = async (reportId) => {
    try {
      await axios.delete(`http://localhost:5000/api/reports/${reportId}`);
      setReports(reports.filter((report) => report._id !== reportId));
      alert('Report deleted successfully');
    } catch (err) {
      console.log(err);
      setError('Failed to delete report');
    }
  };

  return (
    <div>
      <h1>Intern Report</h1>

      {/* Report Submission Form */}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Report Type</label>
          <select value={reportType} onChange={(e) => setReportType(e.target.value)}>
            <option value="Fortnightly">Fortnightly</option>
            <option value="Assignment">Assignment</option>
          </select>
        </div>

        <div>
          <label>Report Content</label>
          <textarea
            value={reportContent}
            onChange={(e) => setReportContent(e.target.value)}
            required
          ></textarea>
        </div>

        <button type="submit">Submit Report</button>
      </form>

      {/* Display Error Message */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Display Submitted Reports */}
      <h2>S
