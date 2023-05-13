import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { getSolution } from '../../actions/solution';
import {
  universalTranslations,
  solutionTranslations,
} from '../layout/Translations';

const Solution = ({
  auth: { user },
  solution: { solution, loading },
  getSolution,
}) => {
  const { solutionId } = useParams();

  useEffect(() => {
    getSolution(solutionId);
  }, [getSolution, solutionId]);

  const language = user ? user.language : 'en';
  const solutionLabel = solutionTranslations.solution[language];
  const passedTestsLabel = solutionTranslations.passedTests[language];
  const totalTestsLabel = solutionTranslations.totalTests[language];
  const successRateLabel = solutionTranslations.successRate[language];
  const problemLabel = universalTranslations.problem[language];
  const backButtonLabel = universalTranslations.backButton[language];
  const problem = solution.problem;

  return loading || solution === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className='container mt-10'>
        <div className='mt-2 mb-10 block'>
          <h2 className='text-3xl text-left tracking-tight font-bold text-gray-900 sm:text-3xl'>
            {solutionLabel}
          </h2>
          <div class='mt-12'>
            <div class='xl:pl-72'>
              <div class='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'>
                <div class='border-t border-white/5 py-6 px-4 sm:px-6 lg:px-8'>
                  <p class='text-sm font-semibold leading-6 text-gray-400'>
                    {problemLabel}
                  </p>
                  <Link to={`/${problem.module}/problems/${problem._id}`}>
                    <p class='mt-2 flex items-baseline gap-x-2'>
                      <span class='text-3xl font-semibold tracking-tight'>
                        {problem.name}
                      </span>
                    </p>
                  </Link>
                </div>
                <div class='border-t border-white/5 py-6 px-4 sm:px-6 lg:px-8 sm:border-l'>
                  <p class='text-sm font-semibold leading-6 text-gray-400'>
                    {passedTestsLabel}
                  </p>
                  <p class='mt-2 flex items-baseline gap-x-2'>
                    <span class='text-3xl font-semibold tracking-tight'>
                      {solution.passedTests}
                    </span>
                  </p>
                </div>
                <div class='border-t border-white/5 py-6 px-4 sm:px-6 lg:px-8 lg:border-l'>
                  <p class='text-sm font-semibold leading-6 text-gray-400'>
                    {totalTestsLabel}
                  </p>
                  <p class='mt-2 flex items-baseline gap-x-2'>
                    <span class='text-3xl font-semibold tracking-tight'>
                      {solution.totalTests}
                    </span>
                  </p>
                </div>
                <div class='border-t border-white/5 py-6 px-4 sm:px-6 lg:px-8 sm:border-l'>
                  <p class='text-sm font-semibold leading-6 text-gray-400'>
                    {successRateLabel}
                  </p>
                  <p class='mt-2 flex items-baseline gap-x-2'>
                    <span class='text-3xl font-semibold tracking-tight'>
                      {`${solution.score}%`}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div
            className='mt-10 text-base rich-text-body'
            dangerouslySetInnerHTML={{
              __html: solution.code,
            }}
          />
        </div>
        <div className='pt-5'>
          <div className='flex justify-end mb-8'>
            <Link to={'/home'}>
              <button
                type='button'
                className='bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-offset-2 focus:ring-indigo-500'
              >
                {backButtonLabel}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

Solution.propTypes = {
  auth: PropTypes.object.isRequired,
  solution: PropTypes.object.isRequired,
  getSolution: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  solution: state.solution,
});

export default connect(mapStateToProps, { getSolution })(Solution);
