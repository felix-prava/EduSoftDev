import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from '../../actions/commonActions';

const AddComment = ({ objectId, addComment, translations }) => {
  const [comment, setComment] = useState('');
  return (
    <Fragment>
      <div className='container mt-28'>
        <form
          className='space-y-8 divide-y divide-gray-200'
          onSubmit={(e) => {
            e.preventDefault();
            addComment(objectId, { body: comment }, 'article');
            setComment('');
          }}
        >
          <div className='space-y-8 divide-y divide-gray-200'>
            <div>
              <div>
                <h3 className='text-2xl font-bold leading-6 font-medium text-gray-900 sm:text-2xl'>
                  {translations.leaveCommentLabel}
                </h3>
              </div>

              <div className='mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6'>
                <div className='sm:col-span-6'>
                  <div className='mt-1'>
                    <textarea
                      name='comment'
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      rows='3'
                      className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md'
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='pt-5'>
            <div className='flex justify-end mb-8'>
              <button
                type='submit'
                className='ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-offset-2 focus:ring-indigo-500'
              >
                {translations.saveButtonLabel}
              </button>
            </div>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

AddComment.propTypes = {
  addComment: PropTypes.func.isRequired,
};

export default connect(null, { addComment })(AddComment);
