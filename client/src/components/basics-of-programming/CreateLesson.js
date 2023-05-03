import React, { Fragment, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addLearningMaterial } from '../../actions/learning';
import {
  learningMaterialTranslations,
  universalTranslations,
} from '../layout/Translations';
import TextEditor from '../layout/TextEditor';

const CreateLesson = ({ auth: { user }, addLearningMaterial }) => {
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
  });

  const { name, expNeeded, expGained, expMax, shortDescription } = formData;

  const language = user ? user.language : 'en';
  const addLessonTitleLabel =
    learningMaterialTranslations.addLessonTitle[language];
  const lessonNameLabel = learningMaterialTranslations.lessonName[language];
  const expNeededLabel = learningMaterialTranslations.expNeeded[language];
  const expGainedLabel = learningMaterialTranslations.expGained[language];
  const expMaxLabel = learningMaterialTranslations.expMax[language];
  const bodyLabel = universalTranslations.body[language];
  const shortDescriptionLabel =
    universalTranslations.shortDescription[language];
  const saveButtonLabel = universalTranslations.saveButton[language];
  const cancelButtonLabel = universalTranslations.cancelButton[language];

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    addLearningMaterial(formData, 'lesson', module, navigate);
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
                  {addLessonTitleLabel}
                </h3>
              </div>

              <div className='mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6'>
                <div className='sm:col-span-6'>
                  <label
                    htmlFor='name'
                    className='block text-sm font-medium text-gray-700'
                  >
                    {lessonNameLabel}
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

CreateLesson.propTypes = {
  auth: PropTypes.object.isRequired,
  addLearningMaterial: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { addLearningMaterial })(CreateLesson);
