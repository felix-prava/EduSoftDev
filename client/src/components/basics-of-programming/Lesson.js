import React, { Fragment, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AddComment from '../layout/AddComment';
import Spinner from '../layout/Spinner';
import { getLearningMaterial, completeLesson } from '../../actions/learning';
import {
  learningMaterialTranslations,
  universalTranslations,
} from '../layout/Translations';
import { deleteComment } from '../../actions/commonActions';
import { displayDate } from '../../utils/helpers';

const Lesson = ({
  auth: { user },
  getLearningMaterial,
  completeLesson,
  deleteComment,
  learning: { learningMaterial, loading },
}) => {
  const { module, lessonId } = useParams();

  const language = user ? user.language : 'en';
  const lessonLearnedLabel =
    learningMaterialTranslations.lessonLearned[language];
  const backButtonLabel = universalTranslations.backButton[language];
  const saveButtonLabel = universalTranslations.saveButton[language];
  const leaveCommentLabel = universalTranslations.leaveComment[language];

  useEffect(() => {
    getLearningMaterial(lessonId);
  }, [getLearningMaterial, lessonId]);

  return loading || learningMaterial === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className='container mt-10'>
        <div className='mt-2 block'>
          <h2 className='text-3xl text-center tracking-tight font-extrabold text-gray-900 sm:text-4xl'>
            {learningMaterial.name}
          </h2>
          <div
            className='mt-10 text-base rich-text-body'
            dangerouslySetInnerHTML={{
              __html: learningMaterial.body,
            }}
          />
        </div>
        <div className='pt-5'>
          <div className='flex justify-end mb-8'>
            <Link to={`/modules/${module}`}>
              <button
                type='button'
                className='bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-offset-2 focus:ring-indigo-500'
              >
                {backButtonLabel}
              </button>
            </Link>
            <button
              type='button'
              onClick={() => completeLesson(lessonId)}
              className='ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-offset-2 focus:ring-indigo-500'
            >
              {lessonLearnedLabel}
            </button>
          </div>
        </div>
      </div>
      <div className='mt-8 pt-2'>
        <AddComment
          objectOptions={{
            objectId: lessonId,
            objectType: 'learning material',
          }}
          translations={{
            saveButtonLabel,
            leaveCommentLabel,
          }}
        />
      </div>
      <div className='mt-28 pt-8 pb-4'>
        <ul className='divide-y divide-gray-200'>
          {learningMaterial.comments.map((comment) => (
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
                                lessonId,
                                comment._id,
                                'learning material'
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
    </Fragment>
  );
};

Lesson.propTypes = {
  auth: PropTypes.object.isRequired,
  learning: PropTypes.object.isRequired,
  getLearningMaterial: PropTypes.func.isRequired,
  completeLesson: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  learning: state.learning,
});

export default connect(mapStateToProps, {
  getLearningMaterial,
  completeLesson,
  deleteComment,
})(Lesson);
