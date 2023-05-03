import React, { Fragment, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addLearningMaterial } from '../../actions/learning';
import { setAlert } from '../../actions/alert';
import {
  learningMaterialTranslations,
  universalTranslations,
} from '../layout/Translations';
import TextEditor from '../layout/TextEditor';

const CreateQuiz = ({ auth: { user }, addLearningMaterial, setAlert }) => {
  const { module } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    module: module,
    expNeeded: '',
    expGained: '',
    expMax: '',
    body: '',
    shortDescription: '',
    waitingMinutes: 5,
    failedQuizMessage: '',
    wrongAnswers: [],
    rightAnswers: [],
  });

  const {
    name,
    expNeeded,
    expGained,
    expMax,
    shortDescription,
    wrongAnswers,
    rightAnswers,
    waitingMinutes,
    failedQuizMessage,
  } = formData;

  let wrongAnswersField = null;
  let wrongAnswerHeader = null;

  let rightAnswersField = null;
  let rightAnswerHeader = null;

  const language = user ? user.language : 'en';
  const addQuizTitleLabel = learningMaterialTranslations.addQuizTitle[language];
  const quizNameLabel = learningMaterialTranslations.quizName[language];
  const expNeededLabel = learningMaterialTranslations.expNeeded[language];
  const expGainedLabel = learningMaterialTranslations.expGained[language];
  const expMaxLabel = learningMaterialTranslations.expMax[language];
  const failedQuizMessageLabel =
    learningMaterialTranslations.failedQuizMessage[language];
  const waitingMinutesLabel =
    learningMaterialTranslations.waitingMinutes[language];
  const wrongAnswersLabel = learningMaterialTranslations.wrongAnswers[language];
  const wrongAnswerLabel = learningMaterialTranslations.wrongAnswer[language];
  const addWrongAnswerLabel =
    learningMaterialTranslations.addWrongAnswer[language];
  const rightAnswersLabel = learningMaterialTranslations.rightAnswers[language];
  const rightAnswerLabel = learningMaterialTranslations.rightAnswer[language];
  const addRightAnswerLabel =
    learningMaterialTranslations.addRightAnswer[language];
  const noEmptyAnswerMessage =
    learningMaterialTranslations.noEmptyAnswer[language];
  const addNewAnswerMessage =
    learningMaterialTranslations.addNewAnswer[language];

  const bodyLabel = universalTranslations.body[language];
  const shortDescriptionLabel =
    universalTranslations.shortDescription[language];
  const saveButtonLabel = universalTranslations.saveButton[language];
  const cancelButtonLabel = universalTranslations.cancelButton[language];

  const addWrongAnswer = function () {
    if (wrongAnswersField === null) {
      wrongAnswersField = document.getElementById('wrong-answer-field');
    }
    if (wrongAnswerHeader === null) {
      wrongAnswerHeader = document.getElementById('wrong-answers-header');
    }
    if (wrongAnswersField.value === '') {
      setAlert(`${noEmptyAnswerMessage}`, 'error', 3500);
      return;
    }
    wrongAnswers.push({
      body: wrongAnswersField.value,
    });
    wrongAnswersField.value = null;
    wrongAnswerHeader.textContent = `Wrong Answers (${wrongAnswers.length})`;
    setAlert(`${addNewAnswerMessage}`, 'success', 2000, false);
  };

  const addRightAnswer = function () {
    if (rightAnswersField === null) {
      rightAnswersField = document.getElementById('right-answer-field');
    }
    if (rightAnswerHeader === null) {
      rightAnswerHeader = document.getElementById('right-answers-header');
    }
    if (rightAnswersField.value === '') {
      setAlert(`${noEmptyAnswerMessage}`, 'error', 3500);
      return;
    }
    rightAnswers.push({
      body: rightAnswersField.value,
    });
    rightAnswersField.value = null;
    rightAnswerHeader.textContent = `Right Answers (${rightAnswers.length})`;
    setAlert(`${addNewAnswerMessage}`, 'success', 2000, false);
  };

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    addLearningMaterial(formData, 'quiz', module, navigate);
  };

  return (
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
                  {addQuizTitleLabel}
                </h3>
              </div>

              <div className='mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6'>
                <div className='sm:col-span-6'>
                  <label
                    htmlFor='name'
                    className='block text-sm font-medium text-gray-700'
                  >
                    {quizNameLabel}
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
                        {expNeededLabel}
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
                        {expGainedLabel}
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
                        {expMaxLabel}
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
                    {bodyLabel}
                  </label>
                  <div className='mt-1'>
                    <div className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md'>
                      <TextEditor
                        setFormData={setFormData}
                        formData={formData}
                        fieldName='body'
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
                    {shortDescriptionLabel}
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
                      {failedQuizMessageLabel}
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
                      {waitingMinutesLabel}
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
                <h1
                  id='wrong-answers-header'
                  className='mt-6 font-xl font-bold leading-6 font-medium text-gray-900 sm:text-xl'
                >
                  {wrongAnswersLabel}
                </h1>
              </div>
              <div className='mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6'>
                <div className='sm:col-span-6'>
                  <label className='block text-sm font-medium text-gray-700'>
                    {wrongAnswerLabel}
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
                  onClick={addWrongAnswer}
                  className='ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-offset-2 focus:ring-indigo-500'
                >
                  {addWrongAnswerLabel}
                </button>
              </div>
            </div>

            <div>
              <div>
                <h1
                  id='right-answers-header'
                  className='mt-6 font-xl font-bold leading-6 font-medium text-gray-900 sm:text-xl'
                >
                  {rightAnswersLabel}
                </h1>
              </div>
              <div className='mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6'>
                <div className='sm:col-span-6'>
                  <label className='block text-sm font-medium text-gray-700'>
                    {rightAnswerLabel}
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
                  onClick={addRightAnswer}
                  className='ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-offset-2 focus:ring-indigo-500'
                >
                  {addRightAnswerLabel}
                </button>
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
                  {cancelButtonLabel}
                </button>
              </Link>
              <button
                type='submit'
                className='ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-offset-2 focus:ring-indigo-500'
              >
                {saveButtonLabel}
              </button>
            </div>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

CreateQuiz.propTypes = {
  auth: PropTypes.object.isRequired,
  addLearningMaterial: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { addLearningMaterial, setAlert })(
  CreateQuiz
);
