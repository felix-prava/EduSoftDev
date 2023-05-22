import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import { connect } from 'react-redux';
import { updateUser } from '../../actions/auth';
import { setAlert } from '../../actions/alert';
import {
  myProfileTranslations,
  universalTranslations,
} from '../layout/Translations';

const EditGeneralInfo = ({ auth: { user, loading }, updateUser, setAlert }) => {
  const [formData, setFormData] = useState({
    firstName: loading || !user ? '' : user.firstName,
    lastName: loading || !user ? '' : user.lastName,
    preferredName: loading || !user ? '' : user.preferredName,
    birthdate: loading || !user ? '' : user.birthdate,
  });

  const { firstName, lastName, preferredName, birthdate } = formData;

  const updateGeneralInfo = async () => {
    let validFormData = true;
    if (firstName === '') {
      setAlert("First name can't be empty", 'error');
      validFormData = false;
    }
    if (lastName === '') {
      setAlert("Last name can't be empty", 'error');
      validFormData = false;
    }
    if (!validFormData) return;

    await updateUser(
      { firstName, lastName, preferredName, birthdate },
      user._id,
      'Information Updated'
    );
  };

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const language = user ? user.language : 'en';
  const updateGeneralInfoLabel =
    myProfileTranslations.updateGeneralInfo[language];
  const firstNameLabel = myProfileTranslations.firstName[language];
  const lastNameLabel = myProfileTranslations.lastName[language];
  const preferredNameLabel = myProfileTranslations.preferredName[language];
  const birthdateLabel = myProfileTranslations.birthdate[language];
  const saveButtonLabel = universalTranslations.saveButton[language];
  const cancelButtonLabel = universalTranslations.cancelButton[language];

  return (
    <Fragment>
      {user === null ? (
        <Spinner />
      ) : (
        <div className='container mt-8'>
          <form
            className='space-y-8 divide-y divide-gray-200'
            onSubmit={(e) => lastName(e)}
          >
            <div className='space-y-8 divide-y divide-gray-200'>
              <div>
                <div>
                  <h3 className='text-2xl font-bold leading-6 font-medium text-gray-900 sm:text-2xl'>
                    {updateGeneralInfoLabel}
                  </h3>
                </div>

                <div>
                  <div className='mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6'>
                    <div className='sm:col-span-3'>
                      <label
                        htmlFor='firstName'
                        className='block text-sm font-medium text-gray-700'
                      >
                        {firstNameLabel}
                      </label>
                      <div className='mt-1'>
                        <input
                          type='text'
                          name='firstName'
                          value={firstName}
                          onChange={(e) => onChange(e)}
                          className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
                        />
                      </div>
                    </div>

                    <div className='sm:col-span-3'>
                      <label
                        htmlFor='lastName'
                        className='block text-sm font-medium text-gray-700'
                      >
                        {lastNameLabel}
                      </label>
                      <div className='mt-1'>
                        <input
                          type='text'
                          name='lastName'
                          value={lastName}
                          onChange={(e) => onChange(e)}
                          className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className='mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6'>
                  <div className='sm:col-span-3'>
                    <label
                      htmlFor='preferredName'
                      className='block text-sm font-medium text-gray-700'
                    >
                      {preferredNameLabel}
                    </label>
                    <div className='mt-1'>
                      <input
                        type='text'
                        name='preferredName'
                        value={preferredName}
                        onChange={(e) => onChange(e)}
                        className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
                      />
                    </div>
                  </div>

                  <div className='sm:col-span-3'>
                    <label
                      htmlFor='birthdate'
                      className='block text-sm font-medium text-gray-700'
                    >
                      {birthdateLabel}
                    </label>
                    <div className='mt-1'>
                      <input
                        type='date'
                        name='birthdate'
                        value={
                          birthdate
                            ? new Date(birthdate).toISOString().split('T')[0]
                            : ''
                        }
                        onChange={(e) => onChange(e)}
                        className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className='pt-5'>
              <div className='flex justify-end mb-8'>
                <Link to='/my-profile'>
                  <button
                    type='button'
                    className='bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-offset-2 focus:ring-indigo-500'
                  >
                    {cancelButtonLabel}
                  </button>
                </Link>
                <button
                  type='button'
                  onClick={updateGeneralInfo}
                  className='ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-offset-2 focus:ring-indigo-500'
                >
                  {saveButtonLabel}
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </Fragment>
  );
};

EditGeneralInfo.propTypes = {
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
})(EditGeneralInfo);
