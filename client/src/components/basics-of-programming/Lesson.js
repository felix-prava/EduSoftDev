import React, { Fragment, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getLearningMaterial } from '../../actions/learning';

const Lesson = ({
  getLearningMaterial,
  learning: { learningMaterial, loading },
}) => {
  const { lessonId } = useParams();
  const { module } = useParams();
  useEffect(() => {
    getLearningMaterial(lessonId);
  }, [getLearningMaterial, lessonId]);

  return loading || learningMaterial === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className='container mt-10 ml-4'>
        <div className='mt-2 block'>
          <h2 className='text-3xl text-center tracking-tight font-extrabold text-gray-900 sm:text-4xl'>
            {learningMaterial.name}
          </h2>
          <p className='mt-10 text-base text-gray-500'>
            {learningMaterial.body}
          </p>
        </div>
      </div>
    </Fragment>
  );
};

Lesson.propTypes = {
  learning: PropTypes.object.isRequired,
  getLearningMaterial: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  learning: state.learning,
});

export default connect(mapStateToProps, {
  getLearningMaterial,
})(Lesson);
