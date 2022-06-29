import React, { Fragment, useEffect } from 'react';

// Auth
import Register from './components/auth/Register';
import Login from './components/auth/Login';

// Layout
import Landing from './components/layout/Landing';
import Navbar from './components/layout/Navbar';
import Alert from './components/layout/Alert';
import SettingsSidebar from './components/layout/SettingsSidebar';

// Dashboard
import Dashboard from './components/dashboard/Dashboard';

// Routing
import PrivateRoute from './components/routing/PrivateRoute';

// Profiles
import MyProfile from './components/profiles/MyProfile';
import UserProfile from './components/profiles/UserProfile';
import CreateProfile from './components/profiles/CreateProfile';
import EditProfile from './components/profiles/EditProfile';
import EditGeneralInfo from './components/profiles/EditGeneralInfo';
import AddExperience from './components/profiles/AddExperience';
import AddEducation from './components/profiles/AddEducation';
import Profiles from './components/profiles/Profiles';

// Articles
import Articles from './components/articles/Articles';
import Article from './components/articles/Article';
import CreateArticle from './components/articles/CreateArticle';

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
            {/* Auth */}
            <Route exact path='/register' element={<Register />} />
            <Route exact path='/login' element={<Login />} />

            {/* Dashboard */}
            <Route
              exact
              path='/home'
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />

            {/* Profiles */}
            <Route
              exact
              path='/my-profile'
              element={
                <PrivateRoute>
                  <MyProfile />
                </PrivateRoute>
              }
            />
            <Route
              exact
              path='/my-profile/edit/general-info'
              element={
                <PrivateRoute>
                  <EditGeneralInfo />
                </PrivateRoute>
              }
            />
            <Route
              exact
              path='/profiles/:id'
              element={
                <PrivateRoute>
                  <UserProfile />
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
              path='/admin/profiles'
              element={
                <PrivateRoute expectedRole='admin' redirect='false'>
                  <Profiles />
                </PrivateRoute>
              }
            />

            {/* Settings */}
            <Route
              exact
              path='/settings/:resource'
              element={
                <PrivateRoute>
                  <SettingsSidebar />
                </PrivateRoute>
              }
            />

            {/* Articles */}
            <Route exact path='/articles' element={<Articles />} />
            <Route exact path='/articles/:id' element={<Article />} />
            <Route
              exact
              path='/create-article'
              element={
                <PrivateRoute>
                  <CreateArticle />
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
