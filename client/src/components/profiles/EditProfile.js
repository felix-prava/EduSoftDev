import React, { Fragment, useState, useEffect } from 'react';
import { Navigate, Link, useNavigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  createUpdateProfile,
  getCurrentUserProfile,
} from '../../actions/profile';
import {
  myProfileTranslation,
  universalTranslations,
} from '../layout/Translations';

const EditProfile = ({
  profile: { profile, loading },
  auth: { user },
  createUpdateProfile,
  getCurrentUserProfile,
}) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    status: '',
    bio: '',
    githubUsername: '',
    linkedin: '',
    youtube: '',
    facebook: '',
    instagram: '',
    twitter: '',
  });

  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  const language = user ? user.language : 'en';
  const myProfileLabel = myProfileTranslation.myProfile[language];
  const aboutLabel = myProfileTranslation.about[language];
  const aboutDescriptionLabel = myProfileTranslation.aboutDescription[language];
  const statusDescriptionLabel =
    myProfileTranslation.statusDescription[language];
  const statusLabel = universalTranslations.status[language];
  const socialLinksLabel = universalTranslations.socialLinks[language];
  const removeLinksLabel = universalTranslations.removeLinks[language];
  const saveButtonLabel = universalTranslations.saveButton[language];
  const cancelButtonLabel = universalTranslations.cancelButton[language];

  useEffect(() => {
    if (!profile) getCurrentUserProfile();

    if (profile) {
      setFormData({
        status: loading || !profile.status ? '' : profile.status || '',
        bio: loading || !profile.bio ? '' : profile.bio || '',
        githubUsername:
          loading || !profile.githubUsername
            ? ''
            : profile.githubUsername || '',
        linkedin:
          loading || !profile.social ? '' : profile.social.linkedin || '',
        youtube: loading || !profile.social ? '' : profile.social.youtube || '',
        facebook:
          loading || !profile.social ? '' : profile.social.facebook || '',
        instagram:
          loading || !profile.social ? '' : profile.social.instagram || '',
        twitter: loading || !profile.social ? '' : profile.social.twitter || '',
      });
    }
  }, [loading, getCurrentUserProfile, profile]);

  const {
    status,
    bio,
    githubUsername,
    linkedin,
    youtube,
    facebook,
    instagram,
    twitter,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Redirect if user already has a profile
  let location = useLocation();
  if (profile && location.pathname === '/create-profile') {
    return <Navigate to={'/edit-profile'} />;
  }

  const onSubmit = (e) => {
    e.preventDefault();
    if (location.pathname === '/edit-profile') {
      createUpdateProfile(formData, navigate, user._id, true);
      return;
    }
    createUpdateProfile(formData, navigate, user._id);
  };

  return (
    <Fragment>
      <div className='container mt-8'>
        <form
          className='space-y-8 divide-y divide-gray-200'
          onSubmit={(e) => onSubmit(e)}
        >
          <div className='space-y-8 divide-y divide-gray-200'>
            <div>
              <div>
                <h3 className='text-2xl font-bold leading-6 font-medium text-gray-900 sm:text-2xl'>
                  {myProfileLabel}
                </h3>
              </div>

              <div className='mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6'>
                <div className='sm:col-span-6'>
                  <label
                    htmlFor='bio'
                    className='block text-sm font-medium text-gray-700'
                  >
                    {aboutLabel}
                  </label>
                  <div className='mt-1'>
                    <textarea
                      name='bio'
                      value={bio}
                      onChange={(e) => onChange(e)}
                      rows='3'
                      className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md'
                    ></textarea>
                  </div>
                  <p className='mt-2 text-sm text-gray-500'>
                    {aboutDescriptionLabel}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <div className='mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6'>
                <div className='sm:col-span-3'>
                  <label
                    htmlFor='status'
                    className='block text-sm font-medium text-gray-700'
                  >
                    {statusLabel}
                  </label>
                  <div className='mt-1'>
                    <input
                      type='text'
                      name='status'
                      value={status}
                      onChange={(e) => onChange(e)}
                      className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
                    />
                  </div>
                  <p className='mt-2 text-sm text-gray-500'>
                    {statusDescriptionLabel}
                  </p>
                </div>

                <div className='sm:col-span-3'>
                  <label
                    htmlFor='githubUsername'
                    className='block text-sm font-medium text-gray-700'
                  >
                    {' '}
                    Github Username{' '}
                  </label>
                  <div className='mt-1'>
                    <input
                      type='text'
                      name='githubUsername'
                      value={githubUsername}
                      onChange={(e) => onChange(e)}
                      className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
                    />
                  </div>
                </div>
              </div>
            </div>

            {!displaySocialInputs && (
              <button
                type='button'
                onClick={() => toggleSocialInputs(!displaySocialInputs)}
                className='py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-offset-2 focus:ring-indigo-500'
              >
                {socialLinksLabel}
              </button>
            )}
            {displaySocialInputs && (
              <Fragment>
                <button
                  type='button'
                  onClick={() => toggleSocialInputs(!displaySocialInputs)}
                  className='py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-offset-2 focus:ring-indigo-500'
                >
                  {removeLinksLabel}
                </button>

                <div className=''>
                  <div className='mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6'>
                    <div className='sm:col-span-3'>
                      <div className='mt-2 flex rounded-md shadow-sm'>
                        <svg
                          className='w-9 h-9 text-blue-600 fill-current mr-2 mt-1'
                          xmlns='http://www.w3.org/2000/svg'
                          viewBox='0 0 24 24'
                        >
                          <path d='M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' />
                        </svg>
                        <input
                          type='text'
                          name='facebook'
                          value={facebook}
                          onChange={(e) => onChange(e)}
                          className='flex-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300'
                        />
                      </div>
                    </div>

                    <div className='sm:col-span-3'>
                      <div className='mt-2 flex rounded-md shadow-sm'>
                        <svg
                          className='w-9 h-9 mr-2 mt-1'
                          xmlns='http://www.w3.org/2000/svg'
                          viewBox='0 0 102 102'
                        >
                          <defs>
                            <radialGradient
                              id='a'
                              cx='6.601'
                              cy='99.766'
                              r='129.502'
                              gradientUnits='userSpaceOnUse'
                            >
                              <stop offset='.09' stopColor='#fa8f21' />
                              <stop offset='.78' stopColor='#d82d7e' />
                            </radialGradient>
                            <radialGradient
                              id='b'
                              cx='70.652'
                              cy='96.49'
                              r='113.963'
                              gradientUnits='userSpaceOnUse'
                            >
                              <stop
                                offset='.64'
                                stopColor='#8c3aaa'
                                stopOpacity='0'
                              />
                              <stop offset='1' stopColor='#8c3aaa' />
                            </radialGradient>
                          </defs>
                          <path
                            fill='url(#a)'
                            d='M25.865,101.639A34.341,34.341,0,0,1,14.312,99.5a19.329,19.329,0,0,1-7.154-4.653A19.181,19.181,0,0,1,2.5,87.694,34.341,34.341,0,0,1,.364,76.142C.061,69.584,0,67.617,0,51s.067-18.577.361-25.14A34.534,34.534,0,0,1,2.5,14.312,19.4,19.4,0,0,1,7.154,7.154,19.206,19.206,0,0,1,14.309,2.5,34.341,34.341,0,0,1,25.862.361C32.422.061,34.392,0,51,0s18.577.067,25.14.361A34.534,34.534,0,0,1,87.691,2.5a19.254,19.254,0,0,1,7.154,4.653A19.267,19.267,0,0,1,99.5,14.309a34.341,34.341,0,0,1,2.14,11.553c.3,6.563.361,8.528.361,25.14s-.061,18.577-.361,25.14A34.5,34.5,0,0,1,99.5,87.694,20.6,20.6,0,0,1,87.691,99.5a34.342,34.342,0,0,1-11.553,2.14c-6.557.3-8.528.361-25.14.361s-18.577-.058-25.134-.361'
                            data-name='Path 16'
                          />
                          <path
                            fill='url(#b)'
                            d='M25.865,101.639A34.341,34.341,0,0,1,14.312,99.5a19.329,19.329,0,0,1-7.154-4.653A19.181,19.181,0,0,1,2.5,87.694,34.341,34.341,0,0,1,.364,76.142C.061,69.584,0,67.617,0,51s.067-18.577.361-25.14A34.534,34.534,0,0,1,2.5,14.312,19.4,19.4,0,0,1,7.154,7.154,19.206,19.206,0,0,1,14.309,2.5,34.341,34.341,0,0,1,25.862.361C32.422.061,34.392,0,51,0s18.577.067,25.14.361A34.534,34.534,0,0,1,87.691,2.5a19.254,19.254,0,0,1,7.154,4.653A19.267,19.267,0,0,1,99.5,14.309a34.341,34.341,0,0,1,2.14,11.553c.3,6.563.361,8.528.361,25.14s-.061,18.577-.361,25.14A34.5,34.5,0,0,1,99.5,87.694,20.6,20.6,0,0,1,87.691,99.5a34.342,34.342,0,0,1-11.553,2.14c-6.557.3-8.528.361-25.14.361s-18.577-.058-25.134-.361'
                            data-name='Path 17'
                          />
                          <path
                            fill='#fff'
                            d='M461.114,477.413a12.631,12.631,0,1,1,12.629,12.632,12.631,12.631,0,0,1-12.629-12.632m-6.829,0a19.458,19.458,0,1,0,19.458-19.458,19.457,19.457,0,0,0-19.458,19.458m35.139-20.229a4.547,4.547,0,1,0,4.549-4.545h0a4.549,4.549,0,0,0-4.547,4.545m-30.99,51.074a20.943,20.943,0,0,1-7.037-1.3,12.547,12.547,0,0,1-7.193-7.19,20.923,20.923,0,0,1-1.3-7.037c-.184-3.994-.22-5.194-.22-15.313s.04-11.316.22-15.314a21.082,21.082,0,0,1,1.3-7.037,12.54,12.54,0,0,1,7.193-7.193,20.924,20.924,0,0,1,7.037-1.3c3.994-.184,5.194-.22,15.309-.22s11.316.039,15.314.221a21.082,21.082,0,0,1,7.037,1.3,12.541,12.541,0,0,1,7.193,7.193,20.926,20.926,0,0,1,1.3,7.037c.184,4,.22,5.194.22,15.314s-.037,11.316-.22,15.314a21.023,21.023,0,0,1-1.3,7.037,12.547,12.547,0,0,1-7.193,7.19,20.925,20.925,0,0,1-7.037,1.3c-3.994.184-5.194.22-15.314.22s-11.316-.037-15.309-.22m-.314-68.509a27.786,27.786,0,0,0-9.2,1.76,19.373,19.373,0,0,0-11.083,11.083,27.794,27.794,0,0,0-1.76,9.2c-.187,4.04-.229,5.332-.229,15.623s.043,11.582.229,15.623a27.793,27.793,0,0,0,1.76,9.2,19.374,19.374,0,0,0,11.083,11.083,27.813,27.813,0,0,0,9.2,1.76c4.042.184,5.332.229,15.623.229s11.582-.043,15.623-.229a27.8,27.8,0,0,0,9.2-1.76,19.374,19.374,0,0,0,11.083-11.083,27.716,27.716,0,0,0,1.76-9.2c.184-4.043.226-5.332.226-15.623s-.043-11.582-.226-15.623a27.786,27.786,0,0,0-1.76-9.2,19.379,19.379,0,0,0-11.08-11.083,27.748,27.748,0,0,0-9.2-1.76c-4.041-.185-5.332-.229-15.621-.229s-11.583.043-15.626.229'
                            data-name='Path 18'
                            transform='translate(-422.637 -426.196)'
                          />
                        </svg>
                        <input
                          type='text'
                          name='instagram'
                          value={instagram}
                          onChange={(e) => onChange(e)}
                          className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
                        />
                      </div>
                    </div>

                    <div className='sm:col-span-3'>
                      <div className='mt-2 flex rounded-md shadow-sm'>
                        <svg
                          className='w-9 h-9 mr-2 mt-1'
                          xmlns='http://www.w3.org/2000/svg'
                          viewBox='0 0 48 34'
                        >
                          <path
                            fill='#CE1312'
                            fillRule='evenodd'
                            d='M219.044 391.27l-.002-13.582 12.97 6.814-12.968 6.768zm28.476-15.936s-.47-3.33-1.908-4.798c-1.826-1.926-3.871-1.935-4.809-2.047-6.717-.489-16.792-.489-16.792-.489h-.022s-10.075 0-16.792.49c-.939.111-2.983.12-4.81 2.046-1.439 1.467-1.907 4.798-1.907 4.798s-.48 3.913-.48 7.824v3.668c0 3.912.48 7.823.48 7.823s.468 3.331 1.907 4.798c1.827 1.926 4.225 1.866 5.293 2.067 3.84.371 16.32.486 16.32.486s10.086-.015 16.803-.505c.938-.113 2.983-.122 4.809-2.048 1.439-1.467 1.908-4.798 1.908-4.798s.48-3.91.48-7.823v-3.668c0-3.911-.48-7.824-.48-7.824z'
                            transform='translate(-200 -368)'
                          />
                        </svg>
                        <input
                          type='text'
                          name='youtube'
                          value={youtube}
                          onChange={(e) => onChange(e)}
                          className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
                        />
                      </div>
                    </div>

                    <div className='sm:col-span-3'>
                      <div className='mt-2 flex rounded-md shadow-sm'>
                        <svg
                          className='w-9 h-9 text-blue-500 fill-current mr-2 mt-1'
                          xmlns='http://www.w3.org/2000/svg'
                          viewBox='0 0 448 512'
                        >
                          <path d='M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z'></path>
                        </svg>
                        <input
                          type='text'
                          name='linkedin'
                          value={linkedin}
                          onChange={(e) => onChange(e)}
                          className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
                        />
                      </div>
                    </div>

                    <div className='sm:col-span-3'>
                      <div className='mt-2 flex rounded-md shadow-sm'>
                        <svg
                          className='w-9 h-9 text-blue-300 fill-current mr-2 mt-1'
                          xmlns='http://www.w3.org/2000/svg'
                          viewBox='0 0 24 24'
                        >
                          <path d='M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z' />
                        </svg>
                        <input
                          type='text'
                          name='twitter'
                          value={twitter}
                          onChange={(e) => onChange(e)}
                          className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Fragment>
            )}
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
                type='submit'
                className='ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-offset-2 focus:ring-indigo-500'
              >
                {saveButtonLabel}
              </button>
            </div>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

EditProfile.propTypes = {
  createUpdateProfile: PropTypes.func.isRequired,
  getCurrentUserProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, {
  createUpdateProfile,
  getCurrentUserProfile,
})(EditProfile);
