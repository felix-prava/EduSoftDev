import React, { Fragment, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getLearningMaterial } from '../../actions/learning';

function toggleHint(hintId, index) {
  let downArrow = document.getElementById(`down-arrow-${hintId}`);
  let upArrow = document.getElementById(`up-arrow-${hintId}`);
  let hintBody = document.getElementById(`hint-body-${hintId}`);
  let hintHeader = document.getElementById(`hint-header-${hintId}`);

  downArrow.classList.toggle('hidden');
  upArrow.classList.toggle('hidden');
  hintBody.classList.toggle('hidden');
  hintHeader.textContent = hintHeader.textContent.startsWith('Show')
    ? `Hide Hint ${index}`
    : `Show Hint ${index}`;
}

const Problem = ({
  getLearningMaterial,
  learning: { learningMaterial, loading },
}) => {
  const { module, problemId } = useParams();

  useEffect(() => {
    getLearningMaterial(problemId);
  }, [getLearningMaterial, problemId]);

  return loading || learningMaterial === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className='container mt-10 ml-4'>
        <div className='mt-2 block'>
          <h2 className='text-3xl text-center tracking-tight font-extrabold text-gray-900 sm:text-4xl'>
            {learningMaterial.name}
          </h2>
          <p className='mt-10 text-base text-gray-500'>
            {learningMaterial.body}
          </p>
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
                            {`Example ${index + 1}`}
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
          <div className='sm:col-span-6'>
            <label className='block text-sm font-medium text-gray-700'>
              {' '}
              Add Your Solution{' '}
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
                        {`Show Hint ${index + 1}`}
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
                Go Back
              </button>
            </Link>
            <button
              type='button'
              className='ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-offset-2 focus:ring-indigo-500'
            >
              Send Solution
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

Problem.propTypes = {
  learning: PropTypes.object.isRequired,
  getLearningMaterial: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  learning: state.learning,
});

export default connect(mapStateToProps, {
  getLearningMaterial,
})(Problem);
