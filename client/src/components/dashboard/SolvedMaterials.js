import React, { Fragment, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import {
  dashboardTranslations,
  universalTranslations,
} from '../layout/Translations';
import { displayDate } from '../../utils/helpers';
import { getUserSolutions } from '../../actions/solution';

const SolvedMaterials = ({ auth: { user, loading }, getUserSolutions }) => {
  useEffect(() => {
    getUserSolutions(user && user._id);
  }, [user, getUserSolutions]);
  const language = user ? user.language : 'en';
  const viewLabel = dashboardTranslations.view[language];
  const noSolvedProblemsMessage =
    dashboardTranslations.noSolvedProblemsMessage[language];
  const noLearnedLessonsMessage =
    dashboardTranslations.noLearnedLessonsMessage[language];
  const noSolvedQuizzesMessage =
    dashboardTranslations.noSolvedQuizzesMessage[language];
  const backButtonLabel = universalTranslations.backButton[language];

  const location = useLocation();
  const currentPath = location.pathname;
  let materials = null;
  let listType = null;
  let noMaterialsFoundMessage = 'solved materials';

  if (user) {
    materials = user.solvedProblems;
    listType = 'problems';
    noMaterialsFoundMessage = noSolvedProblemsMessage;

    if (currentPath === '/lessons-learned') {
      materials = user.lessonsLearned;
      listType = 'lessons';
      noMaterialsFoundMessage = noLearnedLessonsMessage;
    }
    if (currentPath === '/completed-quizzes') {
      materials = user.solvedQuizzes;
      listType = 'quizzes';
      noMaterialsFoundMessage = noSolvedQuizzesMessage;
    }
  }

  return loading || user === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className='container'>
        <div className='mt-6 bg-white shadow'>
          <div className='px-4 sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8'>
            <div className='py-6 md:flex md:items-center md:justify-between lg:border-t lg:border-gray-200'>
              <div className='flex-1 min-w-0'>
                {user && materials.length > 0 ? (
                  <ul role='list' className='divide-y divide-gray-100'>
                    {materials.map((material) => (
                      <li
                        key={material._id}
                        className='flex items-center justify-between gap-x-6 py-5'
                      >
                        <div className='flex gap-x-4'>
                          <div className='min-w-0 flex-auto'>
                            <p className='text-sm font-semibold leading-6 text-gray-900'>
                              {material.name || 'No name'}
                            </p>
                            <p className='mt-1 truncate text-xs leading-5 text-gray-500'>
                              <time dateTime={material.date}>
                                {' '}
                                {displayDate(material.date, language)}
                              </time>
                            </p>
                          </div>
                        </div>
                        <Link
                          to={`/${material.module}/${listType}/${
                            material.problem || material.lesson || material.quiz
                          }`}
                          className='rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
                        >
                          {viewLabel}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  noMaterialsFoundMessage
                )}
              </div>
            </div>
          </div>
        </div>

        <div className='pt-5'>
          <div className='flex justify-end mb-8'>
            <Link to='/home'>
              <button
                type='button'
                className='bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-offset-2 focus:ring-indigo-500'
              >
                {backButtonLabel}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

SolvedMaterials.propTypes = {
  auth: PropTypes.object.isRequired,
  solution: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  solution: state.solution,
  getUserSolutions: PropTypes.func.isRequired,
});

export default connect(mapStateToProps, { getUserSolutions })(SolvedMaterials);
