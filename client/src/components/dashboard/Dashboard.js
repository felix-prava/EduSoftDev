import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';

const Dashboard = ({
  auth: { user, loading, solvedProblems, lessonsLearned, quizzesSolved },
}) => {
  return loading || user === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className='min-h-full'>
        <div className='lg:pl-32 flex flex-col flex-1'>
          <div className='relative z-10 flex-shrink-0 flex h-16 bg-white border-b border-gray-200 lg:border-none'></div>
          <main className='flex-1 pb-8'>
            {/* Page header */}
            <div className='bg-white shadow'>
              <div className='px-4 sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8'>
                <div className='py-6 md:flex md:items-center md:justify-between lg:border-t lg:border-gray-200'>
                  <div className='flex-1 min-w-0'>
                    {/* Profile */}
                    <div className='flex items-center'>
                      <img
                        className='hidden h-16 w-16 rounded-full sm:block'
                        src={user.avatar}
                        alt=''
                      />
                      <div>
                        <div className='flex items-center'>
                          <img
                            className='h-16 w-16 rounded-full sm:hidden'
                            src={user.avatar}
                            alt=''
                          />

                          <h1 className='ml-3 text-2xl font-bold leading-7 text-gray-900 sm:leading-9 sm:truncate'>
                            Hello, {user.lastName} {user.firstName}
                          </h1>
                        </div>
                        <dl className='mt-6 flex flex-col sm:ml-3 sm:mt-1 sm:flex-row sm:flex-wrap'>
                          <dd className='mt-3 flex items-center text-sm text-gray-500 font-medium sm:mr-6 sm:mt-0 capitalize'>
                            {/* Heroicon name: solid/check-circle */}
                            <svg
                              className='flex-shrink-0 mr-1.5 h-5 w-5 text-green-400'
                              xmlns='http://www.w3.org/2000/svg'
                              viewBox='0 0 20 20'
                              fill='currentColor'
                              aria-hidden='true'
                            >
                              <path
                                fillRule='evenodd'
                                d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                                clipRule='evenodd'
                              />
                            </svg>
                            Verified account
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                  <div className='mt-6 flex space-x-3 md:mt-0 md:ml-4'>
                    <button
                      type='button'
                      className='inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500'
                    >
                      Continue Learning
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className='mt-8'>
              <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
                <h2 className='text-lg leading-6 font-medium text-gray-900'>
                  Overview
                </h2>
                <div className='mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3'>
                  {/* Card */}
                  <div className='bg-white overflow-hidden shadow rounded-lg'>
                    <div className='p-5'>
                      <div className='flex items-center'>
                        <div className='flex-shrink-0'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='h-6 w-6 text-gray-400'
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
                        <div className='ml-5 w-0 flex-1'>
                          <dl>
                            <dt className='text-sm font-medium text-gray-500 truncate'>
                              Solved Problems
                            </dt>
                            <dd>
                              <div className='text-lg font-medium text-gray-900'>
                                {(solvedProblems && solvedProblems.length) || 0}
                              </div>
                            </dd>
                          </dl>
                        </div>
                      </div>
                    </div>
                    <div className='bg-gray-50 px-5 py-3'>
                      <div className='text-sm'>
                        <Link
                          to='#'
                          className='font-medium text-cyan-700 hover:text-cyan-900'
                        >
                          {' '}
                          View all{' '}
                        </Link>
                      </div>
                    </div>
                  </div>

                  <div className='bg-white overflow-hidden shadow rounded-lg'>
                    <div className='p-5'>
                      <div className='flex items-center'>
                        <div className='flex-shrink-0'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='h-6 w-6 text-gray-400'
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
                        <div className='ml-5 w-0 flex-1'>
                          <dl>
                            <dt className='text-sm font-medium text-gray-500 truncate'>
                              Lessons Learned
                            </dt>
                            <dd>
                              <div className='text-lg font-medium text-gray-900'>
                                {(lessonsLearned && lessonsLearned.length) || 0}
                              </div>
                            </dd>
                          </dl>
                        </div>
                      </div>
                    </div>
                    <div className='bg-gray-50 px-5 py-3'>
                      <div className='text-sm'>
                        <Link
                          to='#'
                          className='font-medium text-cyan-700 hover:text-cyan-900'
                        >
                          {' '}
                          View all{' '}
                        </Link>
                      </div>
                    </div>
                  </div>

                  <div className='bg-white overflow-hidden shadow rounded-lg'>
                    <div className='p-5'>
                      <div className='flex items-center'>
                        <div className='flex-shrink-0'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='h-6 w-6 text-gray-400'
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
                        <div className='ml-5 w-0 flex-1'>
                          <dl>
                            <dt className='text-sm font-medium text-gray-500 truncate'>
                              Quizzes Completed
                            </dt>
                            <dd>
                              <div className='text-lg font-medium text-gray-900'>
                                {(quizzesSolved && quizzesSolved.length) || 0}
                              </div>
                            </dd>
                          </dl>
                        </div>
                      </div>
                    </div>
                    <div className='bg-gray-50 px-5 py-3'>
                      <div className='text-sm'>
                        <Link
                          to='#'
                          className='font-medium text-cyan-700 hover:text-cyan-900'
                        >
                          {' '}
                          View all{' '}
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* More items... */}
                </div>
              </div>

              <h2 className='max-w-6xl mx-auto mt-8 px-4 text-lg leading-6 font-medium text-gray-900 sm:px-6 lg:px-8'>
                Recent solutions
              </h2>

              {/* Activity list (smallest breakpoint only) */}
              <div className='shadow sm:hidden'>
                <ul className='mt-2 divide-y divide-gray-200 overflow-hidden shadow sm:hidden'>
                  <li>
                    <Link
                      to='#'
                      className='block px-4 py-4 bg-white hover:bg-gray-50'
                    >
                      <span className='flex items-center space-x-4'>
                        <span className='flex-1 flex space-x-2 truncate'>
                          {/* Heroicon name: solid/cash */}
                          <svg
                            className='flex-shrink-0 h-5 w-5 text-gray-400'
                            xmlns='http://www.w3.org/2000/svg'
                            viewBox='0 0 20 20'
                            fill='currentColor'
                            aria-hidden='true'
                          >
                            <path
                              fillRule='evenodd'
                              d='M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z'
                              clipRule='evenodd'
                            />
                          </svg>
                          <span className='flex flex-col text-gray-500 text-sm truncate'>
                            <span className='truncate'>
                              Payment to Molly Sanders
                            </span>
                            <span>
                              <span className='text-gray-900 font-medium'>
                                $20,000
                              </span>{' '}
                              USD
                            </span>
                            <time dateTime='2020-07-11'>July 11, 2020</time>
                          </span>
                        </span>
                        {/* Heroicon name: solid/chevron-right */}
                        <svg
                          className='flex-shrink-0 h-5 w-5 text-gray-400'
                          xmlns='http://www.w3.org/2000/svg'
                          viewBox='0 0 20 20'
                          fill='currentColor'
                          aria-hidden='true'
                        >
                          <path
                            fillRule='evenodd'
                            d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
                            clipRule='evenodd'
                          />
                        </svg>
                      </span>
                    </Link>
                  </li>

                  {/* More transactions... */}
                </ul>
              </div>

              {/* Activity table (small breakpoint and up) */}
              <div className='hidden sm:block'>
                <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
                  <div className='flex flex-col mt-2'>
                    <div className='align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg'>
                      <table className='min-w-full divide-y divide-gray-200'>
                        <thead>
                          <tr>
                            <th className='px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                              Problem
                            </th>
                            <th className='hidden px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider md:block'>
                              Status
                            </th>
                            <th className='px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>
                              Date
                            </th>
                          </tr>
                        </thead>
                        <tbody className='bg-white divide-y divide-gray-200'>
                          <tr className='bg-white'>
                            <td className='max-w-0 w-full px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                              <div className='flex'>
                                <Link
                                  to='#'
                                  className='group inline-flex space-x-2 truncate text-sm'
                                >
                                  {/* Heroicon name: solid/cash */}
                                  <svg
                                    className='flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-500'
                                    xmlns='http://www.w3.org/2000/svg'
                                    viewBox='0 0 20 20'
                                    fill='currentColor'
                                    aria-hidden='true'
                                  >
                                    <path
                                      fillRule='evenodd'
                                      d='M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z'
                                      clipRule='evenodd'
                                    />
                                  </svg>
                                  <p className='text-gray-500 truncate group-hover:text-gray-900'>
                                    Payment to Molly Sanders
                                  </p>
                                </Link>
                              </div>
                            </td>
                            <td className='hidden px-6 py-4 whitespace-nowrap text-sm text-gray-500 md:block'>
                              <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 capitalize'>
                                {' '}
                                success{' '}
                              </span>
                            </td>
                            <td className='px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500'>
                              <time dateTime='2020-07-11'>July 11, 2020</time>
                            </td>
                          </tr>

                          {/* More transactions... */}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </Fragment>
  );
};

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Dashboard);
