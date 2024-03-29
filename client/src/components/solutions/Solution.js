import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { getSolution } from '../../actions/solution';
import {
  displayDate,
  statusClassColour,
  translateSolutionStatus,
} from '../../utils/helpers';
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
  const statusLabel = universalTranslations.status[language];
  const backButtonLabel = universalTranslations.backButton[language];
  const addedAtLabel = universalTranslations.addedAt[language];

  return loading || solution === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className='container mt-10'>
        <div className='mt-2 mb-10 block'>
          <h2 className='text-3xl text-left tracking-tight font-bold text-gray-900 sm:text-3xl'>
            {solutionLabel}
          </h2>
          <section aria-labelledby='update-password' className='mt-10 mb-10'>
            <div className='shadow sm:rounded-md sm:overflow-hidden'>
              <div className='bg-white py-6 px-4 sm:p-6'>
                <div className='mt-12 mb-10'>
                  <div className='xl:pl-72'>
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'>
                      <div className='border-t border-white/5 py-6 px-4 sm:px-6 lg:px-8'>
                        <p className='text-sm font-semibold leading-6 text-gray-400'>
                          {problemLabel}
                        </p>
                        <Link
                          to={`/${solution.problem.module}/problems/${solution.problem._id}`}
                        >
                          <p className='mt-2 flex items-baseline gap-x-2'>
                            <span className='text-3xl font-semibold tracking-tight'>
                              {solution.problem.name}
                            </span>
                          </p>
                        </Link>
                      </div>
                      <div className='border-t border-white/5 py-6 px-4 sm:px-6 lg:px-8 sm:border-l'>
                        <p className='text-sm font-semibold leading-6 text-gray-400'>
                          {passedTestsLabel}
                        </p>
                        <p className='mt-2 flex items-baseline gap-x-2'>
                          <span className='text-3xl font-semibold tracking-tight'>
                            {solution.passedTests}
                          </span>
                        </p>
                      </div>
                      <div className='border-t border-white/5 py-6 px-4 sm:px-6 lg:px-8 lg:border-l'>
                        <p className='text-sm font-semibold leading-6 text-gray-400'>
                          {totalTestsLabel}
                        </p>
                        <p className='mt-2 flex items-baseline gap-x-2'>
                          <span className='text-3xl font-semibold tracking-tight'>
                            {solution.totalTests}
                          </span>
                        </p>
                      </div>
                      <div className='border-t border-white/5 py-6 px-4 sm:px-6 lg:px-8 sm:border-l'>
                        <p className='text-sm font-semibold leading-6 text-gray-400'>
                          {successRateLabel}
                        </p>
                        <p className='mt-2 flex items-baseline gap-x-2'>
                          <span className='text-3xl font-semibold tracking-tight'>
                            {`${solution.score}%`}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='px-4 py-3 bg-gray-50 text-right sm:px-6'>
                <p className='mt-2 flex items-baseline gap-x-2'>
                  <span className='font-semibold tracking-tight'>
                    {statusLabel}:
                  </span>
                  <span
                    className={`font-semibold tracking-tight ${statusClassColour(
                      solution.status,
                      true
                    )}`}
                  >
                    {translateSolutionStatus(solution.status, language)}
                  </span>
                </p>
                <p className='mt-2 mb-6 flex items-baseline gap-x-2'>
                  <span className='font-semibold tracking-tight'>
                    {addedAtLabel}: {displayDate(solution.date, language)}
                  </span>
                </p>
              </div>
            </div>
          </section>

          <section aria-labelledby='update-password'>
            <div className='shadow sm:rounded-md sm:overflow-hidden'>
              <div className='bg-white py-6 px-4 sm:p-6'>
                <pre>
                  <code className='language-cpp'>{solution.code}</code>
                </pre>
              </div>
            </div>
          </section>
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
