import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getSolution } from '../../actions/solution';

const Solution = ({ solution: { solution }, getSolution }) => {
  const { solutionId } = useParams();

  useEffect(() => {
    getSolution(solutionId);
  }, [getSolution, solutionId]);
  return (
    <Fragment>
      <div>{solution && solution.problem.name}</div>
    </Fragment>
  );
};

Solution.propTypes = {
  solution: PropTypes.object.isRequired,
  getSolution: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  solution: state.solution,
});

export default connect(mapStateToProps, { getSolution })(Solution);
