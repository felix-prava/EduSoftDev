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
import { capitalizeWords } from '../../utils/helpers';
import TextEditor from '../layout/TextEditor';

const CreateProblem = ({ auth: { user }, addLearningMaterial, setAlert }) => {
  const { module } = useParams();
  let navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    module: module,
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
    expNeeded,
    expGained,
    expMax,
    shortDescription,
    tests,
    examples,
    hints,
  } = formData;

  let testsInputField = null;
  let testsOutputField = null;
  let testsCheckbox = null;
  let examplesInputField = null;
  let examplesOutputField = null;
  let hintsField = null;

  let testsHeader = null;
  let examplesHeader = null;
  let hintsHeader = null;

  const language = user ? user.language : 'en';
  const addProblemTitleLabel =
    learningMaterialTranslations.addProblemTitle[language];
  const problemNameLabel = learningMaterialTranslations.problemName[language];
  const expNeededLabel = learningMaterialTranslations.expNeeded[language];
  const expGainedLabel = learningMaterialTranslations.expGained[language];
  const expMaxLabel = learningMaterialTranslations.expMax[language];
  const testsTitleLabel = learningMaterialTranslations.testsTitle[language];
  const inputLabel = learningMaterialTranslations.input[language];
  const outputLabel = learningMaterialTranslations.output[language];
  const showTestLabel = learningMaterialTranslations.showTest[language];
  const addTestLabel = learningMaterialTranslations.addTest[language];
  const examplesTitleLabel =
    learningMaterialTranslations.examplesTitle[language];
  const addExampleLabel = learningMaterialTranslations.addExample[language];
  const hintsTitleLabel = learningMaterialTranslations.hintsTitle[language];
  const hintLabel = learningMaterialTranslations.hint[language];
  const addHintLabel = learningMaterialTranslations.addHint[language];
  const testMustHaveInputOutpuMessage =
    learningMaterialTranslations.testMustHaveInputOutput[language];
  const addNewTestMessage = learningMaterialTranslations.addNewTest[language];
  const addNewHintMessage = learningMaterialTranslations.addNewHint[language];
  const exampleMustHaveInputOutputMessage =
    learningMaterialTranslations.exampleMustHaveInputOutput[language];
  const addNewExampleMessage =
    learningMaterialTranslations.addNewExample[language];
  const addEmptyHintMessage =
    learningMaterialTranslations.addEmptyHint[language];

  const bodyLabel = universalTranslations.body[language];
  const shortDescriptionLabel =
    universalTranslations.shortDescription[language];
  const saveButtonLabel = universalTranslations.saveButton[language];
  const cancelButtonLabel = universalTranslations.cancelButton[language];

  const addTest = function () {
    if (testsInputField === null) {
      testsInputField = document.getElementById('test-input-field');
    }
    if (testsOutputField === null) {
      testsOutputField = document.getElementById('test-output-field');
    }
    if (testsCheckbox === null) {
      testsCheckbox = document.getElementById('show-test-checkbox');
    }
    if (testsHeader === null) {
      testsHeader = document.getElementById('tests-header');
    }
    if (testsInputField.value === '' || testsOutputField.value === '') {
      setAlert(`${testMustHaveInputOutpuMessage}`, 'error', 3500);
      return;
    }
    tests.push({
      input: testsInputField.value,
      output: testsOutputField.value,
      showTest: testsCheckbox.checked,
    });
    testsInputField.value = null;
    testsOutputField.value = null;
    testsCheckbox.checked = false;
    testsHeader.textContent = `Tests (${tests.length})`;
    setAlert(`${addNewTestMessage}`, 'success', 2000, false);
  };

  const addExample = function () {
    if (examplesInputField === null) {
      examplesInputField = document.getElementById('example-input-field');
    }
    if (examplesOutputField === null) {
      examplesOutputField = document.getElementById('example-output-field');
    }
    if (examplesHeader === null) {
      examplesHeader = document.getElementById('examples-header');
    }
    if (examplesInputField.value === '' || examplesOutputField.value === '') {
      setAlert(`${exampleMustHaveInputOutputMessage}`, 'error', 3500);
      return;
    }
    examples.push({
      input: examplesInputField.value,
      output: examplesOutputField.value,
    });
    examplesInputField.value = null;
    examplesOutputField.value = null;
    examplesHeader.textContent = `Examples (${examples.length})`;
    setAlert(`${addNewExampleMessage}`, 'success', 2000, false);
  };

  const addHint = function () {
    if (hintsField === null) {
      hintsField = document.getElementById('hint-field');
    }
    if (hintsHeader === null) {
      hintsHeader = document.getElementById('hints-header');
    }
    if (hintsField.value === '') {
      setAlert(`${addEmptyHintMessage}`, 'error', 3500);
      return;
    }
    hints.push({
      body: hintsField.value,
    });
    hintsField.value = null;
    hintsHeader.textContent = `Hints (${hints.length})`;
    setAlert(`${addNewHintMessage}`, 'success', 2000, false);
  };

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    addLearningMaterial(formData, 'problem', module, navigate);
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
                  {addProblemTitleLabel}
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
                  onClick={addTest}
                  className='ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-offset-2 focus:ring-indigo-500'
                >
                  {addTestLabel}
                </button>
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
                  onClick={addExample}
                  className='ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-offset-2 focus:ring-indigo-500'
                >
                  {addExampleLabel}
                </button>
              </div>
            </div>

            <div>
              <div>
                <h1
                  id='hints-header'
                  className='mt-6 font-xl font-bold leading-6 font-medium text-gray-900 sm:text-xl'
                >
                  {hintsTitleLabel}
                </h1>
              </div>
              <div className='mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6'>
                <div className='sm:col-span-6'>
                  <label
                    htmlFor='hint'
                    className='block text-sm font-medium text-gray-700'
                  >
                    {hintLabel}
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
                  onClick={addHint}
                  className='ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-offset-2 focus:ring-indigo-500'
                >
                  {addHintLabel}
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

CreateProblem.propTypes = {
  auth: PropTypes.object.isRequired,
  addLearningMaterial: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { addLearningMaterial, setAlert })(
  CreateProblem
);
