import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [user, setUser] = useState(null); // To store the logged-in user data
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Whether user is logged in
  const navigate = useNavigate();

  // Get user info from localStorage or sessionStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <nav>
      <div className="navbar-container">
        <div className="navbar-logo">
          <h2>Internship Portal</h2>
        </div>
        <div className="navbar-links">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>

            {/* If the user is authenticated, show links based on their role */}
            {isAuthenticated ? (
              <>
                {user.role === 'intern' && (
                  <>
                    <li>
                      <Link to="/intern/dashboard">Dashboard</Link>
                    </li>
                    <li>
                      <Link to="/intern/reports">Reports</Link>
                    </li>
                  </>
                )}
                {user.role === 'mentor' && (
                  <>
                    <li>
                      <Link to="/mentor/dashboard">Mentor Dashboard</Link>
                    </li>
                    <li>
                      <Link to="/mentor/assignments">Assignments</Link>
                    </li>
                  </>
                )}
                {user.role === 'coordinator' && (
                  <>
                    <li>
                      <Link to="/coordinator/dashboard">Coordinator Dashboard</Link>
                    </li>
                    <li>
                      <Link to="/coordinator/interns">Interns</Link>
                    </li>
                  </>
                )}
                {/* Common Links for all authenticated users */}
                <li>
                  <button onClick={handleLogout}>Logout</button>
                </li>
              </>
            ) : (
              // If user is not authenticated, show login/signup links
              <>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/register">Register</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
