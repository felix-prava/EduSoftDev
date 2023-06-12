import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AddComment from './AddComment';
import { setAlert } from '../../actions/alert';
import { deleteComment } from '../../actions/commonActions';
import { displayDate } from '../../utils/helpers';

const CommentsSection = ({
  options: {
    object,
    objectId,
    user,
    saveButtonLabel,
    leaveCommentLabel,
    resourceType,
  },
  deleteComment,
}) => {
  return (
    <Fragment>
      <div className='pt-2'>
        <AddComment
          objectOptions={{
            objectId: objectId,
            objectType: resourceType,
          }}
          translations={{
            saveButtonLabel,
            leaveCommentLabel,
          }}
        />
      </div>
      <div className='container mt-10'>
        <div className='pb-4'>
          <ul className='divide-y divide-gray-200'>
            {object.comments.map((comment) => (
              <li className='py-4' key={comment._id}>
                <div className='flex space-x-3'>
                  <Link
                    to={
                      user && user._id === comment.user
                        ? '/my-profile'
                        : `/profiles/${comment.user}`
                    }
                  >
                    <img
                      className='h-6 w-6 rounded-full'
                      src={comment.avatar}
                      alt=''
                    />
                  </Link>
                  <div className='flex-1 space-y-1'>
                    <div className='flex items-center justify-between'>
                      <h3 className='text-sm font-medium'>
                        <Link
                          to={
                            user && user._id === comment.user
                              ? '/my-profile'
                              : `/profiles/${comment.user}`
                          }
                        >
                          {comment.username || 'Username not available'}
                        </Link>
                      </h3>
                      <p className='text-sm text-gray-500'>
                        {displayDate(comment.date)}
                        {user !== null &&
                          (user._id === comment.user ||
                            user.role === 'admin' ||
                            user.role === 'mentor') && (
                            <button
                              onClick={() =>
                                deleteComment(
                                  objectId,
                                  comment._id,
                                  resourceType
                                )
                              }
                              className='bg-red-600 border border-transparent rounded-md shadow-sm py-1 px-3 flex items-center inline-flex justify-center ml-4 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600'
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
                    <p className='text-sm text-gray-500'>{comment.body}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Fragment>
  );
};

CommentsSection.propTypes = {
  deleteComment: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
};

export default connect(null, {
  deleteComment,
  setAlert,
})(CommentsSection);
