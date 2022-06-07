import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const UserProfileGeneralInfo = ({
  profile: {
    user: { _id, firstName, lastName, email, username, avatar },
    status,
    social,
  },
}) => {
  let facebook = null,
    instagram = null,
    twitter = null,
    youtube = null,
    linkedin = null;
  if (social) {
    facebook = social.facebook;
    instagram = social.instagram;
    twitter = social.twitter;
    youtube = social.youtube;
    linkedin = social.linkedin;
  }
  return (
    <Fragment>
      <div className='lg:col-span-2'>
        <div className='bg-white mb-8'>
          <div className=''>
            <div className=''>
              <img
                className='h-40 w-40 rounded-full xl:w-56 xl:h-56'
                src={avatar}
                alt=''
              />
            </div>
          </div>
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
                      {lastName} {firstName}
                    </p>
                  </div>
                </div>
                <div className='mt-6 flex'>
                  <div className='flex-shrink-0 text-gray-600 hover:text-gray-800'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      class='h-6 w-6'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                      stroke-width='2'
                    >
                      <path
                        stroke-linecap='round'
                        stroke-linejoin='round'
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
                      class='h-6 w-6'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                      stroke-width='2'
                    >
                      <path
                        stroke-linecap='round'
                        stroke-linejoin='round'
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
                    <p>{username}</p>
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
                    <p>{email}</p>
                  </div>
                </div>
                <div className='mt-6 flex'>
                  <div className='flex-shrink-0 text-gray-600 hover:text-gray-800'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      class='h-6 w-6'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                      stroke-width='2'
                    >
                      <path
                        stroke-linecap='round'
                        stroke-linejoin='round'
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
        </div>
      </div>
    </Fragment>
  );
  return (
    <Fragment>
      <div className='py-10 px-6 bg-gray-800 text-center rounded-lg xl:px-10 xl:text-left'>
        <div className='space-y-6 xl:space-y-10'>
          <img
            className='mx-auto h-40 w-40 rounded-full xl:w-56 xl:h-56'
            src={avatar}
            alt=''
          />
          <div className='space-y-2 xl:flex xl:items-center xl:justify-between'>
            <div className='font-medium text-lg leading-6 space-y-1'>
              <h3 className='text-xl text-indigo-300'>
                {lastName} {firstName}
              </h3>
              <p className='text-xl text-indigo-400'>{status}</p>
              <p className='text-indigo-300'>{email}</p>
              <p className='text-indigo-400'>{username}</p>
            </div>
          </div>
          {social && (
            <div className='w-full inline-block align-middle space-y-2 '>
              <ul className='inline-block align-middle flex justify-center space-x-5'>
                {facebook && (
                  <li className='inline-block align-middle'>
                    <a
                      href={facebook}
                      className='text-gray-400 hover:text-gray-300'
                    >
                      <span className='sr-only'>Facebook</span>
                      <svg
                        className='w-5 h-5 text-gray-400 hover:text-gray-300 fill-current'
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 24 24'
                      >
                        <path d='M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' />
                      </svg>
                    </a>
                  </li>
                )}
                {instagram && (
                  <li>
                    <a
                      href={instagram}
                      className='text-gray-400 hover:text-gray-300'
                    >
                      <span className='sr-only'>Instagram</span>
                      <svg
                        className='w-5 h-5 text-gray-400 hover:text-gray-300 fill-current'
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 50 50'
                        width='50px'
                        height='50px'
                      >
                        {' '}
                        <path d='M 16 3 C 8.83 3 3 8.83 3 16 L 3 34 C 3 41.17 8.83 47 16 47 L 34 47 C 41.17 47 47 41.17 47 34 L 47 16 C 47 8.83 41.17 3 34 3 L 16 3 z M 37 11 C 38.1 11 39 11.9 39 13 C 39 14.1 38.1 15 37 15 C 35.9 15 35 14.1 35 13 C 35 11.9 35.9 11 37 11 z M 25 14 C 31.07 14 36 18.93 36 25 C 36 31.07 31.07 36 25 36 C 18.93 36 14 31.07 14 25 C 14 18.93 18.93 14 25 14 z M 25 16 C 20.04 16 16 20.04 16 25 C 16 29.96 20.04 34 25 34 C 29.96 34 34 29.96 34 25 C 34 20.04 29.96 16 25 16 z' />
                      </svg>
                    </a>
                  </li>
                )}
                {twitter && (
                  <li>
                    <a
                      href={twitter}
                      className='text-gray-400 hover:text-gray-300'
                    >
                      <span className='sr-only'>Twitter</span>
                      <svg
                        className='w-5 h-5'
                        fill='currentColor'
                        viewBox='0 0 20 20'
                        aria-hidden='true'
                      >
                        <path d='M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84' />
                      </svg>
                    </a>
                  </li>
                )}
                {linkedin && (
                  <li>
                    <a
                      href={linkedin}
                      className='text-gray-400 hover:text-gray-300'
                    >
                      <span className='sr-only'>LinkedIn</span>
                      <svg
                        className='w-5 h-5'
                        fill='currentColor'
                        viewBox='0 0 20 20'
                        aria-hidden='true'
                      >
                        <path
                          fillRule='evenodd'
                          d='M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z'
                          clipRule='evenodd'
                        />
                      </svg>
                    </a>
                  </li>
                )}
                {youtube && (
                  <li>
                    <a
                      href={youtube}
                      className='text-gray-400 hover:text-gray-300'
                    >
                      <span className='sr-only'>YouTube</span>
                      <svg
                        className='w-5 h-5 text-gray-400 hover:text-gray-300 fill-current'
                        fill='currentColor'
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 48 34'
                      >
                        <path
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
        </div>
      </div>
    </Fragment>
  );
};

UserProfileGeneralInfo.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default UserProfileGeneralInfo;
