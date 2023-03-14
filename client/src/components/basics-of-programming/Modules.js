import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Modules = ({ auth: { loading, user } }) => {
  const expNeededForIfElseModule = 10;
  const expNeededForWhileForLoopsModule = 200;
  const expNeededForArraysFunctionsModule = 500;
  const expNeededForMatrixStringsModule = 850;
  const expNeededForDatabaseAndOOPModule = 1250;
  const expNeededForBacktrackingRecursionModule = 700;

  return (
    <Fragment>
      <div className='relative bg-gray-50 pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8'>
        <div className='absolute inset-0'>
          <div className='bg-white h-1/3 sm:h-2/3'></div>
        </div>
        <div className='relative max-w-7xl mx-auto'>
          <div className='text-center'>
            <h2 className='text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl'>
              The Basics of Programming
            </h2>
            <p className='mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4'>
              Learn step by step the basics of programming by reading
              theoretical lessons, completing quizzes and most importantly,
              solving problems that aim to develop your logical thinking and
              make you think like a programmer.
            </p>
          </div>
          <div className='mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none'>
            <div className='flex flex-col rounded-lg shadow-lg overflow-hidden'>
              <div className='flex-shrink-0'>
                <img
                  className='h-48 w-full object-cover'
                  src='https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80'
                  alt=''
                />
              </div>
              <div className='flex-1 bg-white p-6 flex flex-col justify-between'>
                <div className='flex-1'>
                  <Link to='/modules/introduction' className='block mt-2'>
                    <p className='text-xl font-semibold text-gray-900'>
                      Introduction
                    </p>
                    <p className='mt-3 text-base text-gray-500'>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Architecto accusantium praesentium eius, ut atque fuga
                      culpa, similique sequi cum eos quis dolorum.
                    </p>
                  </Link>
                </div>
              </div>
            </div>

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
                  <Link to='/modules/if-else' className='block mt-2'>
                    <p className='text-xl font-semibold text-gray-900'>
                      If Else - Conditional Statments
                    </p>
                    {!loading && user && user.exp >= expNeededForIfElseModule ? (
                      <p className='mt-3 text-base text-gray-500'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Velit facilis asperiores porro quaerat doloribus,
                        eveniet dolore. Adipisci tempora aut inventore optio
                        animi., tempore temporibus quo laudantium.
                      </p>
                    ) : (
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
                    )}
                  </Link>
                </div>
              </div>
            </div>

            <div className='flex flex-col rounded-lg shadow-lg overflow-hidden'>
              <div className='flex-shrink-0'>
                <img
                  className='h-48 w-full object-cover'
                  src='https://images.unsplash.com/photo-1492724441997-5dc865305da7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80'
                  alt=''
                />
              </div>
              <div className='flex-1 bg-white p-6 flex flex-col justify-between'>
                <div className='flex-1'>
                  <Link to='/modules/while-for' className='block mt-2'>
                    <p className='text-xl font-semibold text-gray-900'>
                      While and For Loops
                    </p>
                    {!loading &&
                    user &&
                    user.exp >= expNeededForWhileForLoopsModule ? (
                      <p className='mt-3 text-base text-gray-500'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Velit facilis asperiores porro quaerat doloribus,
                        eveniet dolore. Adipisci tempora aut inventore optio
                        animi., tempore temporibus quo laudantium.
                      </p>
                    ) : (
                      <Fragment>
                        <div className='grid grid-cols-1 gap-4 place-items-center h-24'>
                          <div>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              className='h-16 w-16 justify-center'
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
                  </Link>
                </div>
              </div>
            </div>

            <div className='flex flex-col rounded-lg shadow-lg overflow-hidden'>
              <div className='flex-shrink-0'>
                <img
                  className='h-48 w-full object-cover'
                  src='https://images.unsplash.com/photo-1492724441997-5dc865305da7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80'
                  alt=''
                />
              </div>
              <div className='flex-1 bg-white p-6 flex flex-col justify-between'>
                <div className='flex-1'>
                  <Link to='/modules/arrays-functions' className='block mt-2'>
                    <p className='text-xl font-semibold text-gray-900'>
                      Arrays and Functions
                    </p>
                    {!loading &&
                    user &&
                    user.exp >= expNeededForArraysFunctionsModule ? (
                      <p className='mt-3 text-base text-gray-500'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Velit facilis asperiores porro quaerat doloribus,
                        eveniet dolore. Adipisci tempora aut inventore optio
                        animi., tempore temporibus quo laudantium.
                      </p>
                    ) : (
                      <Fragment>
                        <div className='grid grid-cols-1 gap-4 place-items-center h-24'>
                          <div>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              className='h-16 w-16 justify-center'
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
                  </Link>
                </div>
              </div>
            </div>

            <div className='flex flex-col rounded-lg shadow-lg overflow-hidden'>
              <div className='flex-shrink-0'>
                <img
                  className='h-48 w-full object-cover'
                  src='https://images.unsplash.com/photo-1492724441997-5dc865305da7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80'
                  alt=''
                />
              </div>
              <div className='flex-1 bg-white p-6 flex flex-col justify-between'>
                <div className='flex-1'>
                  <Link to='/modules/matrix-strings' className='block mt-2'>
                    <p className='text-xl font-semibold text-gray-900'>
                      Matrix and Strings
                    </p>
                    {!loading &&
                    user &&
                    user.exp >= expNeededForMatrixStringsModule ? (
                      <p className='mt-3 text-base text-gray-500'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Velit facilis asperiores porro quaerat doloribus,
                        eveniet dolore. Adipisci tempora aut inventore optio
                        animi., tempore temporibus quo laudantium.
                      </p>
                    ) : (
                      <Fragment>
                        <div className='grid grid-cols-1 gap-4 place-items-center h-24'>
                          <div>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              className='h-16 w-16 justify-center'
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
                  </Link>
                </div>
              </div>
            </div>

            <div className='flex flex-col rounded-lg shadow-lg overflow-hidden'>
              <div className='flex-shrink-0'>
                <img
                  className='h-48 w-full object-cover'
                  src='https://images.unsplash.com/photo-1492724441997-5dc865305da7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80'
                  alt=''
                />
              </div>
              <div className='flex-1 bg-white p-6 flex flex-col justify-between'>
                <div className='flex-1'>
                  <Link to='/modules/oop-db' className='block mt-2'>
                    <p className='text-xl font-semibold text-gray-900'>
                      OOP and Databases
                    </p>
                    {!loading &&
                    user &&
                    user.exp >= expNeededForDatabaseAndOOPModule ? (
                      <p className='mt-3 text-base text-gray-500'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Velit facilis asperiores porro quaerat doloribus,
                        eveniet dolore. Adipisci tempora aut inventore optio
                        animi., tempore temporibus quo laudantium.
                      </p>
                    ) : (
                      <Fragment>
                        <div className='grid grid-cols-1 gap-4 place-items-center h-24'>
                          <div>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              className='h-16 w-16 justify-center'
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
                  </Link>
                </div>
              </div>
            </div>

            <div className='flex flex-col rounded-lg shadow-lg overflow-hidden'>
              <div className='flex-shrink-0'>
                <img
                  className='h-48 w-full object-cover'
                  src='https://images.unsplash.com/photo-1492724441997-5dc865305da7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80'
                  alt=''
                />
              </div>
              <div className='flex-1 bg-white p-6 flex flex-col justify-between'>
                <div className='flex-1'>
                  <Link
                    to='/modules/backtracking-recursion'
                    className='block mt-2'
                  >
                    <p className='text-xl font-semibold text-gray-900'>
                      Backtracking and Recursion
                    </p>
                    {!loading &&
                    user &&
                    user.exp >= expNeededForBacktrackingRecursionModule ? (
                      <p className='mt-3 text-base text-gray-500'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Velit facilis asperiores porro quaerat doloribus,
                        eveniet dolore. Adipisci tempora aut inventore optio
                        animi., tempore temporibus quo laudantium.
                      </p>
                    ) : (
                      <Fragment>
                        <div className='grid grid-cols-1 gap-4 place-items-center h-24'>
                          <div>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              className='h-16 w-16 justify-center'
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
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

Modules.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(Modules);
