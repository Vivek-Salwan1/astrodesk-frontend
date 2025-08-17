import React, { useContext } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useUser } from './contexts/UserContext';

const ProtectedRoutes = ({ children }) => {
  const navigate = useNavigate();
  const { userId } = useUser();

  if (!userId) {
    console.log('No user ID found');
    // Option 1: Redirect to login
    // return <Navigate to="/login" replace />;

    // Option 2: Show protected message
    return (
        <div style={{ padding: '50px', textAlign: 'center', fontSize: '18px', color: 'red' }}>
          🚫 This page is protected. Please log in to access.
          <br /><br />
          <button
            onClick={() => navigate('/login')}
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              backgroundColor: '#06ABE2',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Go to Login
          </button>
        </div>
      );
  }

  return children;
};

export default ProtectedRoutes;
