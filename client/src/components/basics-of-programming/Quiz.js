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
  let userAnswers = [];
  let rightAnswersCount = 0;

  useEffect(() => {
    getLearningMaterial(quizId);
  }, [getLearningMaterial, quizId]);

  if (learningMaterial) {
    for (let i = 0; i < learningMaterial.wrongAnswers.length; i++) {
      answers.push({
        body: learningMaterial.wrongAnswers[i].body,
        id: learningMaterial.wrongAnswers[i]._id,
        wrongAnswer: true,
      });
    }
    rightAnswersCount = learningMaterial.rightAnswers.length;
    for (let i = 0; i < rightAnswersCount; i++) {
      answers.push({
        body: learningMaterial.rightAnswers[i].body,
        id: learningMaterial.rightAnswers[i]._id,
        wrongAnswer: false,
      });
    }
    answers.sort(() => 0.5 - Math.random());
  }

  function updateAnswer(answerId, isChecked) {
    if (isChecked) {
      userAnswers.push(answerId);
    } else {
      userAnswers = userAnswers.filter((answer) => answer !== answerId);
    }
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
        </div>
        <form className='space-y-8 divide-y divide-gray-200'>
          <div className='space-y-8 divide-y divide-gray-200 sm:space-y-5'>
            <div className='divide-y divide-gray-200 pt-8 space-y-6 sm:pt-10 sm:space-y-5'>
              <div>
                <p className='mt-1 max-w-2xl text-sm text-gray-500'>
                  {learningMaterial.body}
                </p>
              </div>
              <div className='space-y-6 sm:space-y-5 divide-y divide-gray-200'>
                <div className='pt-6 sm:pt-5'>
                  <div role='group' aria-labelledby='label-email'>
                    <div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-baseline'>
                      <div className='mt-4 sm:mt-0 sm:col-span-3'>
                        <div className='max-w-lg space-y-4'>
                          {answers.map((answer) => (
                            <div key={answer.id}>
                              <div className='relative flex items-start'>
                                <div className='flex items-center h-5'>
                                  <input
                                    id={`answer-${answer.id}`}
                                    onChange={(e) =>
                                      updateAnswer(answer.id, e.target.checked)
                                    }
                                    type='checkbox'
                                    className='focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded'
                                  />
                                </div>
                                <div className='ml-3 text-sm'>
                                  <p className='font-medium text-gray-700'>
                                    {answer.body}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='pt-5'>
            <div className='flex justify-end'>
              <Link to={`/modules/${module}`}>
                <button
                  type='button'
                  className='bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-offset-2 focus:ring-indigo-500'
                >
                  Cancel
                </button>
              </Link>
              <button
                type='submit'
                className='ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-offset-2 focus:ring-indigo-500'
              >
                Send Answer
              </button>
            </div>
          </div>
        </form>
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
