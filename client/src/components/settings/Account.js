import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteAccount } from '../../actions/profile';
import { updateUser } from '../../actions/auth';
import { setAlert } from '../../actions/alert';

const Account = ({ auth: { user }, updateUser, deleteAccount, setAlert }) => {
  const [formData, setFormData] = useState({
    username: '',
    preferredName: '',
  });

  const { username, preferredName } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <Fragment>
      <div className='space-y-6 sm:px-6 lg:px-0 lg:col-span-9'>
        <section aria-labelledby='update-username'>
          <div className='shadow sm:rounded-md sm:overflow-hidden'>
            <div className='bg-white py-6 px-4 sm:p-6'>
              <div>
                <h2
                  id='update-username'
                  className='text-lg leading-6 font-medium text-gray-900'
                >
                  Change Username
                </h2>
              </div>

              <div className='mt-6 grid grid-cols-4 gap-6'>
                <div className='col-span-4 sm:col-span-2'>
                  <input
                    type='text'
                    name='username'
                    id='username'
                    value={username}
                    onChange={(e) => onChange(e)}
                    className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm'
                  />
                </div>
              </div>
            </div>
            <div className='px-4 py-3 bg-gray-50 text-right sm:px-6'>
              <button
                onClick={() => {
                  if (username === '') {
                    setAlert("Username can't be empty", 'error');
                    return;
                  }
                  if (user.username !== username) {
                    updateUser({ username }, user._id, 'Username Updated');
                  } else {
                    setAlert('This is your current username', 'error');
                  }
                }}
                className='bg-gray-800 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900'
              >
                Save
              </button>
            </div>
          </div>
        </section>

        <section aria-labelledby='preferred-name'>
          <div className='shadow sm:rounded-md sm:overflow-hidden'>
            <div className='bg-white py-6 px-4 sm:p-6'>
              <div>
                <h2
                  id='preferred-name'
                  className='text-lg leading-6 font-medium text-gray-900'
                >
                  Change Preferred Name
                </h2>
              </div>

              <div className='mt-6 grid grid-cols-4 gap-6'>
                <div className='col-span-4 sm:col-span-2'>
                  <input
                    type='text'
                    name='preferredName'
                    id='preferredName'
                    value={preferredName}
                    onChange={(e) => onChange(e)}
                    placeholder={
                      user && user.preferredName
                        ? user.preferredName
                        : "You don't have a preferred name"
                    }
                    className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm'
                  />
                </div>
              </div>
            </div>
            <div className='px-4 py-3 bg-gray-50 text-right sm:px-6'>
              <button
                onClick={() => {
                  if (user.preferredName !== preferredName) {
                    updateUser(
                      { preferredName },
                      user._id,
                      preferredName === ''
                        ? 'Preferred Name Deleted' //TODO Delete preferredName
                        : 'Preferred Name Update'
                    );
                  } else {
                    setAlert('This is your current preferred name', 'error');
                  }
                }}
                className='bg-gray-800 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900'
              >
                Save
              </button>
            </div>
          </div>
        </section>

        <section aria-labelledby='profile-picture'>
          <form action='#' method='POST'>
            <div className='shadow sm:rounded-md sm:overflow-hidden'>
              <div className='bg-white py-6 px-4 space-y-6 sm:p-6'>
                <div>
                  <h2
                    id='profile-picture'
                    className='text-lg leading-6 font-medium text-gray-900'
                  >
                    Update Profile Picture
                  </h2>
                </div>
              </div>
              <div className='px-4 py-3 bg-gray-50 text-right sm:px-6'>
                <button
                  type='submit'
                  className='bg-gray-800 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900'
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </section>

        <section aria-labelledby='delete-account'>
          <div className='bg-white pt-6 shadow sm:rounded-md sm:overflow-hidden'>
            <div className='px-4 sm:px-6'>
              <h2
                id='delete-account'
                className='text-2xl font-extrabold leading-6 font-medium text-red-600'
              >
                Delete Account
              </h2>
              <p className='mt-1 text-sm text-gray-500'>
                Once you delete your account, there is no going back. Please be
                certain.
              </p>
            </div>
            <div className='mt-6 flex flex-col'>
              <div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
                <div className='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8'>
                  <div className='overflow-hidden py-2'>
                    <button
                      onClick={() => deleteAccount(user._id)}
                      className='bg-red-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center ml-4 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600'
                    >
                      Delete Your Account
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Fragment>
  );
};

Account.propTypes = {
  auth: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  updateUser,
  deleteAccount,
  setAlert,
})(Account);
