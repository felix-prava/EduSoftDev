import React, { Fragment } from 'react';
import Landing from './components/layout/Landing';
import Navbar from './components/layout/Navbar';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// Redux
import { Provider } from 'react-redux';
import store from './store';
import './App.css';

const App = () => {
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
          </Fragment>
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
