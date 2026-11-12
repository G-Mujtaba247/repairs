import React from 'react';
import { Navigate, useLocation } from 'react-router';
import { useAuth } from '../context/AuthContext';

/**
 * Wraps a route so only authenticated users (optionally of a specific role)
 * can access it. Unauthenticated visitors are redirected to /auth and the
 * original destination is preserved in location.state so Auth can redirect
 * back after sign-in.
 *
 * Usage:
 *   <Route path="/customer-dashboard"
 *          element={<ProtectedRoute role="customer"><UserDashboard /></ProtectedRoute>} />
 */
const ProtectedRoute = ({ children, role }) => {
  const { isLoggedIn, user, ready } = useAuth();
  const location = useLocation();

  // Don't redirect until we've hydrated from localStorage
  if (!ready) return null;

  if (!isLoggedIn) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  if (role && user?.role !== role) {
    // Logged in but wrong role — send to their own dashboard
    const fallback = user.role === 'technician' ? '/technician-dashboard' : '/customer-dashboard';
    return <Navigate to={fallback} replace />;
  }

  return children;
};

export default ProtectedRoute;
