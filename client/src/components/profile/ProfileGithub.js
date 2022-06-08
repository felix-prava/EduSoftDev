import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getGithubRepos } from '../../actions/profile';

const ProfileGithub = ({ username, getGithubRepos, repos }) => {
  useEffect(() => {
    getGithubRepos(username);
  }, [getGithubRepos]);
  return (
    <Fragment>
      {' '}
      {repos === null ? (
        <Spinner />
      ) : repos.length === 0 ? (
        'No repos found'
      ) : (
        'Repos'
      )}
    </Fragment>
  );
};

ProfileGithub.propTypes = {
  repos: PropTypes.array.isRequired,
  getGithubRepos: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  repos: state.profile.repos,
});

export default connect(mapStateToProps, { getGithubRepos })(ProfileGithub);
