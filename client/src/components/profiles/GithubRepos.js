import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getGithubRepos } from '../../actions/profile';

const GithubRepos = ({ username, getGithubRepos, repos }) => {
  useEffect(() => {
    getGithubRepos(username);
  }, [getGithubRepos, username]);
  // TODO key is not unique error
  const githubRepos = repos.map((repo) => (
    <Fragment>
      <li key={repo.id} className='sm:py-8'>
        <div className='space-y-4 mr-4 sm:gap-6 sm:space-y-0'>
          <div className='sm:col-span-2'>
            <div className='space-y-4'>
              <div className='grid grid-cols-1 sm:grid-cols-2'>
                <div className='text-lg leading-6 font-medium space-y-1'>
                  <h2 className='font-extrabold'>
                    <a
                      href={repo.html_url}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      {repo.name}
                    </a>
                  </h2>
                  <p className='text-indigo-600'>
                    {repo.description || 'No description'}
                  </p>
                  <p className='text-gray-800'>
                    Stars: {repo.stargazers_count}
                  </p>
                  <p className='text-indigo-600'>
                    Watchers: {repo.watchers_count}
                  </p>
                  <p className='text-gray-800'>Forks: {repo.forks_count}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </li>
    </Fragment>
  ));
  return (
    <Fragment>
      {' '}
      {repos === null ? (
        <Spinner />
      ) : repos.length === 0 ? (
        <div className='text-lg'>
          <p className='text-gray-500'>No repos found</p>
        </div>
      ) : (
        <Fragment>
          <ul className='space-y-12 sm:divide-y sm:divide-gray-200 sm:space-y-0 sm:-mt-8 lg:gap-x-8 lg:space-y-0'>
            {githubRepos}
          </ul>
        </Fragment>
      )}
    </Fragment>
  );
};

GithubRepos.propTypes = {
  repos: PropTypes.array.isRequired,
  getGithubRepos: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  repos: state.profile.repos,
});

export default connect(mapStateToProps, { getGithubRepos })(GithubRepos);
