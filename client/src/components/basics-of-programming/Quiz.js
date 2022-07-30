import React, { Fragment, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getLearningMaterial } from '../../actions/learning';

const Quiz = ({
  getLearningMaterial,
  learning: { learningMaterial, loading },
}) => {
  const { module, quizId } = useParams();

  let answers = [];

  useEffect(() => {
    getLearningMaterial(quizId);
  }, [getLearningMaterial, quizId]);

  if (learningMaterial) {
    for (let i = 0; i < learningMaterial.wrongAnswers.length; i++) {
      answers.push({
        body: learningMaterial.wrongAnswers[i],
        wrongAnswer: true,
      });
    }
    for (let i = 0; i < learningMaterial.rightAnswers.length; i++) {
      answers.push({
        body: learningMaterial.rightAnswers[i],
        wrongAnswer: false,
      });
    }
    console.log(answers);
  }

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
        <div className='pt-5'>
          <div className='flex justify-end mb-8'>
            <Link to={`/modules/${module}`}>
              <button
                type='button'
                className='bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-offset-2 focus:ring-indigo-500'
              >
                Cancel
              </button>
            </Link>
            <button
              type='button'
              className='ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-offset-2 focus:ring-indigo-500'
            >
              Send Answer
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

Quiz.propTypes = {
  learning: PropTypes.object.isRequired,
  getLearningMaterial: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  learning: state.learning,
});

export default connect(mapStateToProps, {
  getLearningMaterial,
})(Quiz);
