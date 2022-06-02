import React, { Fragment } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Password = ({ auth: { user } }) => {
  return <Fragment>Password</Fragment>;
};

Password.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Password);
