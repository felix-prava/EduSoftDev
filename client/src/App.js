import React, { Fragment, useEffect } from 'react';
import Landing from './components/layout/Landing';
import Navbar from './components/layout/Navbar';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/routing/PrivateRoute';
import Profile from './components/profile/MyProfile';
import CreateProfile from './components/profile/CreateProfile';
import EditProfile from './components/profile/EditProfile';
import AddExperience from './components/profile/AddExperience';
import AddEducation from './components/profile/AddEducation';
import SettingsSidebar from './components/layout/SettingsSidebar';
import Profiles from './components/profile/Profiles';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
// Redux
import { Provider } from 'react-redux';
import store from './store';
import './App.css';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Alert />
        <Routes>
          <Route exact path='/' element={<Landing />} />
          <Fragment>
            <Route exact path='/register' element={<Register />} />
            <Route exact path='/login' element={<Login />} />
            <Route
              exact
              path='/home'
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              exact
              path='/my-profile'
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route
              exact
              path='/create-profile'
              element={
                <PrivateRoute>
                  <CreateProfile />
                </PrivateRoute>
              }
            />
            <Route
              exact
              path='/edit-profile'
              element={
                <PrivateRoute>
                  <EditProfile />
                </PrivateRoute>
              }
            />
            <Route
              exact
              path='/add-experience'
              element={
                <PrivateRoute>
                  <AddExperience />
                </PrivateRoute>
              }
            />
            <Route
              exact
              path='/add-education'
              element={
                <PrivateRoute>
                  <AddEducation />
                </PrivateRoute>
              }
            />
            <Route
              exact
              path='/settings/:resource'
              element={
                <PrivateRoute>
                  <SettingsSidebar />
                </PrivateRoute>
              }
            />
            <Route
              exact
              path='/admin/profiles'
              element={
                <PrivateRoute expectedRole='admin' redirect='false'>
                  <Profiles />
                </PrivateRoute>
              }
            />
          </Fragment>
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
