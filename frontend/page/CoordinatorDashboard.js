import React, { useState, useEimport React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CoordinatorDashboard = () => {
  const [interns, setInterns] = useState([]);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');
  const navigate = useNavigate();

  // Fetch all interns data
  useEffect(() => {
    const fetchInterns = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/interns');
        setInterns(response.data);
      } catch (err) {
        setError('Failed to fetch interns data.');
      }
    };

    fetchInterns();
  }, []);

  // Handle internship verification
  const handleVerify = async (internId, status) => {
    try {
      await axios.post(`http://localhost:5000/api/interns/${internId}/verify`, { status });
      alert(`Internship status updated to ${status}`);
      setStatus('');
    } catch (err) {
      setError('Failed to verify internship status.');
    }
  };

  // Handle intern deletion
  const handleDelete = async (internId) => {
    try {
      await axios.delete(`http://localhost:5000/api/interns/${internId}`);
      alert('Intern deleted successfully');
      setInterns(interns.filter(intern => intern._id !== internId));
    } catch (err) {
      setError('Failed to delete intern.');
    }
  };

  return (
    <div>
      <h1>Coordinator Dashboard</h1>

      {/* Display error message if fetching fails */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <h2>Interns</h2>
      {interns.length === 0 ? (
        <p>No interns found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Intern Name</th>
              <th>Company</th>
              <th>Status</th>
              <th>Action</th>
              <th>Reports</th>
            </tr>
          </thead>
          <tbody>
            {interns.map((intern) => (
              <tr key={intern._id}>
                <td>{intern.name}</td>
                <td>{intern.companyName}</td>
                <td>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="Verified">Verified</option>
                    <option value="Pending">Pending</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                  <button onClick={() => handleVerify(intern._id, status)}>
                    Update Status
                  </button>
                </td>
                <td>
                  <button onClick={() => navigate(`/interns/${intern._id}`)}>View</button>
                  <button onClick={() => handleDelete(intern._id)}>Delete</button>
                </td>
                <td>
                  {intern.reports && intern.reports.length > 0 ? (
                    <ul>
                      {intern.reports.map((report) => (
                        <li key={report._id}>
                          <strong>{report.reportType}</strong>: {new Date(report.reportDate).toLocaleDateString()}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No reports submitted</p>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CoordinatorDashboard;
ffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CoordinatorDashboard = () => {
  const [interns, setInterns] = useState([]);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');
  const navigate = useNavigate();

  // Fetch all interns data
  useEffect(() => {
    const fetchInterns = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/interns');
        setInterns(response.data);
      } catch (err) {
        setError('Failed to fetch interns data.');
      }
    };

    fetchInterns();
  }, []);

  // Handle internship verification
  const handleVerify = async (internId, status) => {
    try {
      await axios.post(`http://localhost:5000/api/interns/${internId}/verify`, { status });
      alert(`Internship status updated to ${status}`);
      setStatus('');
    } catch (err) {
      setError('Failed to verify internship status.');
    }
  };

  // Handle intern deletion
  const handleDelete = async (internId) => {
    try {
      await axios.delete(`http://localhost:5000/api/interns/${internId}`);
      alert('Intern deleted successfully');
      setInterns(interns.filter(intern => intern._id !== internId));
    } catch (err) {
      setError('Failed to delete intern.');
    }
  };

  return (
    <div>
      <h1>Coordinator Dashboard</h1>

      {/* Display error message if fetching fails */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <h2>Interns</h2>
      {interns.length === 0 ? (
        <p>No interns found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Intern Name</th>
              <th>Company</th>
              <th>Status</th>
              <th>Action</th>
              <th>Reports</th>
            </tr>
          </thead>
          <tbody>
            {interns.map((intern) => (
              <tr key={intern._id}>
                <td>{intern.name}</td>
                <td>{intern.companyName}</td>
                <td>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="Verified">Verified</option>
                    <option value="Pending">Pending</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                  <button onClick={() => handleVerify(intern._id, status)}>
                    Update Status
                  </button>
                </td>
                <td>
                  <button onClick={() => navigate(`/interns/${intern._id}`)}>View</button>
                  <button onClick={() => handleDelete(intern._id)}>Delete</button>
                </td>
                <td>
                  {intern.reports && intern.reports.length > 0 ? (
                    <ul>
                      {intern.reports.map((report) => (
                        <li key={report._id}>
                          <strong>{report.reportType}</strong>: {new Date(report.reportDate).toLocaleDateString()}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No reports submitted</p>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CoordinatorDashboard;
