import React, { Fragment, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addLearningMaterial } from '../../actions/learning';
import { setAlert } from '../../actions/alert';

const CreateProblem = ({ addLearningMaterial, setAlert }) => {
  const { module } = useParams();
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
    body,
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
      setAlert('A test must have an input and an output', 'error', 3500);
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
    setAlert('A new test was added', 'success', 2000, false);
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
      setAlert('An example must have an input and an output', 'error', 3500);
      return;
    }
    examples.push({
      input: examplesInputField.value,
      output: examplesOutputField.value,
    });
    examplesInputField.value = null;
    examplesOutputField.value = null;
    examplesHeader.textContent = `Examples (${examples.length})`;
    setAlert('A new example was added', 'success', 2000, false);
  };

  const addHint = function () {
    if (hintsField === null) {
      hintsField = document.getElementById('hint-field');
    }
    if (hintsHeader === null) {
      hintsHeader = document.getElementById('hints-header');
    }
    if (hintsField.value === '') {
      setAlert("You can't add an empty hint", 'error', 3500);
      return;
    }
    hints.push({
      body: hintsField.value,
    });
    hintsField.value = null;
    hintsHeader.textContent = `Hints (${hints.length})`;
    setAlert('A new hint was added', 'success', 2000, false);
  };

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    addLearningMaterial(formData, 'problem');
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
                  Create a new problem
                </h3>
              </div>

              <div className='mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6'>
                <div className='sm:col-span-6'>
                  <label
                    htmlFor='name'
                    className='block text-sm font-medium text-gray-700'
                  >
                    {' '}
                    What's the name of the problem?{' '}
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
                    <textarea
                      name='body'
                      value={body}
                      onChange={(e) => onChange(e)}
                      rows='3'
                      className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md'
                    ></textarea>
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

            <div>
              <div>
                <h1
                  id='tests-header'
                  className='mt-6 font-xl font-bold leading-6 font-medium text-gray-900 sm:text-xl'
                >
                  Tests
                </h1>
              </div>
              <div className='mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-7'>
                <div className='sm:col-span-3'>
                  <label
                    htmlFor='testInput'
                    className='block text-sm font-medium text-gray-700'
                  >
                    {' '}
                    Input{' '}
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
                    {' '}
                    Output{' '}
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
                    Show Test
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
                  Add Test
                </button>
              </div>
            </div>

            <div>
              <div>
                <h1
                  id='examples-header'
                  className='mt-6 font-xl font-bold leading-6 font-medium text-gray-900 sm:text-xl'
                >
                  Examples
                </h1>
              </div>
              <div className='mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6'>
                <div className='sm:col-span-3'>
                  <label
                    htmlFor='exampleInput'
                    className='block text-sm font-medium text-gray-700'
                  >
                    {' '}
                    Input{' '}
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
                    {' '}
                    Output{' '}
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
                  Add Example
                </button>
              </div>
            </div>

            <div>
              <div>
                <h1
                  id='hints-header'
                  className='mt-6 font-xl font-bold leading-6 font-medium text-gray-900 sm:text-xl'
                >
                  Hints
                </h1>
              </div>
              <div className='mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6'>
                <div className='sm:col-span-6'>
                  <label
                    htmlFor='hint'
                    className='block text-sm font-medium text-gray-700'
                  >
                    {' '}
                    Hint{' '}
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
                  Add Hint
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

CreateProblem.propTypes = {
  addLearningMaterial: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
};

export default connect(null, { addLearningMaterial, setAlert })(CreateProblem);
