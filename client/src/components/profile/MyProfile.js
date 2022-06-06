import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getCurrentUserProfile } from '../../actions/profile';
import Experience from './Experience';
import Education from './Education';

const MyProfile = ({
  getCurrentUserProfile,
  auth: { user },
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getCurrentUserProfile();
  }, [getCurrentUserProfile]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <Fragment>
      {' '}
      <div className='bg-white'>
        <div className='mx-auto py-12 px-4 max-w-7xl sm:px-6 lg:px-8 lg:py-24'>
          <div className='space-y-12 lg:grid lg:grid-cols-3 lg:gap-8 lg:space-y-0'>
            <div className='space-y-5 sm:space-y-4'>
              <h2 className='text-3xl font-extrabold tracking-tight sm:text-4xl'>
                My Profile
              </h2>
              {profile === null ? (
                <Fragment>
                  <p className='text-xl text-gray-500'>
                    Tell us some things about you! You can add school, job
                    experiences and social media links.
                  </p>
                  <Link to='/create-profile'>
                    <button
                      type='button'
                      className='mt-2 inline-flex text-center content-center mr-4 px-4 py-2 border border-transparent shadow-sm w-full text-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500'
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-6 w-6 mr-2'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                        strokeWidth='2'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                        />
                      </svg>
                      Create Profile
                    </button>
                  </Link>
                </Fragment>
              ) : (
                <Fragment>
                  <p className='text-xl text-gray-500'>
                    Nulla quam felis, enim faucibus proin velit, ornare id
                    pretium. Augue ultrices sed arcu condimentum vestibulum
                    suspendisse. Volutpat eu faucibus vivamus eget bibendum
                    cras.
                  </p>
                  <Link to='/edit-profile'>
                    <button
                      type='button'
                      className='mt-2 inline-flex text-center content-center mr-4 px-4 py-2 border border-transparent shadow-sm w-full text-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500'
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-6 w-6 mr-2'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                        strokeWidth='2'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                        />
                      </svg>
                      Edit Profile
                    </button>
                  </Link>
                </Fragment>
              )}{' '}
              <div className='grid grid-cols-2 grid-flow-col gap-4'>
                <Link to='/add-experience'>
                  <button
                    type='button'
                    className='mt-2 inline-flex text-center px-4 py-2 border border-transparent shadow-sm w-full text-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500'
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-6 w-6 mr-2'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                      strokeWidth='2'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                      />
                    </svg>
                    Add Experience
                  </button>
                </Link>
                <Link to='/add-education'>
                  <button
                    type='button'
                    className='mt-2 content-center inline-flex text-center px-4 py-2 border border-transparent shadow-sm w-full text-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500'
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-6 w-6 mr-2'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                      strokeWidth='2'
                    >
                      <path d='M12 14l9-5-9-5-9 5 9 5z' />
                      <path d='M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z' />
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222'
                      />
                    </svg>
                    Add Education
                  </button>
                </Link>
              </div>
            </div>

            <div className='lg:col-span-2'>
              {user && (
                <div className='bg-white mb-8'>
                  <h2 className='text-2xl font-extrabold text-gray-900 sm:text-3xl'>
                    General Info
                  </h2>
                  <div className='max-w-lg mx-auto md:max-w-none md:grid md:grid-cols-2 md:gap-8'>
                    <div>
                      <div className='mt-5'>
                        <div className='flex'>
                          <div className='flex-shrink-0 text-gray-600 hover:text-gray-800'>
                            <svg
                              className='h-6 w-6'
                              xmlns='http://www.w3.org/2000/svg'
                              fill='none'
                              viewBox='0 0 24 24'
                              stroke='currentColor'
                              strokeWidth='2'
                            >
                              <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
                              />
                            </svg>
                          </div>
                          <div className='ml-3 text-base text-gray-500 hover:text-gray-700'>
                            <p>
                              {user.lastName} {user.firstName}
                            </p>
                          </div>
                        </div>
                        <div className='mt-6 flex'>
                          <div className='flex-shrink-0 text-gray-600 hover:text-gray-800'>
                            <svg
                              className='h-6 w-6'
                              xmlns='http://www.w3.org/2000/svg'
                              fill='none'
                              viewBox='0 0 24 24'
                              strokeWidth='2'
                              stroke='currentColor'
                              aria-hidden='true'
                            >
                              <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                              />
                            </svg>
                          </div>
                          <div className='ml-3 text-base text-gray-500 hover:text-gray-700'>
                            <p>{user.email}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='sm:mt-16 md:mt-0'>
                      <div className='mt-5'>
                        <div className='flex'>
                          <div className='flex-shrink-0 text-gray-600 hover:text-gray-800'>
                            <svg
                              className='h-6 w-6'
                              xmlns='http://www.w3.org/2000/svg'
                              fill='none'
                              viewBox='0 0 24 24'
                              stroke='currentColor'
                              strokeWidth='2'
                            >
                              <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
                              />
                            </svg>
                          </div>
                          <div className='ml-3 text-base text-gray-500 hover:text-gray-700'>
                            <p>{user.username}</p>
                          </div>
                        </div>
                        <div className='mt-4 flex'>
                          <div className='flex-shrink-0'></div>
                          <div className=' text-gray-500'>
                            <Link to='/my-profile/edit/general-info'>
                              <button
                                type='button'
                                className='inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500'
                              >
                                Edit General Info
                              </button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div className='space-y-5 sm:space-y-4 mb-6'>
                <h2 className='text-3xl font-extrabold tracking-tight sm:text-4xl'>
                  Experience
                </h2>
                {profile === null || profile.experience.length === 0 ? (
                  <p className='text-xl text-gray-500'>
                    You have not added any professional experience yet.
                  </p>
                ) : (
                  <Experience experience={profile.experience} />
                )}
              </div>
              <div className='space-y-5 sm:space-y-4 mb-6'>
                <h2 className='text-3xl font-extrabold tracking-tight sm:text-4xl'>
                  Education
                </h2>
                {profile === null || profile.education.length === 0 ? (
                  <p className='text-xl text-gray-500'>
                    You have not added any education yet.
                  </p>
                ) : (
                  <Education education={profile.education} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

MyProfile.propTypes = {
  getCurrentUserProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentUserProfile })(MyProfile);
