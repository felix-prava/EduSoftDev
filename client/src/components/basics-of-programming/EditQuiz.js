import React, { Fragment, useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getLearningMaterial,
  updateLearningMaterial,
  addAnswer,
  deleteAnswer,
} from '../../actions/learning';
import TextEditor from '../layout/TextEditor';
import Spinner from '../layout/Spinner';
import { setAlert } from '../../actions/alert';

const EditQuiz = ({
  learning: { learningMaterial, loading },
  getLearningMaterial,
  updateLearningMaterial,
  addAnswer,
  deleteAnswer,
  setAlert,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    module: '',
    expNeeded: '',
    expGained: '',
    expMax: '',
    body: '',
    shortDescription: '',
    failedQuizMessage: '',
    waitingMinutes: '',
    wrongAnswers: [],
    rightAnswers: [],
  });

  const {
    name,
    module,
    expNeeded,
    expGained,
    expMax,
    body,
    shortDescription,
    failedQuizMessage,
    waitingMinutes,
    wrongAnswers,
    rightAnswers,
  } = formData;

  let wrongAnswersField = null;
  let rightAnswersField = null;

  const addNewAnswer = function (answerType) {
    if (answerType === 'wrongAnswer') {
      if (wrongAnswersField === null) {
        wrongAnswersField = document.getElementById('wrong-answer-field');
      }
      if (wrongAnswersField.value === '') {
        setAlert("You can't add an empty answer", 'error', 3500);
        return;
      }
      addAnswer(learningMaterial._id, 'wrongAnswer', {
        body: wrongAnswersField.value,
      });
      wrongAnswersField.value = null;
      return;
    }
    if (rightAnswersField === null) {
      rightAnswersField = document.getElementById('right-answer-field');
    }
    if (rightAnswersField.value === '') {
      setAlert("You can't add an empty answer", 'error', 3500);
      return;
    }
    addAnswer(learningMaterial._id, 'rightAnswer', {
      body: rightAnswersField.value,
    });
    rightAnswersField.value = null;
  };

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    updateLearningMaterial(formData, quizId, learningMaterial.type);
  };

  const { quizId } = useParams();
  useEffect(() => {
    if (!learningMaterial || learningMaterial._id !== quizId)
      getLearningMaterial(quizId);
    if (learningMaterial) {
      setFormData({
        name: learningMaterial.name || '',
        module: learningMaterial.module || '',
        expNeeded: learningMaterial.expNeeded || '',
        expGained: learningMaterial.expGained || '',
        expMax: learningMaterial.expMax || '',
        body: learningMaterial.body || '',
        shortDescription: learningMaterial.shortDescription || '',
        failedQuizMessage: learningMaterial.failedQuizMessage || '',
        waitingMinutes: learningMaterial.waitingMinutes || '',
        wrongAnswers: learningMaterial.wrongAnswers || [],
        rightAnswers: learningMaterial.rightAnswers || [],
      });
    }
  }, [getLearningMaterial, learningMaterial, quizId]);

  return loading || learningMaterial === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className='container mt-8'>
        <form
          className='space-y-8 divide-y divide-gray-200'
          onSubmit={(e) => onSubmit(e)}
        >
          <div className='space-y-8 divide-y divide-gray-200'>
            <div>
              <div>
                <h3 className='text-2xl font-bold leading-6 font-medium text-gray-900 sm:text-2xl'>
                  Edit lesson
                </h3>
              </div>

              <div className='mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6'>
                <div className='sm:col-span-6'>
                  <label
                    htmlFor='name'
                    className='block text-sm font-medium text-gray-700'
                  >
                    {' '}
                    What's the title of this lesson?{' '}
                  </label>
                  <div className='mt-1'>
                    <input
                      type='text'
                      name='name'
                      value={name}
                      onChange={(e) => onChange(e)}
                      className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
                    />
                  </div>
                </div>
              </div>

              <div className='space-y-8 divide-y divide-gray-200'>
                <div className='pt-8'>
                  <div className='grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6'>
                    <div className='sm:col-span-2'>
                      <label
                        htmlFor='expNeeded'
                        className='block text-sm font-medium text-gray-700'
                      >
                        {' '}
                        Experience Needed{' '}
                      </label>
                      <div className='mt-1'>
                        <input
                          type='number'
                          step='any'
                          name='expNeeded'
                          value={expNeeded}
                          onChange={(e) => onChange(e)}
                          className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
                        />
                      </div>
                    </div>

                    <div className='sm:col-span-2'>
                      <label
                        htmlFor='expGained'
                        className='block text-sm font-medium text-gray-700'
                      >
                        {' '}
                        Experience Gained{' '}
                      </label>
                      <div className='mt-1'>
                        <input
                          type='number'
                          step='any'
                          name='expGained'
                          value={expGained}
                          onChange={(e) => onChange(e)}
                          className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
                        />
                      </div>
                    </div>

                    <div className='sm:col-span-2'>
                      <label
                        htmlFor='expMax'
                        className='block text-sm font-medium text-gray-700'
                      >
                        {' '}
                        Max Experience{' '}
                      </label>
                      <div className='mt-1'>
                        <input
                          type='number'
                          name='expMax'
                          value={expMax}
                          onChange={(e) => onChange(e)}
                          className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className='mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6'>
                <div className='sm:col-span-6'>
                  <label
                    htmlFor='body'
                    className='block text-sm font-medium text-gray-700'
                  >
                    {' '}
                    Body{' '}
                  </label>
                  <div className='mt-1'>
                    <div className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md'>
                      <TextEditor
                        setFormData={setFormData}
                        formData={formData}
                        fieldName='body'
                        fieldValue={body}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className='mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6'>
                <div className='sm:col-span-6'>
                  <label
                    htmlFor='shortDescription'
                    className='block text-sm font-medium text-gray-700'
                  >
                    {' '}
                    Short description{' '}
                  </label>
                  <div className='mt-1'>
                    <input
                      type='text'
                      name='shortDescription'
                      value={shortDescription}
                      onChange={(e) => onChange(e)}
                      className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className='space-y-8 divide-y divide-gray-200'>
              <div className='pt-8'>
                <div className='grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6'>
                  <div className='sm:col-span-3'>
                    <label
                      htmlFor='failedQuizMessage'
                      className='block text-sm font-medium text-gray-700'
                    >
                      {' '}
                      Message for Failed Quiz{' '}
                    </label>
                    <div className='mt-1'>
                      <input
                        type='text'
                        name='failedQuizMessage'
                        value={failedQuizMessage}
                        onChange={(e) => onChange(e)}
                        className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
                      />
                    </div>
                  </div>

                  <div className='sm:col-span-3'>
                    <label
                      htmlFor='waitingMinutes'
                      className='block text-sm font-medium text-gray-700'
                    >
                      {' '}
                      Waiting Minutes{' '}
                    </label>
                    <div className='mt-1'>
                      <input
                        type='number'
                        name='waitingMinutes'
                        value={waitingMinutes}
                        onChange={(e) => onChange(e)}
                        className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div>
                <h1 className='mt-6 font-xl font-bold leading-6 font-medium text-gray-900 sm:text-xl'>
                  Wrong Answers
                </h1>
              </div>
              <div className='mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6'>
                <div className='sm:col-span-6'>
                  <label className='block text-sm font-medium text-gray-700'>
                    {' '}
                    Wrong Answer{' '}
                  </label>
                  <div className='mt-1'>
                    <input
                      type='text'
                      id='wrong-answer-field'
                      className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
                    />
                  </div>
                </div>
              </div>
              <div className='mt-6 flex justify-end mb-8'>
                <button
                  type='button'
                  onClick={() => addNewAnswer('wrongAnswer')}
                  className='ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-offset-2 focus:ring-indigo-500'
                >
                  Add Wrong Answer
                </button>
              </div>

              <div>
                <ul className='divide-y divide-gray-200'>
                  {wrongAnswers.map((wrongAnswer, index) => (
                    <li className='py-4' key={wrongAnswer._id}>
                      <div className='flex space-x-3'>
                        <div className='flex-1 space-y-1'>
                          <div className='flex items-center justify-between'>
                            <h3 className='text-sm font-medium'>
                              {`Wrong answer ${index + 1}`}
                            </h3>
                            <p className='text-sm text-gray-500'>
                              {learningMaterial && (
                                <button
                                  className='bg-red-600 border border-transparent rounded-md shadow-sm py-1 px-3 flex items-center inline-flex justify-center ml-4 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600'
                                  onClick={(e) => {
                                    e.preventDefault();
                                    deleteAnswer(
                                      learningMaterial._id,
                                      'wrongAnswers',
                                      wrongAnswer._id
                                    );
                                  }}
                                >
                                  <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    className='h-5 w-5'
                                    viewBox='0 0 20 20'
                                    fill='currentColor'
                                  >
                                    <path
                                      fillRule='evenodd'
                                      d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                                      clipRule='evenodd'
                                    />
                                  </svg>
                                </button>
                              )}
                            </p>
                          </div>
                          <p className='text-sm text-gray-500'>
                            {wrongAnswer.body}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <div>
                <h1 className='mt-6 font-xl font-bold leading-6 font-medium text-gray-900 sm:text-xl'>
                  Right Answers
                </h1>
              </div>
              <div className='mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6'>
                <div className='sm:col-span-6'>
                  <label className='block text-sm font-medium text-gray-700'>
                    {' '}
                    Right Answer{' '}
                  </label>
                  <div className='mt-1'>
                    <input
                      type='text'
                      id='right-answer-field'
                      className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
                    />
                  </div>
                </div>
              </div>
              <div className='mt-6 flex justify-end mb-8'>
                <button
                  type='button'
                  onClick={() => addNewAnswer('rightAnswer')}
                  className='ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-offset-2 focus:ring-indigo-500'
                >
                  Add Right Answer
                </button>
              </div>

              <div>
                <ul className='divide-y divide-gray-200'>
                  {rightAnswers.map((rightAnswer, index) => (
                    <li className='py-4' key={rightAnswer._id}>
                      <div className='flex space-x-3'>
                        <div className='flex-1 space-y-1'>
                          <div className='flex items-center justify-between'>
                            <h3 className='text-sm font-medium'>
                              {`Right answer ${index + 1}`}
                            </h3>
                            <p className='text-sm text-gray-500'>
                              {learningMaterial && (
                                <button
                                  className='bg-red-600 border border-transparent rounded-md shadow-sm py-1 px-3 flex items-center inline-flex justify-center ml-4 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600'
                                  onClick={(e) => {
                                    e.preventDefault();
                                    deleteAnswer(
                                      learningMaterial._id,
                                      'rightAnswers',
                                      rightAnswer._id
                                    );
                                  }}
                                >
                                  <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    className='h-5 w-5'
                                    viewBox='0 0 20 20'
                                    fill='currentColor'
                                  >
                                    <path
                                      fillRule='evenodd'
                                      d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                                      clipRule='evenodd'
                                    />
                                  </svg>
                                </button>
                              )}
                            </p>
                          </div>
                          <p className='text-sm text-gray-500'>
                            {rightAnswer.body}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className='pt-5'>
            <div className='flex justify-end mb-8'>
              <Link to={`/modules/${module}`}>
                <button
                  type='button'
                  className='bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-offset-2 focus:ring-indigo-500'
                >
                  Cancel
                </button>
              </Link>
              <button
                type='submit'
                className='ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-offset-2 focus:ring-indigo-500'
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

EditQuiz.propTypes = {
  learning: PropTypes.object.isRequired,
  getLearningMaterial: PropTypes.func.isRequired,
  updateLearningMaterial: PropTypes.func.isRequired,
  addAnswer: PropTypes.func.isRequired,
  deleteAnswer: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  learning: state.learning,
});

export default connect(mapStateToProps, {
  getLearningMaterial,
  updateLearningMaterial,
  addAnswer,
  deleteAnswer,
  setAlert,
})(EditQuiz);
