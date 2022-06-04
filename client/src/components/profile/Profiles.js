import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
//import Spinner from '../layout/Spinner';
import { getAllProfiles } from '../../actions/profile';

const Profiles = ({ getAllProfiles, profile: { profiles, loading } }) => {
  useEffect(() => {
    getAllProfiles();
  }, [getAllProfiles]); // TODO check
  return <Fragment>Profiles</Fragment>;
};

Profiles.propTypes = {};

const mapStateToProps = (state) => ({
  getAllProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
});

export default connect(mapStateToProps, { getAllProfiles })(Profiles);
