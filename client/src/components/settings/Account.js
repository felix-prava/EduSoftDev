import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteAccount } from '../../actions/profile';
import { updateUser } from '../../actions/auth';
import { setAlert } from '../../actions/alert';
import Modal from '../layout/Modal';
import {
  settingsTranslations,
  universalTranslations,
} from '../layout/Translations';

const Account = ({ auth: { user }, updateUser, deleteAccount, setAlert }) => {
  const [formData, setFormData] = useState({
    username: '',
  });
  const [modal, setModal] = useState(false);
  const modalDeleteAccountTitle = 'Delete Account';
  const modalDeleteAccountDescription =
    'Are you sure you want to delete the account? It will be permanently removed, this action cannot be undone.';

  const { username } = formData;

  const language = user ? user.language : 'en';
  const changeUsernameLabel = settingsTranslations.changeUsername[language];
  const deleteAccountLabel = settingsTranslations.deleteAccount[language];
  const deleteAccountMessageLabel =
    settingsTranslations.deleteAccountMessage[language];
  const deleteYourAccountLabel =
    settingsTranslations.deleteYourAccount[language];
  const saveButtonLabel = universalTranslations.saveButton[language];

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
                  {changeUsernameLabel}
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
                    placeholder={user && user.username}
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
                  setFormData({ ...formData, username: '' });
                }}
                className='bg-gray-800 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900'
              >
                {saveButtonLabel}
              </button>
            </div>
          </div>
        </section>

        <section aria-labelledby='delete-account'>
          <div className='bg-white pt-6 shadow sm:rounded-md sm:overflow-hidden'>
            <div className='px-4 sm:px-6'>
              <h2
                id='delete-account'
                className='text-2xl font-extrabold leading-6 font-medium text-red-600'
              >
                {deleteAccountLabel}
              </h2>
              <p className='mt-1 text-sm text-gray-500'>
                {deleteAccountMessageLabel}
              </p>
            </div>
            <div className='mt-6 flex flex-col'>
              <div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
                <div className='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8'>
                  <div className='overflow-hidden py-2'>
                    <button
                      onClick={() => setModal(!modal)}
                      className='bg-red-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center ml-4 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600'
                    >
                      {deleteYourAccountLabel}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      {modal && (
        <Modal
          modalData={[modalDeleteAccountTitle, modalDeleteAccountDescription]}
          hideModal={() => setModal(false)}
          action={() => deleteAccount(user._id)}
        />
      )}
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
