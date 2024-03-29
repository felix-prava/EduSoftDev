import React, { Fragment, useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import TextEditor from '../layout/TextEditor';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateArticle, getArticle } from '../../actions/article';
import {
  universalTranslations,
  articlesTranslations,
} from '../layout/Translations';
import PageNotFound from '../layout/PageNotFound';
import Spinner from '../layout/Spinner';

const EditArticle = ({
  auth: { user },
  article: { article, loading, error },
  updateArticle,
  getArticle,
}) => {
  const [formData, setFormData] = useState({
    subject: '',
    description: '',
    body: '',
  });

  const { subject, body, description } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    updateArticle(formData, id);
  };

  const { id } = useParams();
  useEffect(() => {
    if (!article) getArticle(id);
    if (article) {
      setFormData({
        subject: article.subject || '',
        description: article.description || '',
        body: article.body || '',
      });
    }
  }, [getArticle, article, id]);

  const language = user ? user.language : 'en';
  const bodyLabel = universalTranslations.body[language];
  const shortDescriptionLabel =
    universalTranslations.shortDescription[language];
  const cancelButtonLabel = universalTranslations.cancelButton[language];
  const saveButtonLabel = universalTranslations.saveButton[language];
  const editArticleLabel = articlesTranslations.editArticle[language];
  const whatIsAboutLabel = articlesTranslations.whatIsAbout[language];

  if (error && error.msg === 'Not Found') {
    return <PageNotFound />;
  }

  return loading || article === null ? (
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
                  {editArticleLabel}
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
              <Link to={`/articles/${id}`}>
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

EditArticle.propTypes = {
  auth: PropTypes.object.isRequired,
  article: PropTypes.object.isRequired,
  updateArticle: PropTypes.func.isRequired,
  getArticle: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  article: state.article,
});

export default connect(mapStateToProps, { updateArticle, getArticle })(
  EditArticle
);
