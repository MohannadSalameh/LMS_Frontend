import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Box, Typography, Paper } from '@mui/material';
import { Lock as LockIcon } from '@mui/icons-material';

const ProtectedRoute = ({ children, requiredRole = null, allowedRoles = [] }) => {
  const { user, isLoading } = useAuth();

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        minHeight="100vh"
      >
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Check role-based access
  const hasRequiredRole = () => {
    if (!requiredRole && allowedRoles.length === 0) {
      return true; // No role restriction
    }
    
    if (requiredRole) {
      return user.role === requiredRole;
    }
    
    if (allowedRoles.length > 0) {
      return allowedRoles.includes(user.role);
    }
    
    return false;
  };

  // Show access denied if user doesn't have required role
  if (!hasRequiredRole()) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        minHeight="100vh"
        p={3}
      >
        <Paper 
          elevation={3} 
          sx={{ 
            p: 4, 
            textAlign: 'center', 
            maxWidth: 400 
          }}
        >
          <LockIcon 
            sx={{ 
              fontSize: 64, 
              color: 'error.main', 
              mb: 2 
            }} 
          />
          <Typography variant="h5" gutterBottom color="error">
            Access Denied
          </Typography>
          <Typography variant="body1" color="textSecondary">
            You don't have permission to access this page.
            {requiredRole && (
              <>
                <br />
                Required role: <strong>{requiredRole}</strong>
              </>
            )}
            {allowedRoles.length > 0 && (
              <>
                <br />
                Allowed roles: <strong>{allowedRoles.join(', ')}</strong>
              </>
            )}
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
            Your current role: <strong>{user.role}</strong>
          </Typography>
        </Paper>
      </Box>
    );
  }

  // Render the protected component
  return children;
};

export default ProtectedRoute;