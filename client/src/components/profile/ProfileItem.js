import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProfileItem = ({
  profile: {
    user: { _id, firstName, lastName, email, avatar },
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
      <li className='py-10 px-6 bg-gray-800 text-center rounded-lg xl:px-10 xl:text-left'>
        <div className='space-y-6 xl:space-y-10'>
          <img
            className='mx-auto h-40 w-40 rounded-full xl:w-56 xl:h-56'
            src={avatar}
            alt=''
          />
          <div className='space-y-2 xl:flex xl:items-center xl:justify-between'>
            <div className='font-medium text-lg leading-6 space-y-1'>
              <h3 className='text-indigo-300'>
                {lastName} {firstName}
              </h3>
              <p className='text-indigo-400'>{status}</p>
              <p className='text-base text-indigo-300'>{email}</p>
            </div>
          </div>
          {social && (
            <div className='w-full inline-block align-middle space-y-2 '>
              <ul
                role='list'
                className='inline-block align-middle flex justify-center space-x-5'
              >
                {facebook && (
                  <li className='inline-block align-middle'>
                    <Link
                      to={facebook}
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
                    </Link>
                  </li>
                )}
                {instagram && (
                  <li>
                    <Link
                      to={instagram}
                      className='text-gray-400 hover:text-gray-300'
                    >
                      <span className='sr-only'>Instagram</span>
                      <svg
                        className='w-5 h-5 text-gray-400 hover:text-gray-300 fill-current'
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
                    </Link>
                  </li>
                )}
                {twitter && (
                  <li>
                    <Link
                      to={twitter}
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
                    </Link>
                  </li>
                )}
                {linkedin && (
                  <li>
                    <Link
                      to={linkedin}
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
                    </Link>
                  </li>
                )}
                {youtube && (
                  <li>
                    <Link
                      to={youtube}
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
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
      </li>
    </Fragment>
  );
};

ProfileItem.propTypes = {};

export default ProfileItem;
