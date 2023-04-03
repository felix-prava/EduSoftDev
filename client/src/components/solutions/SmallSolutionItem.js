import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { displayDate, statusClassColour } from '../../utils/helpers';

const SmallSolutionItem = ({ solution: { _id, problem, status, date } }) => {
  return (
    <Fragment>
      <li id={_id}>
        <div className='block px-4 py-4 bg-white hover:bg-gray-50'>
          <span className='flex items-center space-x-4'>
            <span className='flex-1 flex space-x-2 truncate'>
              <svg
                className='flex-shrink-0 h-5 w-5 text-gray-400'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 20 20'
                fill='currentColor'
                aria-hidden='true'
              >
                <path
                  fillRule='evenodd'
                  d='M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z'
                  clipRule='evenodd'
                />
              </svg>
              <span className='flex flex-col text-gray-500 text-sm truncate'>
                <Link to={`/${problem.module}/problems/${problem._id}`}>
                  <span className='truncate'>{problem.name}</span>
                </Link>
                <span className='py-2'>
                  <Link
                    to={`/solutions/${_id}`}
                    className='group inline-flex space-x-2 truncate text-sm'
                  >
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusClassColour(
                        status
                      )} capitalize`}
                    >
                      {status}
                    </span>
                  </Link>
                </span>
                <time dateTime={date}> {displayDate(date)}</time>
              </span>
            </span>
            <svg
              className='flex-shrink-0 h-5 w-5 text-gray-400'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 20 20'
              fill='currentColor'
              aria-hidden='true'
            >
              <path
                fillRule='evenodd'
                d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
                clipRule='evenodd'
              />
            </svg>
          </span>
        </div>
      </li>
    </Fragment>
  );
};

SmallSolutionItem.propTypes = {
  solution: PropTypes.object.isRequired,
};

export default connect(null, {})(SmallSolutionItem);
