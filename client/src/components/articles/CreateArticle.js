import React, { Fragment, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import TextEditor from '../layout/TextEditor';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addArticle } from '../../actions/article';
import { setAlert } from '../../actions/alert';
import {
  universalTranslations,
  articlesTranslations,
} from '../layout/Translations';

const CreateArticle = ({ auth: { user }, addArticle, setAlert }) => {
  const [formData, setFormData] = useState({
    subject: '',
    description: '',
    body: '',
  });

  const navigate = useNavigate();
  const { subject, body, description } = formData;
  const childCompRef = useRef();

  const language = user ? user.language : 'en';
  const bodyLabel = universalTranslations.body[language];
  const shortDescriptionLabel =
    universalTranslations.shortDescription[language];
  const backButtonLabel = universalTranslations.backButton[language];
  const saveButtonLabel = universalTranslations.saveButton[language];
  const createArticleLabel = articlesTranslations.createArticle[language];
  const whatIsAboutLabel = articlesTranslations.whatIsAbout[language];
  const subjectIsRequiredMessage =
    articlesTranslations.subjectIsRequired[language];
  const bodyIsRequiredMessage = articlesTranslations.bodyIsRequired[language];

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    let errors = [];
    if (subject === '') {
      errors.push(subjectIsRequiredMessage);
    }
    if (body === '' || body === '<p></p>\n') {
      errors.push(bodyIsRequiredMessage);
    }
    if (errors.length !== 0) {
      errors.forEach((errorMessage) => {
        setAlert(`${errorMessage}`, 'error', 4500);
      });
      return;
    }

    addArticle(formData, navigate);
    if (subject !== '' && body !== '') {
      setFormData({ subject: '', body: '', description: '' });
      childCompRef.current.setEmptyEditor();
    }
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
                  {createArticleLabel}
                </h3>
              </div>

              <div className='mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6'>
                <div className='sm:col-span-6'>
                  <label
                    htmlFor='subject'
                    className='block text-sm font-medium text-gray-700'
                  >
                    {whatIsAboutLabel}
                  </label>
                  <div className='mt-1'>
                    <input
                      type='text'
                      name='subject'
                      value={subject}
                      onChange={(e) => onChange(e)}
                      className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
                    />
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
                        ref={childCompRef}
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
                    htmlFor='description'
                    className='block text-sm font-medium text-gray-700'
                  >
                    {shortDescriptionLabel}
                  </label>
                  <div className='mt-1'>
                    <input
                      type='text'
                      name='description'
                      value={description}
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
              <Link to='/articles'>
                <button
                  type='button'
                  className='bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-offset-2 focus:ring-indigo-500'
                >
                  {backButtonLabel}
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

CreateArticle.propTypes = {
  auth: PropTypes.object.isRequired,
  addArticle: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { addArticle, setAlert })(
  CreateArticle
);
