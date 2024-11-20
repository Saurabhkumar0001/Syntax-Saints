import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
  const [interns, setInterns] = useState([]);
  const [error, setError] = useState('');

  // Fetch interns from the backend
  useEffect(() => {
    const fetchInterns = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/interns');
        setInterns(response.data);
      } catch (err) {
        setError('Failed to fetch interns.');
      }
    };

    fetchInterns();
  }, []);

  return (
    <div>
      <h1>Internship Dashboard</h1>

      {/* Display error message if fetching fails */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Intern list */}
      <h2>Interns</h2>
      {interns.length === 0 ? (
        <p>No interns found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Intern Name</th>
              <th>Company</th>
              <th>Start Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {interns.map((intern) => (
              <tr key={intern._id}>
                <td>{intern.name}</td>
                <td>{intern.companyName}</td>
                <td>{new Date(intern.startDate).toLocaleDateString()}</td>
                <td>{intern.status || 'Ongoing'}</td>
                <td>
                  <Link to={`/interns/${intern._id}`}>View</Link> | 
                  <Link to={`/interns/edit/${intern._id}`}>Edit</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Add new intern button */}
      <div>
        <Link to="/add">
          <button>Add New Intern</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
