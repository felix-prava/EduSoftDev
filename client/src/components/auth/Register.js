import React, { Fragment, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { registerUser } from '../../actions/auth';
import PropTypes from 'prop-types';

const Register = ({ setAlert, registerUser, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    preferredName: '',
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  });

  const {
    firstName,
    lastName,
    preferredName,
    username,
    email,
    password,
    passwordConfirmation,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    window.scrollTo(0, 0);
    if (password !== passwordConfirmation) {
      setAlert('Passwords do not match', 'error');
    } else {
      registerUser({
        firstName,
        lastName,
        preferredName,
        username,
        email,
        password,
      });
    }
  };

  // Redirect if logged in
  if (isAuthenticated) {
    setAlert('You are already logged in', 'info', 2000);
    return <Navigate to={'/'} />;
  }

  return (
    <Fragment>
      <div className='min-h-full flex'>
        <div className='flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24'>
          <div className='mx-auto w-full max-w-sm lg:w-96'>
            <div>
              <img
                className='h-12 w-auto'
                src='https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg'
                alt='Workflow'
              />
              <h2 className='mt-6 text-3xl font-extrabold text-gray-900'>
                Create your new account
              </h2>
            </div>

            <div className='mt-8'>
              <div className='mt-6'>
                <form onSubmit={(e) => onSubmit(e)} className='space-y-6'>
                  <div>
                    <label
                      htmlFor='first-name'
                      className='block text-sm font-medium text-gray-700'
                    >
                      First name
                    </label>
                    <div className='mt-1'>
                      <input
                        id='first-name'
                        name='firstName'
                        value={firstName}
                        onChange={(e) => onChange(e)}
                        type='text'
                        required
                        className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor='last-name'
                      className='block text-sm font-medium text-gray-700'
                    >
                      Last name
                    </label>
                    <div className='mt-1'>
                      <input
                        id='last-name'
                        name='lastName'
                        value={lastName}
                        onChange={(e) => onChange(e)}
                        type='text'
                        required
                        className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor='preferred-name'
                      className='block text-sm font-medium text-gray-700'
                    >
                      Preferred name
                    </label>
                    <div className='mt-1'>
                      <input
                        id='preferred-name'
                        name='preferredName'
                        value={preferredName}
                        onChange={(e) => onChange(e)}
                        type='text'
                        className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor='username'
                      className='block text-sm font-medium text-gray-700'
                    >
                      Username
                    </label>
                    <div className='mt-1'>
                      <input
                        id='username'
                        name='username'
                        value={username}
                        onChange={(e) => onChange(e)}
                        type='text'
                        required
                        className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor='email'
                      className='block text-sm font-medium text-gray-700'
                    >
                      Email address
                    </label>
                    <div className='mt-1'>
                      <input
                        id='email'
                        name='email'
                        type='email'
                        value={email}
                        onChange={(e) => onChange(e)}
                        autoComplete='email'
                        required
                        className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                      />
                    </div>
                  </div>

                  <div className='space-y-1'>
                    <label
                      htmlFor='password'
                      className='block text-sm font-medium text-gray-700'
                    >
                      Password
                    </label>
                    <div className='mt-1'>
                      <input
                        id='password'
                        name='password'
                        value={password}
                        onChange={(e) => onChange(e)}
                        type='password'
                        autoComplete='current-password'
                        required
                        className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                      />
                    </div>
                  </div>

                  <div className='space-y-1'>
                    <label
                      htmlFor='password-confirmation'
                      className='block text-sm font-medium text-gray-700'
                    >
                      Password confirmation
                    </label>
                    <div className='mt-1'>
                      <input
                        id='passwordConfirmation'
                        name='passwordConfirmation'
                        value={passwordConfirmation}
                        onChange={(e) => onChange(e)}
                        type='password'
                        autoComplete='current-password'
                        required
                        className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                      />
                    </div>
                  </div>

                  <div>
                    <button
                      type='submit'
                      className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                    >
                      Sign up
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className='hidden lg:block relative w-0 flex-1'>
          <img
            className='absolute inset-0 h-full w-full object-cover'
            src='https://images.unsplash.com/photo-1505904267569-f02eaeb45a4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80'
            alt=''
          />
        </div>
      </div>
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  registerUser: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, registerUser })(Register);
