import React, { Fragment, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CommentsSection from '../layout/CommentsSection';
import Spinner from '../layout/Spinner';
import { getLearningMaterial, solveProblem } from '../../actions/learning';
import { setAlert } from '../../actions/alert';
import {
  learningMaterialTranslations,
  universalTranslations,
} from '../layout/Translations';

const Problem = ({
  auth: { user },
  learning: { learningMaterial, loading },
  getLearningMaterial,
  solveProblem,
  setAlert,
}) => {
  const { module, problemId } = useParams();

  const language = user ? user.language : 'en';
  const sendSolutionLabel = learningMaterialTranslations.sendSolution[language];
  const exampleLabel = learningMaterialTranslations.example[language];
  const addYourSolutionLabel =
    learningMaterialTranslations.addYourSolution[language];
  const showHintLabel = learningMaterialTranslations.showHint[language];
  const hideHintLabel = learningMaterialTranslations.hideHint[language];
  const noEmptySolutionLabel =
    learningMaterialTranslations.noEmptySolution[language];
  const backButtonLabel = universalTranslations.backButton[language];
  const saveButtonLabel = universalTranslations.saveButton[language];
  const leaveCommentLabel = universalTranslations.leaveComment[language];

  function toggleHint(hintId, index) {
    let downArrow = document.getElementById(`down-arrow-${hintId}`);
    let upArrow = document.getElementById(`up-arrow-${hintId}`);
    let hintBody = document.getElementById(`hint-body-${hintId}`);
    let hintHeader = document.getElementById(`hint-header-${hintId}`);

    downArrow.classList.toggle('hidden');
    upArrow.classList.toggle('hidden');
    hintBody.classList.toggle('hidden');
    hintHeader.textContent = hintHeader.textContent.startsWith(showHintLabel)
      ? `${hideHintLabel} ${index}`
      : `${showHintLabel} ${index}`;
  }

  useEffect(() => {
    getLearningMaterial(problemId);
  }, [getLearningMaterial, problemId]);

  return loading || learningMaterial === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className='container mt-10'>
        <div className='mt-2 block'>
          <h2 className='text-3xl text-center tracking-tight font-extrabold text-gray-900 sm:text-4xl'>
            {learningMaterial.name}
          </h2>
          <div
            className='mt-10 text-base rich-text-body'
            dangerouslySetInnerHTML={{
              __html: learningMaterial.body,
            }}
          />
        </div>
        <div className='mt-2 block'>
          <ul className='divide-y divide-gray-200'>
            {learningMaterial.examples.map((example, index) => (
              <li className='py-4' key={example._id}>
                <div className='flex space-x-3'>
                  <div className='flex-1 space-y-1'>
                    <div className='mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6'>
                      <div className='sm:col-span-3'>
                        <div className='flex items-center justify-between'>
                          <h3 className='text-sm font-medium'>
                            {`${exampleLabel} ${index + 1}`}
                          </h3>
                        </div>
                        <p className='text-sm text-gray-500'>
                          Input: {example.input}
                        </p>
                        <p className='text-sm text-gray-500'>
                          Output: {example.output}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className='mt-16 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6'>
          <div className='sm:col-span-6 mr-4'>
            <label className='block text-sm font-medium text-gray-700'>
              {addYourSolutionLabel}
            </label>
            <div className='mt-2'>
              <textarea
                name='solution'
                id='solution-body'
                rows='3'
                className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md'
              ></textarea>
            </div>
          </div>
        </div>

        <div>
          <ul className='divide-y divide-gray-200 mt-10'>
            {learningMaterial.hints.map((hint, index) => (
              <li className='py-4' key={hint._id}>
                <div className='flex space-x-3'>
                  <div className='flex-1 space-y-1'>
                    <div className='flex items-center justify-between'>
                      <h3
                        className='text-sm font-medium'
                        id={`hint-header-${hint._id}`}
                      >
                        {`${showHintLabel} ${index + 1}`}
                      </h3>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='ml-2 h-5 w-5 cursor-pointer'
                        id={`down-arrow-${hint._id}`}
                        onClick={() => toggleHint(hint._id, index + 1)}
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                        strokeWidth='2'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M19 9l-7 7-7-7'
                        />
                      </svg>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='ml-2 h-5 w-5 cursor-pointer hidden'
                        id={`up-arrow-${hint._id}`}
                        onClick={() => toggleHint(hint._id, index + 1)}
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                        strokeWidth='2'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M5 15l7-7 7 7'
                        />
                      </svg>
                    </div>
                    <p
                      className='text-sm text-gray-500 hidden'
                      id={`hint-body-${hint._id}`}
                    >
                      {hint.body}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className='mt-4 pt-5'>
          <div className='flex justify-end mb-8'>
            <Link to={`/modules/${module}`}>
              <button
                type='button'
                className='bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-offset-2 focus:ring-indigo-500'
              >
                {backButtonLabel}
              </button>
            </Link>
            <button
              type='button'
              onClick={() => {
                let solutionBody =
                  document.getElementById('solution-body').value;
                if (solutionBody === '') {
                  setAlert(noEmptySolutionLabel, 'error');
                  return;
                }
                solveProblem(problemId, solutionBody);
              }}
              className='ml-3 mr-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-offset-2 focus:ring-indigo-500'
            >
              {sendSolutionLabel}
            </button>
          </div>
        </div>
      </div>
      <CommentsSection
        options={{
          object: learningMaterial,
          objectId: problemId,
          user,
          saveButtonLabel,
          leaveCommentLabel,
          resourceType: 'learning material',
        }}
      />
    </Fragment>
  );
};

Problem.propTypes = {
  auth: PropTypes.object.isRequired,
  learning: PropTypes.object.isRequired,
  getLearningMaterial: PropTypes.func.isRequired,
  solveProblem: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  learning: state.learning,
});

export default connect(mapStateToProps, {
  getLearningMaterial,
  solveProblem,
  setAlert,
})(Problem);
