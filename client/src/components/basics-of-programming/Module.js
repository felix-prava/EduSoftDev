import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { getAllMaterials } from '../../actions/learning';
import { deleteLearningMaterial } from '../../actions/learning';
import MaterialItem from './MaterialItem';
import Spinner from '../layout/Spinner';
import Modal from '../layout/Modal';
import PageNotFound from '../layout/PageNotFound';
import { modulesTranslations } from '../layout/Translations';
import {
  INTRODUCTION_TITLE,
  INTRODUCTION_DESCRIPTION,
  IF_ELSE_TITLE,
  IF_ELSE_DESCRIPTION,
  WHILE_FOR_TITLE,
  WHILE_FOR_DESCRIPTION,
  ARRAYS_FUNCTIONS_TITLE,
  ARRAYS_FUNCTIONS_DESCRIPTION,
  MATRIX_STRINGS_TITLE,
  MATRIX_STRINGS_DESCRIPTION,
  DATABASE_OOP_TITLE,
  DATABASE_OOP_DESCRIPTION,
  BACKTRACKING_RECURSION_TITLE,
  BACKTRACKING_RECURSION_DESCRIPTION,
} from './modulesInformation';

const Module = ({
  auth: { user },
  learning: { loading, problems },
  getAllMaterials,
  deleteLearningMaterial,
}) => {
  let { module: moduleName } = useParams();
  let title = null;
  let description = null;
  let displayErrorPage = false;
  const language = user ? user.language : 'en';
  const addProblemLabel = modulesTranslations.addProblem[language];
  const addLessonLabel = modulesTranslations.addLesson[language];
  const addQuizLabel = modulesTranslations.addQuiz[language];
  const allLabel = modulesTranslations.all[language];
  const problemsLabel = modulesTranslations.problems[language];
  const lessonsLabel = modulesTranslations.lessons[language];
  const quizzesLabel = modulesTranslations.quizzes[language];
  const sortByLabel = modulesTranslations.sortBy[language];
  const mostSolvedLabel = modulesTranslations.mostSolved[language];
  const leastSolvedLabel = modulesTranslations.leastSolved[language];

  const [modal, setModal] = useState(false);
  const [modalData, setModalData] = useState([]);
  const [filterType, setFilterType] = useState('all'); // Default filter option is 'all'
  const [sortBy, setSortBy] = useState(''); // Default sorting option is empty

  let lessonsCount = 0;
  let problemsCount = 0;
  let quizzesCount = 0;

  useEffect(() => {
    getAllMaterials(`${moduleName}`);
  }, [getAllMaterials, moduleName]);

  switch (moduleName) {
    case 'introduction':
      title = INTRODUCTION_TITLE[language];
      description = INTRODUCTION_DESCRIPTION[language];
      break;
    case 'if-else':
      title = IF_ELSE_TITLE.second_type[language];
      description = IF_ELSE_DESCRIPTION[language];
      break;
    case 'while-for':
      title = WHILE_FOR_TITLE.second_type[language];
      description = WHILE_FOR_DESCRIPTION[language];
      break;
    case 'arrays-functions':
      title = ARRAYS_FUNCTIONS_TITLE.second_type[language];
      description = ARRAYS_FUNCTIONS_DESCRIPTION[language];
      break;
    case 'matrix-strings':
      title = MATRIX_STRINGS_TITLE.second_type[language];
      description = MATRIX_STRINGS_DESCRIPTION[language];
      break;
    case 'oop-db':
      title = DATABASE_OOP_TITLE.second_type[language];
      description = DATABASE_OOP_DESCRIPTION[language];
      break;
    case 'backtracking-recursion':
      title = BACKTRACKING_RECURSION_TITLE.second_type[language];
      description = BACKTRACKING_RECURSION_DESCRIPTION[language];
      break;
    default:
      displayErrorPage = true;
  }

  if (displayErrorPage) {
    return <PageNotFound />;
  }

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className='relative bg-gray-50 pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8'>
        <div className='absolute inset-0'>
          <div className='bg-white h-1/3 sm:h-2/3'></div>
        </div>
        <div className='relative max-w-7xl mx-auto'>
          <div className='text-center'>
            <h2 className='text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl'>
              {title}
            </h2>
            <p className='mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4'>
              {description}
            </p>
          </div>
          {user && (user.role === 'admin' || user.role === 'mentor') && (
            <div>
              <div className='mr-8 mb-4 flex justify-end'>
                <div className='mt-6 flex space-x-3'>
                  <Link to={`/modules/${moduleName}/create-problem`}>
                    <button
                      type='button'
                      className='inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500'
                    >
                      {addProblemLabel}
                    </button>
                  </Link>
                  <Link to={`/modules/${moduleName}/create-lesson`}>
                    <button
                      type='button'
                      className='inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500'
                    >
                      {addLessonLabel}
                    </button>
                  </Link>
                  <Link to={`/modules/${moduleName}/create-quiz`}>
                    <button
                      type='button'
                      className='inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500'
                    >
                      {addQuizLabel}
                    </button>
                  </Link>
                </div>
              </div>
              <div className='mr-8 flex justify-end'>
                <div className='flex space-x-3'>
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className='inline-flex items-center pl-4 pr-7 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500'
                  >
                    <option value='all'>{allLabel}</option>
                    <option value='Problem'>{problemsLabel}</option>
                    <option value='Lesson'>{lessonsLabel}</option>
                    <option value='Quiz'>{quizzesLabel}</option>
                  </select>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className='inline-flex items-center pl-4 pr-7 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500'
                  >
                    <option value=''>{sortByLabel}</option>
                    <option value='most-solved'>{mostSolvedLabel}</option>
                    <option value='least-solved'>{leastSolvedLabel}</option>
                  </select>
                </div>
              </div>
            </div>
          )}
          <div className='mt-6 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none'>
            {problems
              .filter((problem) => {
                console.log(problem.type);
                if (filterType === 'all') return true;
                return problem.type === filterType;
              })
              .sort((a, b) => {
                if (sortBy === 'most-solved') {
                  console.log(b.solvingUsers.length);
                  console.log(a.solvingUsers.length);
                  return b.solvingUsers.length - a.solvingUsers.length;
                }
                if (sortBy === 'least-solved') {
                  console.log(b.solvingUsers.length);
                  console.log(a.solvingUsers.length);
                  return a.solvingUsers.length - b.solvingUsers.length;
                }
                return 0; // No sorting by default
              })
              .map((problem, index) => (
                <MaterialItem
                  key={problem._id}
                  problem={problem}
                  userExp={user.exp}
                  module={moduleName}
                  index={
                    problem.type === 'Problem'
                      ? problemsCount++
                      : problem.type === 'Lesson'
                      ? lessonsCount++
                      : quizzesCount++
                  }
                  toggleModal={() => setModal(!modal)}
                  setModalData={setModalData}
                />
              ))}
          </div>
        </div>
      </div>
      {modal && (
        <Modal
          modalData={modalData}
          hideModal={() => setModal(false)}
          action={() => deleteLearningMaterial(modalData[2], modalData[3])}
          language={language}
        />
      )}
    </Fragment>
  );
};

Module.propTypes = {
  auth: PropTypes.object.isRequired,
  learning: PropTypes.object.isRequired,
  getAllMaterials: PropTypes.func.isRequired,
  deleteLearningMaterial: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  learning: state.learning,
});

export default connect(mapStateToProps, {
  getAllMaterials,
  deleteLearningMaterial,
})(Module);
