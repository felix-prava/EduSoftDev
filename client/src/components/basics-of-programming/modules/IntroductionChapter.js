import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getAllMaterials } from '../../../actions/learning';
import MaterialItem from '../MaterialItem';

const IntroductionChapter = ({
  auth: { loading, user },
  learning: { problems },
  getAllMaterials,
}) => {
  useEffect(() => {
    getAllMaterials();
  }, [getAllMaterials]);

  return (
    <Fragment>
      <div className='relative bg-gray-50 pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8'>
        <div className='absolute inset-0'>
          <div className='bg-white h-1/3 sm:h-2/3'></div>
        </div>
        <div className='relative max-w-7xl mx-auto'>
          <div className='text-center'>
            <h2 className='text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl'>
              First Module - Introduction
            </h2>
            <p className='mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4'>
              How should the platform be used effectively? What is programming
              and what are the first steps? These are the first questions you
              will receive answers to.
            </p>
          </div>
          <div className='mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none'>
            {problems.map((problem) => (
              <MaterialItem
                key={problem._id}
                problem={problem}
                userExp={user.exp}
              />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
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
