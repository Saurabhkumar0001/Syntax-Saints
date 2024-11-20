import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const MentorDashboard = () => {
  const { mentorId } = useParams(); // Get mentorId from URL
  const [interns, setInterns] = useState([]);
  const [error, setError] = useState('');
  const [marks, setMarks] = useState({}); // Store marks for reports
  const [feedback, setFeedback] = useState(''); // Feedback for reports
  const navigate = useNavigate();

  // Fetch interns assigned to the mentor
  useEffect(() => {
    const fetchInterns = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/mentors/${mentorId}/interns`);
        setInterns(response.data);
      } catch (err) {
        setError('Failed to fetch interns assigned to this mentor.');
      }
    };

    fetchInterns();
  }, [mentorId]);

  // Handle mark submission
  const handleMarkSubmit = async (internId, reportId) => {
    try {
      await axios.post('http://localhost:5000/api/reports/marks', {
        internId,
        reportId,
        marks: marks[reportId] || 0,  // Default mark if not provided
        feedback,
      });
      alert('Feedback and marks submitted successfully');
      setFeedback('');
      setMarks((prev) => ({ ...prev, [reportId]: '' }));
    } catch (err) {
      setError('Failed to submit marks or feedback.');
    }
  };

  return (
    <div>
      <h1>Mentor Dashboard</h1>

      {/* Display error message if any */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <h2>Assigned Interns</h2>
      {interns.length === 0 ? (
        <p>No interns assigned yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Intern Name</th>
              <th>Company</th>
              <th>Start Date</th>
              <th>Reports</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {interns.map((intern) => (
              <tr key={intern._id}>
                <td>{intern.name}</td>
                <td>{intern.companyName}</td>
                <td>{new Date(intern.startDate).toLocaleDateString()}</td>
                <td>
    
