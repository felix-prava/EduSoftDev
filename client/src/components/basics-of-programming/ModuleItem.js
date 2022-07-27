import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { getAllMaterials } from '../../actions/learning';
import MaterialItem from './MaterialItem';
import Spinner from '../layout/Spinner';
import PageNotFound from '../layout/PageNotFound';
import {
  INTRODUCTION_TITLE,
  INTRODUCTION_DESCRIPTION,
} from './modulesInformation';

const ModuleItem = ({
  auth: { user },
  learning: { loading, problems },
  getAllMaterials,
}) => {
  let { module: moduleName } = useParams();
  let title = null;
  let description = null;
  let displayErrorPage = false;

  useEffect(() => {
    getAllMaterials(`${moduleName}`);
  }, [getAllMaterials, moduleName]);

  switch (moduleName) {
    case 'introduction':
      title = INTRODUCTION_TITLE;
      description = INTRODUCTION_DESCRIPTION;
      break;
    case 'if-else':
      title = 'Ola';
      break;
    default:
      displayErrorPage = true;
  }

  if (displayErrorPage) {
    return <PageNotFound />;
  }

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className='relative bg-gray-50 pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8'>
        <div className='absolute inset-0'>
          <div className='bg-white h-1/3 sm:h-2/3'></div>
        </div>
        <div className='relative max-w-7xl mx-auto'>
          <div className='text-center'>
            <h2 className='text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl'>
              {title}
            </h2>
            <p className='mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4'>
              {description}
            </p>
          </div>
          {user && (user.role === 'admin' || user.role === 'mentor') && (
            <div className='mr-8 mb-4 float-right'>
              <div className='mt-6 flex space-x-3 '>
                <Link to={`/modules/${moduleName}/create-problem`}>
                  <button
                    type='button'
                    className='inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500'
                  >
                    Add Problem
                  </button>
                </Link>
                <Link to={`/modules/${moduleName}/create-lesson`}>
                  <button
                    type='button'
                    className='inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500'
                  >
                    Add Lesson
                  </button>
                </Link>
                <Link to={`/modules/${moduleName}/create-quiz`}>
                  <button
                    type='button'
                    className='inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500'
                  >
                    Add Quiz
                  </button>
                </Link>
              </div>
            </div>
          )}
          <div className='mt-24 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none'>
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

ModuleItem.propTypes = {
  auth: PropTypes.object.isRequired,
  learning: PropTypes.object.isRequired,
  getAllMaterials: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  learning: state.learning,
});

export default connect(mapStateToProps, { getAllMaterials })(ModuleItem);
