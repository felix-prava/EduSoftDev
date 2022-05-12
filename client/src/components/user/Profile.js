import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getCurrentUserProfile } from '../../actions/profile';
import { Link } from 'react-router-dom';

const Profile = ({
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
              {profile === null ? (
                <Fragment>
                  <h2 className='text-3xl font-extrabold tracking-tight sm:text-4xl'>
                    You don't have a profile..
                  </h2>
                  <p className='text-xl text-gray-500'>
                    Tell us some things about you! You can also add school and
                    job experiences so we can better understand who are you.
                  </p>
                  <Link to='/create-profile'>
                    <button
                      type='button'
                      className='mt-6 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500'
                    >
                      Create Profile
                    </button>
                  </Link>
                </Fragment>
              ) : (
                <Fragment>
                  <h2 className='text-3xl font-extrabold tracking-tight sm:text-4xl'>
                    My profile
                  </h2>
                  <p className='text-xl text-gray-500'>
                    Nulla quam felis, enim faucibus proin velit, ornare id
                    pretium. Augue ultrices sed arcu condimentum vestibulum
                    suspendisse. Volutpat eu faucibus vivamus eget bibendum
                    cras.
                  </p>
                </Fragment>
              )}{' '}
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
                              class='h-6 w-6'
                              fill='none'
                              viewBox='0 0 24 24'
                              stroke='currentColor'
                              stroke-width='2'
                            >
                              <path
                                stroke-linecap='round'
                                stroke-linejoin='round'
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
                              class='h-6 w-6'
                              fill='none'
                              viewBox='0 0 24 24'
                              stroke='currentColor'
                              stroke-width='2'
                            >
                              <path
                                stroke-linecap='round'
                                stroke-linejoin='round'
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

              <div className='space-y-5 sm:space-y-4'>
                <h2 className='text-3xl font-extrabold tracking-tight sm:text-4xl'>
                  Profile
                </h2>
                <p className='text-xl text-gray-500'>
                  Nulla quam felis, enim faucibus proin velit, ornare id
                  pretium. Augue ultrices sed arcu condimentum vestibulum
                  suspendisse. Volutpat eu faucibus vivamus eget bibendum cras.
                </p>
              </div>
              <ul className='space-y-12 sm:divide-y sm:divide-gray-200 sm:space-y-0 sm:-mt-8 lg:gap-x-8 lg:space-y-0'>
                <li className='sm:py-8'>
                  <div className='space-y-4 sm:grid sm:grid-cols-3 sm:items-start sm:gap-6 sm:space-y-0'>
                    <div className='sm:col-span-2'>
                      <div className='space-y-4'>
                        <div className='text-lg leading-6 font-medium space-y-1'>
                          <h3>Leslie Alexander</h3>
                          <p className='text-indigo-600'>Co-Founder / CEO</p>
                        </div>
                        <div className='text-lg'>
                          <p className='text-gray-500'>
                            Ultricies massa malesuada viverra cras lobortis.
                            Tempor orci hac ligula dapibus mauris sit ut eu.
                            Eget turpis urna maecenas cras. Nisl dictum.
                          </p>
                        </div>
                        <ul className='flex space-x-5'>
                          <li>
                            <Link
                              to='#'
                              className='text-gray-400 hover:text-gray-500'
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
                          <li>
                            <Link
                              to='#'
                              className='text-gray-400 hover:text-gray-500'
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
                        </ul>
                      </div>
                    </div>
                  </div>
                </li>
                <li className='sm:py-8'>
                  <div className='space-y-4 sm:grid sm:grid-cols-3 sm:items-start sm:gap-6 sm:space-y-0'>
                    <div className='sm:col-span-2'>
                      <div className='space-y-4'>
                        <div className='text-lg leading-6 font-medium space-y-1'>
                          <h3>Leslie Alexander</h3>
                          <p className='text-indigo-600'>Co-Founder / CEO</p>
                        </div>
                        <div className='text-lg'>
                          <p className='text-gray-500'>
                            Ultricies massa malesuada viverra cras lobortis.
                            Tempor orci hac ligula dapibus mauris sit ut eu.
                            Eget turpis urna maecenas cras. Nisl dictum.
                          </p>
                        </div>
                        <ul className='flex space-x-5'>
                          <li>
                            <Link
                              to='#'
                              className='text-gray-400 hover:text-gray-500'
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
                          <li>
                            <Link
                              to='#'
                              className='text-gray-400 hover:text-gray-500'
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
                        </ul>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

Profile.propTypes = {
  getCurrentUserProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentUserProfile })(Profile);
