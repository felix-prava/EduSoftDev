import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateUser } from '../../actions/auth';
import { setAlert } from '../../actions/alert';

const Password = ({ auth: { user }, updateUser, setAlert }) => {
  const [formData, setFormData] = useState({
    oldPassword: '',
    password: '',
    passwordConfirmation: '',
  });

  const { oldPassword, password, passwordConfirmation } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const updatePassword = async () => {
    if (password !== passwordConfirmation) {
      setAlert('Passwords do not match', 'error');
      return;
    }
    if (oldPassword === '') {
      setAlert("Old password can't be blank", 'error');
      return;
    }
    if (password === '') {
      setAlert("Password can't be blank", 'error');
      return;
    }
    const result = await updateUser(
      { oldPassword, password },
      user._id,
      'Password Updated'
    );
    if (result === 0) {
      setFormData({
        ...formData,
        oldPassword: '',
        password: '',
        passwordConfirmation: '',
      });
    }
  };

  return (
    <Fragment>
      <div className='space-y-6 sm:px-6 lg:px-0 lg:col-span-9'>
        <section aria-labelledby='update-password'>
          <div className='shadow sm:rounded-md sm:overflow-hidden'>
            <div className='bg-white py-6 px-4 sm:p-6'>
              <div>
                <h2
                  id='update-password'
                  className='text-lg leading-6 font-medium text-gray-900'
                >
                  Change Password
                </h2>
              </div>

              <div>
                <label className='mt-6 block text-sm font-medium text-gray-700'>
                  {' '}
                  Old Password{' '}
                </label>
                <div className='grid grid-cols-4 gap-6'>
                  <div className='col-span-4 sm:col-span-2'>
                    <input
                      type='password'
                      name='oldPassword'
                      id='oldPassword'
                      value={oldPassword}
                      onChange={(e) => onChange(e)}
                      className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm'
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className='mt-6 block text-sm font-medium text-gray-700'>
                  {' '}
                  Password{' '}
                </label>
                <div className='grid grid-cols-4 gap-6'>
                  <div className='col-span-4 sm:col-span-2'>
                    <input
                      type='password'
                      name='password'
                      id='password'
                      value={password}
                      onChange={(e) => onChange(e)}
                      className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm'
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className='mt-6 block text-sm font-medium text-gray-700'>
                  {' '}
                  Confirm New Password{' '}
                </label>
                <div className='grid grid-cols-4 gap-6'>
                  <div className='col-span-4 sm:col-span-2'>
                    <input
                      type='password'
                      name='passwordConfirmation'
                      id='passwordConfirmation'
                      value={passwordConfirmation}
                      onChange={(e) => onChange(e)}
                      className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm'
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className='px-4 py-3 bg-gray-50 text-right sm:px-6'>
              <button
                onClick={() => updatePassword()}
                className='bg-gray-800 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900'
              >
                Save
              </button>
            </div>
          </div>
        </section>
      </div>
    </Fragment>
  );
};

Password.propTypes = {
  auth: PropTypes.object.isRequired,
  updateUser: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  updateUser,
  setAlert,
})(Password);
