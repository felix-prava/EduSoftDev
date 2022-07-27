import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteLearningMaterial } from '../../actions/learning';

const MaterialItem = ({
  auth: { user },
  problem: { _id, name, type, expNeeded, shortDescription },
  userExp,
  deleteLearningMaterial,
}) => {
  const materialType =
    type === 'Problem' ? 'problems' : type === 'Lesson' ? 'lessons' : 'quizzes';
  const materialTypeClass =
    type === 'Problem'
      ? 'text-blue-700'
      : type === 'Lesson'
      ? 'text-rose-600'
      : 'text-lime-600';
  const materialPath = `/${materialType}/${_id}`;

  return (
    <Fragment>
      <div className='flex flex-col rounded-lg shadow-lg overflow-hidden'>
        <div className='flex-shrink-0'>
          <img
            className='h-48 w-full object-cover'
            src='https://images.unsplash.com/photo-1547586696-ea22b4d4235d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80'
            alt=''
          />
        </div>
        <div className='flex-1 bg-white p-6 flex flex-col justify-between'>
          <div className='flex-1'>
            <Link to={materialPath} className='block mt-2'>
              <p className='text-xl font-semibold text-gray-900'>{name}</p>
              {userExp > expNeeded ||
              (user && (user.role === 'admin' || user.role === 'mentor')) ? (
                <Fragment>
                  <p className={materialTypeClass}>{type}</p>
                  <p className='mt-3 text-base text-gray-500'>
                    {shortDescription || 'No short description available'}
                  </p>
                  {(user.role === 'admin' || user.role === 'mentor') && (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        deleteLearningMaterial(_id, type);
                      }}
                      className='float-right mt-2 bg-red-600 border border-transparent rounded-md shadow-sm py-1 px-3 flex items-center inline-flex justify-center ml-4 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600'
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-5 w-5'
                        viewBox='0 0 20 20'
                        fill='currentColor'
                      >
                        <path
                          fillRule='evenodd'
                          d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                          clipRule='evenodd'
                        />
                      </svg>
                    </button>
                  )}
                </Fragment>
              ) : (
                <Fragment>
                  <div className='items-center justify-center border border-dahsed'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-8 w-8'
                      viewBox='0 0 20 20'
                      fill='currentColor'
                    >
                      <path
                        fillRule='evenodd'
                        d='M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z'
                        clipRule='evenodd'
                      />
                    </svg>
                  </div>
                </Fragment>
              )}
            </Link>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

MaterialItem.propTypes = {
  auth: PropTypes.object.isRequired,
  deleteLearningMaterial: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deleteLearningMaterial })(
  MaterialItem
);
