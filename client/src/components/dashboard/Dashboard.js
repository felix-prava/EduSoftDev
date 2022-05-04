import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// TODO delete comments
// import { getModules } from '../../actions/modules'; -- maybe not

const Dashboard = ({ auth }) => {
  return <div>Dashboard</div>;
};

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  // getModules: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Dashboard);

// export default connect(mapStateToProps, {getModules})(Dashboard);
