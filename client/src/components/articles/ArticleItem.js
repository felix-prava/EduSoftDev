import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addLike, addDislike, deleteArticle } from '../../actions/article';
import { setAlert } from '../../actions/alert';
import { displayDate } from '../../utils/helpers';

const ArticleItem = ({
  auth,
  article: {
    _id,
    subject,
    description,
    user,
    userLastName,
    userFirstName,
    avatar,
    comments,
    likes,
    dislikes,
    date,
  },
  addLike,
  addDislike,
  deleteArticle,
  setAlert,
}) => {
  function likeArticle(articleId) {
    if (auth.isAuthenticated) {
      addLike(articleId);
    } else {
      setAlert('Must be logged in to like this article', 'error');
      // TODO pop-up with option log in
    }
  }

  function dislikeArticle(articleId) {
    if (auth.isAuthenticated) {
      addDislike(articleId);
    } else {
      setAlert('Must be logged in to dislike this article', 'error');
      // TODO pop-up with option log in
    }
  }

  // TODO Link to discussion leads to comment section
  return (
    <Fragment>
      <div id={_id}>
        <div className='mt-2 block'>
          <p className='text-xl font-semibold text-gray-900'>{subject}</p>
          <p className='mt-3 text-base text-gray-500'>{description}</p>
          <div className='mt-3'>
            <Link
              to={`/articles/${_id}`}
              className='text-base font-semibold text-indigo-600 hover:text-indigo-500'
            >
              {' '}
              Read full article{' '}
            </Link>
          </div>
          <div className='mt-6 flex space-x-3'>
            <button
              type='button'
              onClick={() => likeArticle(_id)}
              className='inline-flex items-center px-4 py-1 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5'
                viewBox='0 0 20 20'
                fill='currentColor'
              >
                <path d='M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z' />
              </svg>
              {likes.length > 0 && likes.length}
            </button>
            <button
              type='button'
              onClick={() => dislikeArticle(_id)}
              className='inline-flex items-center px-4 py-1 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5 mt-2'
                viewBox='0 0 20 20'
                fill='currentColor'
              >
                <path d='M18 9.5a1.5 1.5 0 11-3 0v-6a1.5 1.5 0 013 0v6zM14 9.667v-5.43a2 2 0 00-1.105-1.79l-.05-.025A4 4 0 0011.055 2H5.64a2 2 0 00-1.962 1.608l-1.2 6A2 2 0 004.44 12H8v4a2 2 0 002 2 1 1 0 001-1v-.667a4 4 0 01.8-2.4l1.4-1.866a4 4 0 00.8-2.4z' />
              </svg>
              {dislikes.length > 0 && dislikes.length}
            </button>
            <button
              type='button'
              className='inline-flex items-center px-4 py-1 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500'
            >
              <Link to={`/articles/${_id}`}>
                Discussion {comments.length > 0 && comments.length}
              </Link>
            </button>

            {!auth.loading &&
              auth.user !== null &&
              (auth.user._id === user ||
                auth.user.role === 'admin' ||
                auth.user.role === 'mentor') && (
                <button
                  onClick={(e) => deleteArticle(_id)}
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
          </div>
        </div>

        <div className='mt-6 flex items-center'>
          <div className='flex-shrink-0'>
            <span className='sr-only'>
              {userLastName} {userFirstName}
            </span>
            <img className='h-10 w-10 rounded-full' src={avatar} alt='' />
          </div>
          <div className='ml-3'>
            <p className='text-sm font-medium text-gray-900'>
              {user ? (
                <Link to={`/profiles/${user}`}>
                  {userLastName} {userFirstName}
                </Link>
              ) : (
                <Fragment>
                  {userLastName} {userFirstName}
                </Fragment>
              )}
            </p>
            <div className='flex space-x-1 text-sm text-gray-500'>
              <time dateTime={date}> Posted on {displayDate(date)}</time>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

ArticleItem.propTypes = {
  article: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  addDislike: PropTypes.func.isRequired,
  deleteArticle: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  addLike,
  addDislike,
  deleteArticle,
  setAlert,
})(ArticleItem);
