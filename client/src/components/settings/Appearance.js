import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateUser } from '../../actions/auth';

const Appearance = ({ auth: { user }, updateUser }) => {
  const [language, setLanguage] = useState('');

  useEffect(() => {
    if (user) {
      setLanguage(user.language);
    }
  }, [user]);

  const onChange = (e) => {
    setLanguage(e.target.value);
  };

  const updateLanguage = async () => {
    await updateUser({ language }, user._id, 'Language Updated');
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
                  Select Language
                </h2>
              </div>

              <div>
                <label className='mt-6 block text-sm font-medium text-gray-700'>
                  Language{' '}
                </label>
                <div className='col-span-4 sm:col-span-2'>
                  <select
                    name='language'
                    id='language'
                    value={language}
                    onChange={(e) => onChange(e)}
                    className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm'
                  >
                    <option value='en'>English</option>
                    <option value='ro'>Romana</option>
                  </select>
                </div>
              </div>
            </div>
            <div className='px-4 py-3 bg-gray-50 text-right sm:px-6'>
              <button
                onClick={() => updateLanguage()}
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

Appearance.propTypes = {
  auth: PropTypes.object.isRequired,
  updateUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  updateUser,
})(Appearance);
