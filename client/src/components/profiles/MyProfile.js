import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getCurrentUserProfile } from '../../actions/profile';
import Experience from './Experience';
import Education from './Education';
import GithubRepos from './GithubRepos';

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

  const solvedProblems = (user.solvedProblems && user.solvedProblems.length) || 0
  const lessonsLearned = (user.lessonsLearned && user.lessonsLearned.length) || 0
  const solvedQuizzes  = (user.solvedQuizzes && user.solvedQuizzes.length) || 0

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
              {profile && (
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
                <Link to='/my-profile/add-experience'>
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
                <Link to='/my-profile/add-education'>
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
                <Fragment>
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
                          <div className='mt-6 flex'>
                            <div className='flex-shrink-0 text-gray-600 hover:text-gray-800'>
                              <svg
                                  xmlns='http://www.w3.org/2000/svg'
                                  className='h-6 w-6'
                                  fill='none'
                                  viewBox='0 0 24 24'
                                  stroke='currentColor'
                                  strokeWidth='2'
                                >
                                  <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    d='M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z'
                                  />
                                </svg>
                            </div>
                            <div className='ml-3 text-base text-gray-500 hover:text-gray-700'>
                              <p>{user.exp} exp points</p>
                            </div>
                          </div>
                          <div className='mt-6 flex'>
                            <div className='flex-shrink-0 text-gray-600 hover:text-gray-800'>
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                className='h-6 w-6'
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
                            </div>
                            <div className='ml-3 text-base text-gray-500 hover:text-gray-700'>
                              <p>{lessonsLearned} lessons learned</p>
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
                          <div className='mt-5 flex'>
                            <div className='flex-shrink-0 text-gray-600 hover:text-gray-800'>
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                className='h-6 w-6'
                                fill='none'
                                viewBox='0 0 24 24'
                                stroke='currentColor'
                                strokeWidth='2'
                              >
                                <path
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  d='M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z'
                                />
                              </svg>
                            </div>
                            <div className='ml-3 text-base text-gray-500 hover:text-gray-700'>
                              <p>{solvedProblems} solved problems</p>
                            </div>
                          </div>
                          <div className='mt-6 flex'>
                            <div className='flex-shrink-0 text-gray-600 hover:text-gray-800'>
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                className='h-6 w-6'
                                fill='none'
                                viewBox='0 0 24 24'
                                stroke='currentColor'
                                strokeWidth='2'
                              >
                                <path
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4'
                                />
                              </svg>
                            </div>
                            <div className='ml-3 text-base text-gray-500 hover:text-gray-700'>
                              <p>{solvedQuizzes} quizzes completed</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='mt-5 text-base text-gray-800'>
                      {user.bio}
                    </div>
                  </div>

                  <div className='space-y-5 sm:space-y-4 mb-6'>
                    <h2 className='text-3xl font-extrabold tracking-tight sm:text-4xl'>
                      Experience
                    </h2>
                    {profile === null || profile.experience.length === 0 ? (
                      <p className='text-xl text-gray-500'>
                        You have not added any professional experience yet.
                      </p>
                    ) : (
                      <Experience
                        experience={profile.experience}
                        userId={user._id}
                      />
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
                      <Education
                        education={profile.education}
                        userId={user._id}
                      />
                    )}
                  </div>
                  {profile.githubUsername && (
                    <div className='space-y-5 sm:space-y-4 mb-6'>
                      <h2 className='text-3xl font-extrabold tracking-tight sm:text-4xl'>
                        Github Repos
                      </h2>
                      <GithubRepos username={profile.githubUsername} />
                    </div>
                  )}
                </Fragment>
              )}
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
