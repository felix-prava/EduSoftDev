import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import Spinner from '../layout/Spinner';

export default function PrivateRoute({ children }) {
  let location = useLocation();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const loading = useSelector((state) => state.auth.loading);
  if (loading) {
    return <Spinner />;
  } else {
    if (!isAuthenticated) {
      return <Navigate to='/login' state={{ from: location }} replace />;
    } else {
      return children;
    }
  }
}
