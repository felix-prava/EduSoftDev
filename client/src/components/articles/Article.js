import React, { Fragment, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import {
  getArticle,
  addLike,
  addDislike,
  deleteArticle,
} from '../../actions/article';
import { setAlert } from '../../actions/alert';

import Moment from 'react-moment';

const Article = ({
  getArticle,
  auth,
  article: { article, loading },
  addLike,
  addDislike,
  deleteArticle,
  setAlert,
}) => {
  const { id } = useParams();
  useEffect(() => {
    getArticle(id);
  }, [getArticle, id]);

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

  return loading || article === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className='container mt-10 ml-4'>
        <div className='mt-2 block'>
          <h2 className='text-3xl text-center tracking-tight font-extrabold text-gray-900 sm:text-4xl'>
            {article.subject}
          </h2>
          <p className='mt-10 text-base text-gray-500'>{article.body}</p>
        </div>

        <div className='float-right'>
          <div className='mt-6 flex space-x-3 '>
            <button
              type='button'
              onClick={(e) => likeArticle(article._id)}
              className='inline-flex items-center px-4 py-1 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5'
                viewBox='0 0 20 20'
                fill='currentColor'
              >
                <path d='M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z' />
              </svg>
              {article.likes.length > 0 && article.likes.length}
            </button>
            <button
              type='button'
              onClick={(e) => dislikeArticle(article._id)}
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
              {article.dislikes.length > 0 && article.dislikes.length}
            </button>

            {!auth.loading &&
              auth.user !== null &&
              auth.user._id === article.user && (
                <button
                  onClick={(e) => deleteArticle(article._id)}
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

          <div className='mt-6 flex items-center '>
            <div className='flex-shrink-0'>
              <span className='sr-only'>
                {article.userLastName} {article.userFirstName}
              </span>
              <img
                className='h-10 w-10 rounded-full'
                src={article.avatar}
                alt=''
              />
            </div>
            <div className='ml-3'>
              <p className='text-sm font-medium text-gray-900'>
                {article.user ? (
                  <Link to={`/profiles/${article.user}`}>
                    {article.userLastName} {article.userFirstName}
                  </Link>
                ) : (
                  <Fragment>
                    {article.userLastName} {article.userFirstName}
                  </Fragment>
                )}
              </p>
              <div className='flex space-x-1 text-sm text-gray-500'>
                <time dateTime={article.date}>
                  {' '}
                  Posted on <Moment format='DD/MM/YYYY'>
                    {article.date}
                  </Moment>{' '}
                </time>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

Article.propTypes = {
  article: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  getArticle: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  addDislike: PropTypes.func.isRequired,
  deleteArticle: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  article: state.article,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getArticle,
  addLike,
  addDislike,
  deleteArticle,
  setAlert,
})(Article);
