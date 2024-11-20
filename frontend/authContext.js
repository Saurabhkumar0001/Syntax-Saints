import React, { createContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

// Create a context for authentication
const AuthContext = createContext();

// Create a provider component to wrap the application
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Store user data
  const [loading, setLoading] = useState(true); // For loading state while fetching user data
  const [error, setError] = useState(null); // For error handling
  const history = useHistory(); // Used for redirection after login or logout

  // Check if the user is authenticated on page load (e.g., session or localStorage check)
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('/api/auth/current-user'); // API call to get user data
        setUser(response.data); // If the user is authenticated, set the user data
      } catch (err) {
        console.error('Failed to fetch user', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // Function to handle login
  const login = async (credentials) => {
    try {
      const response = await axios.post('/api/auth/login', credentials); // Login API call
      setUser(response.data.user); // Store user data in state after successful login
      localStorage.setItem('authToken', response.data.token); // Save token in localStorage
      history.push('/dashboard'); // Redirect to the dashboard or homepage
    } catch (err) {
      setError('Login failed, please try again.');
      console.error(err);
    }
  };

  // Function to handle logout
  const logout = () => {
    localStorage.removeItem('authToken'); // Remove the auth token from localStorage
    setUser(null); // Set the user to null
    history.push('/login'); // Redirect to login page
  };

  // Function to check if a user is logged in
  const isAuthenticated = () => {
    return user !== null;
  };

  // Provide context values to all children components
  return (
    <AuthContext.Provider value={{ user, loading, error, login, logout, isAuthenticated }}>
      {loading ? <div>Loading...</div> : children} {/* Show a loading message until user is fetched */}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext in other components
const useAuth = () => {
  return React.useContext(AuthContext);
};

export { AuthProvider, useAuth };
