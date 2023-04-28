import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NormalSolutionItem from '../solutions/NormalSolutionItem';
import SmallSolutionItem from '../solutions/SmallSolutionItem';
import Spinner from '../layout/Spinner';
import {
  dashboardTranslations,
  universalTranslations,
} from '../layout/Translations';
import { capitalizeWords } from '../../utils/helpers';
import { getUserSolutions } from '../../actions/solution';

const Dashboard = ({
  auth: { user, loading },
  solution: { solutions, loading: solutionsLoading },
  getUserSolutions,
}) => {
  useEffect(() => {
    getUserSolutions(user && user._id);
  }, [user, getUserSolutions]);

  const language = user ? user.language : 'en';
  const helloLabel = dashboardTranslations.hello[language];
  const verifiedAccountLabel = dashboardTranslations.verifiedAccount[language];
  const continueLearningLabel =
    dashboardTranslations.continueLearning[language];
  const solvedProblemsLabel = universalTranslations.solvedProblems[language];
  const lessonsLearnedLabel = universalTranslations.lessonsLearned[language];
  const quizzesCompletedLabel =
    universalTranslations.quizzesCompleted[language];
  const overviewLabel = dashboardTranslations.overview[language];
  const viewAllLabel = dashboardTranslations.viewAll[language];
  const recentSolutionsLabel = dashboardTranslations.recentSolutions[language];
  const problemLabel = dashboardTranslations.problem[language];
  const statusLabel = universalTranslations.status[language];
  const scoreLabel = dashboardTranslations.score[language];
  const dateLabel = dashboardTranslations.date[language];

  return loading || solutionsLoading || user === null ? (
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
                            {helloLabel}, {user.lastName} {user.firstName}
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
                            {verifiedAccountLabel}
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
                      {continueLearningLabel}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className='mt-8'>
              <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
                <h2 className='text-lg leading-6 font-medium text-gray-900'>
                  {overviewLabel}
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
                              {capitalizeWords(solvedProblemsLabel)}
                            </dt>
                            <dd>
                              <div className='text-lg font-medium text-gray-900'>
                                {(user.solvedProblems &&
                                  user.solvedProblems.length) ||
                                  0}
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
                          {viewAllLabel}
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
                              {capitalizeWords(lessonsLearnedLabel)}
                            </dt>
                            <dd>
                              <div className='text-lg font-medium text-gray-900'>
                                {(user.lessonsLearned &&
                                  user.lessonsLearned.length) ||
                                  0}
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
                          {viewAllLabel}
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
                              {capitalizeWords(quizzesCompletedLabel)}
                            </dt>
                            <dd>
                              <div className='text-lg font-medium text-gray-900'>
                                {(user.solvedQuizzes &&
                                  user.solvedQuizzes.length) ||
                                  0}
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
                          {viewAllLabel}
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* More items... */}
                </div>
              </div>

              <h2 className='max-w-6xl mx-auto mt-8 px-4 text-lg leading-6 font-medium text-gray-900 sm:px-6 lg:px-8'>
                {recentSolutionsLabel}
              </h2>

              {/* Activity list (smallest breakpoint only) */}
              <div className='shadow sm:hidden'>
                <ul className='mt-2 divide-y divide-gray-200 overflow-hidden shadow sm:hidden'>
                  {solutions.map((solution) => (
                    <SmallSolutionItem key={solution._id} solution={solution} />
                  ))}
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
                              {problemLabel}
                            </th>
                            <th className='px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                              {statusLabel}
                            </th>
                            <th className='px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                              {scoreLabel}
                            </th>
                            <th className='px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>
                              {dateLabel}
                            </th>
                          </tr>
                        </thead>
                        <tbody className='bg-white divide-y divide-gray-200'>
                          {solutions.map((solution) => (
                            <NormalSolutionItem
                              key={solution._id}
                              solution={solution}
                            />
                          ))}
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
  solution: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  solution: state.solution,
  getUserSolutions: PropTypes.func.isRequired,
});

export default connect(mapStateToProps, { getUserSolutions })(Dashboard);
