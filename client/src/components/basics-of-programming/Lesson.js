import React, { Fragment, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CommentsSection from '../layout/CommentsSection';
import Spinner from '../layout/Spinner';
import { getLearningMaterial, completeLesson } from '../../actions/learning';
import {
  learningMaterialTranslations,
  universalTranslations,
} from '../layout/Translations';

const Lesson = ({
  auth: { user },
  getLearningMaterial,
  completeLesson,
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

      <CommentsSection
        options={{
          object: learningMaterial,
          objectId: lessonId,
          user,
          saveButtonLabel,
          leaveCommentLabel,
          resourceType: 'learning material',
        }}
      />
    </Fragment>
  );
};

Lesson.propTypes = {
  auth: PropTypes.object.isRequired,
  learning: PropTypes.object.isRequired,
  getLearningMaterial: PropTypes.func.isRequired,
  completeLesson: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  learning: state.learning,
});

export default connect(mapStateToProps, {
  getLearningMaterial,
  completeLesson,
})(Lesson);
