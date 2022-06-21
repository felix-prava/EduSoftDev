import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { deleteExperience } from '../../actions/profile';

const Experience = ({
  auth: { user },
  experience,
  userId,
  deleteExperience,
}) => {
  const experiences = experience.map((exp) => (
    <li key={exp._id} className='sm:py-8'>
      <div className='space-y-4 mr-4 sm:gap-6 sm:space-y-0'>
        <div className='sm:col-span-2'>
          <div className='space-y-4'>
            <div className='grid grid-cols-1 sm:grid-cols-2'>
              <div className='text-lg leading-6 font-medium space-y-1'>
                <h2>{exp.title}</h2>
                <p className='text-indigo-600'>
                  {exp.company}{' '}
                  {exp.location && <Fragment>- {exp.location} </Fragment>}
                </p>
                <p className='text-gray-800'>
                  <Moment format='YYYY/MM/DD'>{exp.from}</Moment> -{' '}
                  {exp.to === null ? (
                    'Now'
                  ) : (
                    <Moment format='YYYY/MM/DD'>{exp.to}</Moment>
                  )}
                </p>
              </div>
              {(user._id === userId || user.role === 'admin') && (
                <div>
                  <button
                    type='button'
                    onClick={() => deleteExperience(exp._id, userId)}
                    className='mt-4 sm:float-center inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400'
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
            <div className='text-lg'>
              <p className='text-gray-500'>{exp.description}</p>
            </div>
          </div>
        </div>
      </div>
    </li>
  ));

  return (
    <Fragment>
      <ul className='space-y-12 sm:divide-y sm:divide-gray-200 sm:space-y-0 sm:-mt-8 lg:gap-x-8 lg:space-y-0'>
        {experiences}
      </ul>
    </Fragment>
  );
};

Experience.propTypes = {
  auth: PropTypes.object.isRequired,
  experience: PropTypes.array.isRequired,
  deleteExperience: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deleteExperience })(Experience);
