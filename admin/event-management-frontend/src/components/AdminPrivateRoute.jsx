import React, { useEffect } from 'react';

const AdminPrivateRoute = ({ children }) => {
  const token = localStorage.getItem('adminToken');
  console.log('AdminPrivateRoute - Checking Token:', token);

  useEffect(() => {
    if (!token) {
      console.log('No token, redirecting to http://localhost:3000/admin-login');
      window.location.href = 'http://localhost:3000/admin-login';
    } else {
      console.log('Token found, rendering children');
    }
  }, [token]);

  return token ? children : null;
};

export default AdminPrivateRoute;