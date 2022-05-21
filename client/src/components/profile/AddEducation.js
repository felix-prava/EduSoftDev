import React, { Fragment } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const AddEducation = ({ auth: { user } }) => {
  return (
    <Fragment>
      <div className='container mt-8'>Add Education {user.firstName}</div>
    </Fragment>
  );
};

AddEducation.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, null)(AddEducation);
