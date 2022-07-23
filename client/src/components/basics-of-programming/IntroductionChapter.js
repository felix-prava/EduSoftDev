import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllMaterials } from '../../actions/learning';

const IntroductionChapter = ({
  auth: { loading, user },
  learning: { problems },
  getAllMaterials,
}) => {
  useEffect(() => {
    getAllMaterials();
  }, [getAllMaterials]);
  return <div>IntroductionChapter</div>;
};

IntroductionChapter.propTypes = {
  auth: PropTypes.object.isRequired,
  learning: PropTypes.object.isRequired,
  getAllMaterials: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  learning: state.learning,
});

export default connect(mapStateToProps, { getAllMaterials })(
  IntroductionChapter
);
