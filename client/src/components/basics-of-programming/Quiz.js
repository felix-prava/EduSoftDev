import React, { Fragment, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CommentsSection from '../layout/CommentsSection';
import Spinner from '../layout/Spinner';
import { getLearningMaterial, solveQuiz } from '../../actions/learning';
import { setAlert } from '../../actions/alert';
import {
  learningMaterialTranslations,
  universalTranslations,
} from '../layout/Translations';

const Quiz = ({
  auth: { user },
  learning: { learningMaterial, loading },
  getLearningMaterial,
  solveQuiz,
  setAlert,
}) => {
  const { module, quizId } = useParams();

  let answers = [];
  let userAnswers = [];

  const language = user ? user.language : 'en';
  const finishQuizLabel = learningMaterialTranslations.finishQuiz[language];
  const selectOneOptionLabel =
    learningMaterialTranslations.selectOneOption[language];
  const backButtonLabel = universalTranslations.backButton[language];
  const saveButtonLabel = universalTranslations.saveButton[language];
  const leaveCommentLabel = universalTranslations.leaveComment[language];

  function unselectUserAnswers(answers) {
    for (let i = 0; i < answers.length; i++) {
      document.getElementById(`answer-${answers[i].id}`).checked = false;
    }
  }

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
    for (let i = 0; i < learningMaterial.rightAnswers.length; i++) {
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
      <div className='container mt-10'>
        <div className='mt-2 block'>
          <h2 className='text-3xl text-center tracking-tight font-extrabold text-gray-900 sm:text-4xl'>
            {learningMaterial.name}
          </h2>
        </div>
        <form className='space-y-8 divide-y divide-gray-200'>
          <div className='space-y-8 divide-y divide-gray-200 sm:space-y-5'>
            <div className='divide-y divide-gray-200 pt-8 space-y-6 sm:pt-10 sm:space-y-5'>
              <div
                className='mt-10 text-base rich-text-body'
                dangerouslySetInnerHTML={{
                  __html: learningMaterial.body,
                }}
              />
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
                  {backButtonLabel}
                </button>
              </Link>
              <button
                type='button'
                onClick={() => {
                  if (userAnswers.length === 0) {
                    setAlert(`${selectOneOptionLabel}`, 'error', 4500, true);
                    return;
                  }
                  solveQuiz(quizId, userAnswers);
                  unselectUserAnswers(answers);
                }}
                className='ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-offset-2 focus:ring-indigo-500'
              >
                {finishQuizLabel}
              </button>
            </div>
          </div>
        </form>
      </div>
      <CommentsSection
        options={{
          object: learningMaterial,
          objectId: quizId,
          user,
          saveButtonLabel,
          leaveCommentLabel,
          resourceType: 'learning material',
        }}
      />
    </Fragment>
  );
};

Quiz.propTypes = {
  auth: PropTypes.object.isRequired,
  learning: PropTypes.object.isRequired,
  getLearningMaterial: PropTypes.func.isRequired,
  solveQuiz: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  learning: state.learning,
});

export default connect(mapStateToProps, {
  getLearningMaterial,
  solveQuiz,
  setAlert,
})(Quiz);
