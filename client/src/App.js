import React, { Fragment } from 'react';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Landing />} />
        <Fragment className='container mt-6'>
          <Route exact path='/register' element={<Register />} />
          <Route exact path='/login' element={<Login />} />
        </Fragment>
      </Routes>
    </Router>
  );
};

export default App;
