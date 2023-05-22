import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateUser } from '../../actions/auth';
import { setAlert } from '../../actions/alert';
import {
  settingsTranslations,
  universalTranslations,
} from '../layout/Translations';

const Emails = ({ auth: { user }, updateUser, setAlert }) => {
  const [formData, setFormData] = useState({
    email: user ? user.email : '',
    getNotifications: user ? user.getNotifications : false,
    getNews: user ? user.getNews : false,
  });

  const { email, getNotifications, getNews } = formData;

  const language = user ? user.language : 'en';
  const changeEmailLabel = settingsTranslations.changeEmail[language];
  const emailSettingsLabel = settingsTranslations.emailSettings[language];
  const getNotificationsLabel = settingsTranslations.getNotifications[language];
  const getNewsLabel = settingsTranslations.getNews[language];
  const blankNewEmailMessage = settingsTranslations.blankNewEmail[language];
  const emailUpdatedMessage = settingsTranslations.emailUpdated[language];
  const emailSettingsUpdatedMessage =
    settingsTranslations.emailSettingsUpdated[language];
  const saveButtonLabel = universalTranslations.saveButton[language];

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleNotificationsChange = (e) =>
    setFormData({ ...formData, getNotifications: e.target.checked });

  const handleNewsChange = (e) =>
    setFormData({ ...formData, getNews: e.target.checked });

  const updateEmail = async () => {
    if (email === '') {
      setAlert(blankNewEmailMessage, 'error');
      return;
    }
    await updateUser({ email }, user._id, emailUpdatedMessage);
  };

  const updateEmailSettings = async () => {
    await updateUser(
      { getNotifications, getNews },
      user._id,
      emailSettingsUpdatedMessage
    );
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
                  {changeEmailLabel}
                </h2>
              </div>

              <label className='mt-6 block text-sm font-medium text-gray-700'>
                Email
              </label>
              <div className='grid grid-cols-4 gap-6'>
                <div className='col-span-4 sm:col-span-2'>
                  <input
                    type='email'
                    name='email'
                    id='email'
                    value={email}
                    onChange={(e) => onChange(e)}
                    className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm'
                  />
                </div>
              </div>
            </div>
            <div className='px-4 py-3 bg-gray-50 text-right sm:px-6'>
              <button
                onClick={() => updateEmail()}
                className='bg-gray-800 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900'
              >
                {saveButtonLabel}
              </button>
            </div>
          </div>

          <div className='shadow sm:rounded-md sm:overflow-hidden mt-6'>
            <div className='bg-white py-6 px-4 sm:p-6'>
              <div>
                <h2
                  id='update-password'
                  className='text-lg leading-6 font-medium text-gray-900'
                >
                  {emailSettingsLabel}
                </h2>
              </div>

              <label className='mt-6 block text-sm font-medium text-gray-700'>
                {getNotificationsLabel}
              </label>
              <div className='grid grid-cols-4 gap-6'>
                <div className='col-span-4 sm:col-span-2'>
                  <input
                    aria-describedby='comments-description'
                    name='getNotifications'
                    checked={getNotifications}
                    onChange={handleNotificationsChange}
                    type='checkbox'
                    className='focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded'
                  />
                </div>
              </div>

              <label className='mt-6 block text-sm font-medium text-gray-700'>
                {getNewsLabel}
              </label>
              <div className='grid grid-cols-4 gap-6'>
                <div className='col-span-4 sm:col-span-2'>
                  <input
                    aria-describedby='comments-description'
                    name='getNews'
                    checked={getNews}
                    onChange={handleNewsChange}
                    type='checkbox'
                    className='focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded'
                  />
                </div>
              </div>
            </div>
            <div className='px-4 py-3 bg-gray-50 text-right sm:px-6'>
              <button
                onClick={() => updateEmailSettings()}
                className='bg-gray-800 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900'
              >
                {saveButtonLabel}
              </button>
            </div>
          </div>
        </section>
      </div>
    </Fragment>
  );
};

Emails.propTypes = {
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
})(Emails);
