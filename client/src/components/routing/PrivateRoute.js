import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import PageNotFound from '../layout/PageNotFound';

function userRoleIsOk(expectedRole, userRole) {
  if (expectedRole === 'normalUser') {
    return true;
  }
  if (expectedRole === 'mentor') {
    return userRole === 'normal' ? false : true;
  }
  return userRole === 'admin';
}

export default function PrivateRoute({
  children,
  expectedRole = 'normalUser',
  redirect = 'true',
}) {
  let location = useLocation();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const loading = useSelector((state) => state.auth.loading);
  const user = useSelector((state) => state.auth.user);
  let userRole = null;
  if (user) {
    userRole = user.role;
  }
  if (loading) {
    return <Spinner />;
  } else {
    if (!isAuthenticated) {
      if (redirect === 'true') {
        return <Navigate to='/login' state={{ from: location }} replace />;
      } else {
        return <PageNotFound />;
      }
    } else {
      if (userRoleIsOk(expectedRole, userRole)) {
        return children;
      } else {
        // TODO duplicate code
        if (redirect === 'true') {
          return <Navigate to='/login' state={{ from: location }} replace />;
        } else {
          return <PageNotFound />;
        }
      }
    }
  }
}
