import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { universalTranslations } from '../layout/Translations';

const MaterialItem = ({
  auth: { user },
  problem: { _id, name, type, expNeeded, expGained, expMax, shortDescription },
  userExp,
  module,
  toggleModal,
  setModalData,
}) => {
  const materialType =
    type === 'Problem' ? 'problems' : type === 'Lesson' ? 'lessons' : 'quizzes';
  const materialTypeClass =
    type === 'Problem'
      ? 'text-blue-700'
      : type === 'Lesson'
      ? 'text-rose-600'
      : 'text-lime-600';
  const materialPath = `/${module}/${materialType}/${_id}`;

  const itemsColSpan =
    user && (user.role === 'admin' || user.role === 'mentor')
      ? 'sm:col-span-7'
      : 'sm:col-span-9';

  const language = user ? user.language : 'en';
  const problemLabel = universalTranslations.problem[language];
  const lessonLabel = universalTranslations.lesson[language];
  const quizLabel = universalTranslations.quiz[language];

  let navigate = useNavigate();
  function editLearningMaterial(learningMaterialId) {
    navigate(`/${module}/${materialType}/edit/${learningMaterialId}`);
  }

  function translateType(type) {
    if (type === 'Problem') {
      return problemLabel;
    }
    if (type === 'Lesson') {
      return lessonLabel;
    }
    return quizLabel;
  }

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
            {userExp >= expNeeded ||
            (user && (user.role === 'admin' || user.role === 'mentor')) ? (
              <Fragment>
                <Link to={materialPath} className='block mt-2'>
                  <div className='grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-9'>
                    <div className={itemsColSpan}>
                      <p className='text-xl font-semibold text-gray-900'>
                        {name}
                      </p>
                      <p className={materialTypeClass}>{translateType(type)}</p>
                      <p className='mt-3 text-base text-gray-500'>
                        {shortDescription || 'No description available'}
                      </p>
                    </div>
                    {(user.role === 'admin' || user.role === 'mentor') && (
                      <div className='sm:col-span-2'>
                        <p className='text-blue-700'>
                          E.N. {expNeeded || 'N/A'}
                        </p>
                        <p className='text-lime-600'>
                          E.G. {expGained || 'N/A'}
                        </p>
                        <p className='text-rose-600'>E.M. {expMax || 'N/A'}</p>
                      </div>
                    )}
                  </div>
                </Link>
                {(user.role === 'admin' || user.role === 'mentor') && (
                  <Fragment>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setModalData([
                          'Delete ' + type,
                          'Are you sure you want to delete this ' +
                            type.charAt(0).toLowerCase() +
                            type.slice(1) +
                            '? It will be permanently removed from the database. This action cannot be undone.',
                          _id,
                          type,
                        ]);
                        toggleModal();
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

                    <button
                      type='button'
                      onClick={(e) => {
                        e.preventDefault();
                        editLearningMaterial(_id);
                      }}
                      className='float-right mt-2 py-1 px-3 flex items-center inline-flex justify-center ml-4 text-sm font-medium border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500'
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-5 w-5'
                        viewBox='0 0 20 20'
                        fill='currentColor'
                      >
                        <path d='M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z' />
                        <path
                          fillRule='evenodd'
                          d='M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z'
                          clipRule='evenodd'
                        />
                      </svg>
                    </button>
                  </Fragment>
                )}
              </Fragment>
            ) : (
              <Fragment>
                <p className='text-xl font-semibold text-gray-900'>{name}</p>
                <p className={materialTypeClass}>{translateType(type)}</p>
                <div className='grid grid-cols-1 gap-4 place-items-center h-24'>
                  <div>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-16 w-16'
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
                </div>
              </Fragment>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

MaterialItem.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(MaterialItem);
