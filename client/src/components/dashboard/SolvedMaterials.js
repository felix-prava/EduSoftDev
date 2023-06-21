import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import {
  dashboardTranslations,
  universalTranslations,
} from '../layout/Translations';
import { displayDate } from '../../utils/helpers';
import { getUserSolutions } from '../../actions/solution';

const SolvedMaterials = ({
  auth: { user, loading },
  solution: { solutions, loading: solutionsLoading },
  getUserSolutions,
}) => {
  useEffect(() => {
    getUserSolutions(user && user._id);
  }, [user, getUserSolutions]);
  if (user) console.log(user.solvedProblems);
  const language = user ? user.language : 'en';

  return loading || solutionsLoading || user === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className='container'>
        <div className='mt-6 bg-white shadow'>
          <div className='px-4 sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8'>
            <div className='py-6 md:flex md:items-center md:justify-between lg:border-t lg:border-gray-200'>
              <div className='flex-1 min-w-0'>
                {user && user.solvedProblems.length > 0 ? (
                  <ul role='list' className='divide-y divide-gray-100'>
                    {user.solvedProblems.map((material) => (
                      <li
                        key={material._id}
                        className='flex items-center justify-between gap-x-6 py-5'
                      >
                        <div className='flex gap-x-4'>
                          <div className='min-w-0 flex-auto'>
                            <p className='text-sm font-semibold leading-6 text-gray-900'>
                              {material.name || 'No name'}
                            </p>
                            <p className='mt-1 truncate text-xs leading-5 text-gray-500'>
                              <time dateTime={material.date}>
                                {' '}
                                {displayDate(material.date)}
                              </time>
                            </p>
                          </div>
                        </div>
                        <Link
                          to={`/${material.module}/problems/${material.problem}`}
                          className='rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
                        >
                          View
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  'No problem found'
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

SolvedMaterials.propTypes = {
  auth: PropTypes.object.isRequired,
  solution: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  solution: state.solution,
  getUserSolutions: PropTypes.func.isRequired,
});

export default connect(mapStateToProps, { getUserSolutions })(SolvedMaterials);
