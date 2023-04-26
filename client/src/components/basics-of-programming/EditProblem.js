import React, { Fragment, useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getLearningMaterial,
  updateLearningMaterial,
  addTest,
  addExample,
  addHint,
  deleteTest,
  deleteExample,
  deleteHint,
} from '../../actions/learning';
import TextEditor from '../layout/TextEditor';
import {
  learningMaterialTranslations,
  universalTranslations,
} from '../layout/Translations';
import { capitalizeWords } from '../../utils/helpers';
import Spinner from '../layout/Spinner';
import { setAlert } from '../../actions/alert';

const EditProblem = ({
  auth: { user },
  learning: { learningMaterial, loading },
  getLearningMaterial,
  updateLearningMaterial,
  addTest,
  addExample,
  addHint,
  deleteTest,
  deleteExample,
  deleteHint,
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
    tests: [],
    examples: [],
    hints: [],
  });

  const {
    name,
    module,
    expNeeded,
    expGained,
    expMax,
    body,
    shortDescription,
    tests,
    examples,
    hints,
  } = formData;

  let hintsField = null;
  let examplesInputField = null;
  let examplesOutputField = null;
  let testsInputField = null;
  let testsOutputField = null;
  let testsCheckbox = null;

  const language = user ? user.language : 'en';
  const editProblemTitleLabel =
    learningMaterialTranslations.editProblemTitle[language];
  const problemNameLabel = learningMaterialTranslations.problemName[language];
  const expNeededLabel = learningMaterialTranslations.expNeeded[language];
  const expGainedLabel = learningMaterialTranslations.expGained[language];
  const expMaxLabel = learningMaterialTranslations.expMax[language];
  const testsTitleLabel = learningMaterialTranslations.testsTitle[language];
  const inputLabel = learningMaterialTranslations.input[language];
  const outputLabel = learningMaterialTranslations.output[language];
  const showTestLabel = learningMaterialTranslations.showTest[language];
  const testLabel = learningMaterialTranslations.test[language];
  const displayTestLabel = learningMaterialTranslations.displayTest[language];
  const addTestLabel = learningMaterialTranslations.addTest[language];
  const examplesTitleLabel =
    learningMaterialTranslations.examplesTitle[language];
  const addExampleLabel = learningMaterialTranslations.addExample[language];
  const hintsTitleLabel = learningMaterialTranslations.hintsTitle[language];
  const hintLabel = learningMaterialTranslations.hint[language];
  const newHintLabel = learningMaterialTranslations.newHint[language];
  const addHintLabel = learningMaterialTranslations.addHint[language];

  const bodyLabel = universalTranslations.body[language];
  const shortDescriptionLabel =
    universalTranslations.shortDescription[language];
  const yesLabel = universalTranslations.yes[language];
  const noLabel = universalTranslations.no[language];
  const saveButtonLabel = universalTranslations.saveButton[language];
  const cancelButtonLabel = universalTranslations.cancelButton[language];

  const addNewHint = function () {
    if (hintsField === null) {
      hintsField = document.getElementById('hint-field');
    }
    if (hintsField.value === '') {
      setAlert("You can't add an empty hint", 'error', 3500);
      return;
    }
    addHint(learningMaterial._id, { body: hintsField.value });
    hintsField.value = null;
  };

  const addNewTest = function () {
    if (testsInputField === null) {
      testsInputField = document.getElementById('test-input-field');
    }
    if (testsOutputField === null) {
      testsOutputField = document.getElementById('test-output-field');
    }
    if (testsCheckbox === null) {
      testsCheckbox = document.getElementById('show-test-checkbox');
    }
    if (testsInputField.value === '' || testsOutputField.value === '') {
      setAlert('A test must have an input and an output', 'error', 3500);
      return;
    }
    addTest(learningMaterial._id, {
      input: testsInputField.value,
      output: testsOutputField.value,
      showTest: testsCheckbox.checked,
    });
    testsInputField.value = null;
    testsOutputField.value = null;
    testsCheckbox.checked = false;
  };

  const addNewExample = function () {
    if (examplesInputField === null) {
      examplesInputField = document.getElementById('example-input-field');
    }
    if (examplesOutputField === null) {
      examplesOutputField = document.getElementById('example-output-field');
    }
    if (examplesInputField.value === '' || examplesOutputField.value === '') {
      setAlert('An example must have an input and an output', 'error', 3500);
      return;
    }
    addExample(learningMaterial._id, {
      input: examplesInputField.value,
      output: examplesOutputField.value,
    });
    examplesInputField.value = null;
    examplesOutputField.value = null;
  };

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    updateLearningMaterial(formData, problemId, learningMaterial.type);
  };

  const { problemId } = useParams();
  useEffect(() => {
    if (!learningMaterial || learningMaterial._id !== problemId)
      getLearningMaterial(problemId);
    if (learningMaterial) {
      setFormData({
        name: learningMaterial.name || '',
        module: learningMaterial.module || '',
        expNeeded: learningMaterial.expNeeded || '',
        expGained: learningMaterial.expGained || '',
        expMax: learningMaterial.expMax || '',
        body: learningMaterial.body || '',
        shortDescription: learningMaterial.shortDescription || '',
        tests: learningMaterial.tests || [],
        examples: learningMaterial.examples || [],
        hints: learningMaterial.hints || [],
      });
    }
  }, [getLearningMaterial, learningMaterial, problemId]);

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
                  {editProblemTitleLabel}
                </h3>
              </div>

              <div className='mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6'>
                <div className='sm:col-span-6'>
                  <label
                    htmlFor='name'
                    className='block text-sm font-medium text-gray-700'
                  >
                    {problemNameLabel}
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

            <div>
              <div className='mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6'>
                <div className='sm:col-span-6'>
                  <label
                    htmlFor='shortDescription'
                    className='block text-sm font-medium text-gray-700'
                  >
                    {capitalizeWords(shortDescriptionLabel)}
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

            <div>
              <div>
                <h1
                  id='tests-header'
                  className='mt-6 font-xl font-bold leading-6 font-medium text-gray-900 sm:text-xl'
                >
                  {testsTitleLabel}
                </h1>
              </div>
              <div className='mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-7'>
                <div className='sm:col-span-3'>
                  <label
                    htmlFor='testInput'
                    className='block text-sm font-medium text-gray-700'
                  >
                    {inputLabel}
                  </label>
                  <div className='mt-1'>
                    <textarea
                      type='text'
                      id='test-input-field'
                      className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
                    />
                  </div>
                </div>

                <div className='sm:col-span-3'>
                  <label
                    htmlFor='testOutput'
                    className='block text-sm font-medium text-gray-700'
                  >
                    {outputLabel}
                  </label>
                  <div className='mt-1'>
                    <textarea
                      type='text'
                      id='test-output-field'
                      className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
                    />
                  </div>
                </div>

                <div className='sm:col-span-1'>
                  <label className='block text-sm font-medium text-gray-700'>
                    {showTestLabel}
                  </label>
                  <div className='mt-1'>
                    <input
                      aria-describedby='comments-description'
                      id='show-test-checkbox'
                      type='checkbox'
                      className='focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded'
                    />
                  </div>
                </div>
              </div>
              <div className='mt-6 flex justify-end mb-8'>
                <button
                  type='button'
                  onClick={addNewTest}
                  className='ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-offset-2 focus:ring-indigo-500'
                >
                  {addTestLabel}
                </button>
              </div>
              <div>
                <ul className='divide-y divide-gray-200'>
                  {tests.map((test, index) => (
                    <li className='py-4' key={test._id}>
                      <div className='flex space-x-3'>
                        <div className='flex-1 space-y-1'>
                          <div className='mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6'>
                            <div className='sm:col-span-3'>
                              <div className='flex items-center justify-between'>
                                <h3 className='text-sm font-medium'>
                                  {`${testLabel} ${index + 1}`}
                                </h3>
                              </div>

                              <p className='text-sm text-gray-500'>
                                {inputLabel}: {test.input}
                              </p>
                              <p className='text-sm text-gray-500'>
                                {outputLabel}: {test.output}
                              </p>
                              <p className='text-sm text-gray-500'>
                                {displayTestLabel}:{' '}
                                {test.showTest ? yesLabel : noLabel}
                              </p>
                            </div>
                            <div className='sm:col-span-3'>
                              <p className='float-right text-sm text-gray-500'>
                                {learningMaterial && (
                                  <button
                                    className='bg-red-600 border border-transparent rounded-md shadow-sm py-1 px-3 flex items-center inline-flex justify-center ml-4 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600'
                                    onClick={(e) => {
                                      e.preventDefault();
                                      deleteTest(
                                        learningMaterial._id,
                                        test._id
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
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <div>
                <h1
                  id='examples-header'
                  className='mt-6 font-xl font-bold leading-6 font-medium text-gray-900 sm:text-xl'
                >
                  {examplesTitleLabel}
                </h1>
              </div>
              <div className='mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6'>
                <div className='sm:col-span-3'>
                  <label
                    htmlFor='exampleInput'
                    className='block text-sm font-medium text-gray-700'
                  >
                    {inputLabel}
                  </label>
                  <div className='mt-1'>
                    <textarea
                      type='text'
                      id='example-input-field'
                      className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
                    />
                  </div>
                </div>

                <div className='sm:col-span-3'>
                  <label
                    htmlFor='exampleOutput'
                    className='block text-sm font-medium text-gray-700'
                  >
                    {outputLabel}
                  </label>
                  <div className='mt-1'>
                    <textarea
                      type='text'
                      id='example-output-field'
                      className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
                    />
                  </div>
                </div>
              </div>
              <div className='mt-6 flex justify-end mb-8'>
                <button
                  type='button'
                  onClick={addNewExample}
                  className='ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-offset-2 focus:ring-indigo-500'
                >
                  {addExampleLabel}
                </button>
              </div>
              <div>
                <ul className='divide-y divide-gray-200'>
                  {examples.map((example, index) => (
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
                              {/*<!-- TODO 2 columns for bigger examples and tests. Buttons on the second column -->*/}

                              <p className='text-sm text-gray-500'>
                                {inputLabel}: {example.input}
                              </p>
                              <p className='text-sm text-gray-500'>
                                {outputLabel}: {example.output}
                              </p>
                            </div>
                            <div className='sm:col-span-3'>
                              <p className='float-right text-sm text-gray-500'>
                                {learningMaterial && (
                                  <button
                                    className='bg-red-600 border border-transparent rounded-md shadow-sm py-1 px-3 flex items-center inline-flex justify-center ml-4 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600'
                                    onClick={(e) => {
                                      e.preventDefault();
                                      deleteExample(
                                        learningMaterial._id,
                                        example._id
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
                          </div>
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
                  {hintsTitleLabel}
                </h1>
              </div>
              <div className='mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6'>
                <div className='sm:col-span-6'>
                  <label className='block text-sm font-medium text-gray-700'>
                    {newHintLabel}
                  </label>
                  <div className='mt-1'>
                    <input
                      type='text'
                      id='hint-field'
                      className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
                    />
                  </div>
                </div>
              </div>
              <div className='mt-6 flex justify-end mb-8'>
                <button
                  type='button'
                  onClick={addNewHint}
                  className='ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-offset-2 focus:ring-indigo-500'
                >
                  {addHintLabel}
                </button>
              </div>

              <div>
                <ul className='divide-y divide-gray-200'>
                  {hints.map((hint, index) => (
                    <li className='py-4' key={hint._id}>
                      <div className='flex space-x-3'>
                        <div className='flex-1 space-y-1'>
                          <div className='flex items-center justify-between'>
                            <h3 className='text-sm font-medium'>
                              {`${hintLabel} ${index + 1}`}
                            </h3>
                            <p className='text-sm text-gray-500'>
                              {learningMaterial && (
                                <button
                                  className='bg-red-600 border border-transparent rounded-md shadow-sm py-1 px-3 flex items-center inline-flex justify-center ml-4 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600'
                                  onClick={(e) => {
                                    e.preventDefault();
                                    deleteHint(learningMaterial._id, hint._id);
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
                          <p className='text-sm text-gray-500'>{hint.body}</p>
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

EditProblem.propTypes = {
  auth: PropTypes.object.isRequired,
  learning: PropTypes.object.isRequired,
  getLearningMaterial: PropTypes.func.isRequired,
  updateLearningMaterial: PropTypes.func.isRequired,
  addHint: PropTypes.func.isRequired,
  addExample: PropTypes.func.isRequired,
  addTest: PropTypes.func.isRequired,
  deleteTest: PropTypes.func.isRequired,
  deleteExample: PropTypes.func.isRequired,
  deleteHint: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  learning: state.learning,
});

export default connect(mapStateToProps, {
  getLearningMaterial,
  updateLearningMaterial,
  addHint,
  addExample,
  addTest,
  deleteTest,
  deleteExample,
  deleteHint,
  setAlert,
})(EditProblem);
