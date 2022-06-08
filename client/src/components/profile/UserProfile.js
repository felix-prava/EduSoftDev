import React, { Fragment, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getProfileById } from '../../actions/profile';
import Experience from './Experience';
import Education from './Education';

const UserProfile = ({
  profile: { profile, loading },
  auth: { user: currentUser },
  getProfileById,
}) => {
  let social,
    status,
    user = null;
  if (profile !== null) {
    social = profile.social;
    status = profile.status;
    user = profile.user;
  }
  const { id } = useParams();
  useEffect(() => {
    getProfileById(id);
  }, [getProfileById, id]);

  return (
    <Fragment>
      {profile === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          {' '}
          <div className='bg-white'>
            <div className='mx-auto py-12 px-4 max-w-7xl sm:px-6 lg:px-8 lg:py-24'>
              <div className='space-y-12 lg:grid lg:grid-cols-3 lg:gap-8 lg:space-y-0'>
                <div className='space-y-5 sm:space-y-4'>
                  <img
                    className='mb-2 mx-auto h-40 w-40 rounded-full xl:w-56 xl:h-56'
                    src={user.avatar}
                    alt=''
                  />
                  {currentUser._id === id && (
                    <Fragment>
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
                    </Fragment>
                  )}
                </div>

                <div className='lg:col-span-2'>
                  {profile && (
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
                                    d='M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                                  />
                                </svg>
                              </div>
                              <div className='ml-3 text-base text-gray-500 hover:text-gray-700'>
                                <p>{status}</p>
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
                                <p>0 EXP</p>
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
                                    d='M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253'
                                  />
                                </svg>
                              </div>
                              <div className='ml-3 text-base text-gray-500 hover:text-gray-700'>
                                <p>0 problems solved</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {social && (
                        <div className='mt-8 w-full inline-block align-left space-y-2 '>
                          <ul className='inline-block align-middle flex justify-center space-x-5'>
                            {social.facebook && (
                              <li className='inline-block align-left'>
                                <a
                                  href={social.facebook}
                                  className='text-gray-400 hover:text-gray-300'
                                >
                                  <span className='sr-only'>Facebook</span>
                                  <svg
                                    className='w-5 h-5 text-blue-700 fill-current'
                                    xmlns='http://www.w3.org/2000/svg'
                                    viewBox='0 0 24 24'
                                  >
                                    <path d='M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' />
                                  </svg>
                                </a>
                              </li>
                            )}
                            {social.instagram && (
                              <li>
                                <a
                                  href={social.instagram}
                                  className='text-gray-400 hover:text-gray-300'
                                >
                                  <span className='sr-only'>Instagram</span>
                                  <svg
                                    className='w-5 h-5'
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
                                        <stop
                                          offset='.09'
                                          stopColor='#fa8f21'
                                        />
                                        <stop
                                          offset='.78'
                                          stopColor='#d82d7e'
                                        />
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
                                </a>
                              </li>
                            )}
                            {social.twitter && (
                              <li>
                                <a
                                  href={social.twitter}
                                  className='text-gray-400 hover:text-gray-300'
                                >
                                  <span className='sr-only'>Twitter</span>
                                  <svg
                                    className='w-5 h-5 text-blue-300 fill-current'
                                    xmlns='http://www.w3.org/2000/svg'
                                    viewBox='0 0 24 24'
                                  >
                                    <path d='M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z' />
                                  </svg>
                                </a>
                              </li>
                            )}
                            {social.linkedin && (
                              <li>
                                <a
                                  href={social.linkedin}
                                  className='text-gray-400 hover:text-gray-300'
                                >
                                  <span className='sr-only'>LinkedIn</span>
                                  <svg
                                    className='w-5 h-5 text-blue-500 fill-current'
                                    xmlns='http://www.w3.org/2000/svg'
                                    viewBox='0 0 448 512'
                                  >
                                    <path d='M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z'></path>
                                  </svg>
                                </a>
                              </li>
                            )}
                            {social.youtube && (
                              <li>
                                <a
                                  href={social.youtube}
                                  className='text-gray-400 hover:text-gray-300'
                                >
                                  <span className='sr-only'>YouTube</span>
                                  <svg
                                    className='w-5 h-5'
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
                                </a>
                              </li>
                            )}
                          </ul>
                        </div>
                      )}
                      <div className='mt-5 text-base text-gray-800'>
                        {profile.bio}
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
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

UserProfile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getProfileById })(UserProfile);
