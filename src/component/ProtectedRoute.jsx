import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ element}) => {
  const { isAuthenticated } = useContext(AuthContext);
  console.log("í auth",isAuthenticated);
  
  return isAuthenticated ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;