import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  displayDate,
  statusClassColour,
  scoreClassColour,
  translateSolutionStatus,
} from '../../utils/helpers';

const NormalSolutionItem = ({
  language,
  solution: { _id, problem, status, score, date },
}) => {
  return (
    <Fragment>
      <tr className='bg-white' id={_id}>
        <td className='max-w-0 w-full px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
          <div className='flex'>
            <Link
              to={`/${problem.module}/problems/${problem._id}`}
              className='group inline-flex space-x-2 truncate text-sm'
            >
              {/* Heroicon name: solid/cash */}
              <svg
                className='flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-500'
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
              <p className='text-gray-500 truncate group-hover:text-gray-900'>
                {problem.name}
              </p>
            </Link>
          </div>
        </td>
        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
          <Link
            to={`/solutions/${_id}`}
            className='group inline-flex space-x-2 truncate text-sm'
          >
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusClassColour(
                status
              )}`}
            >
              {translateSolutionStatus(status, language)}
            </span>
          </Link>
        </td>
        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
          <Link
            to={`/solutions/${_id}`}
            className='group inline-flex space-x-2 truncate text-sm'
          >
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${scoreClassColour(
                score
              )} capitalize`}
            >
              {score}
            </span>
          </Link>
        </td>
        <td className='px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500'>
          <time dateTime={date}> {displayDate(date, language)}</time>
        </td>
      </tr>
    </Fragment>
  );
};

NormalSolutionItem.propTypes = {
  solution: PropTypes.object.isRequired,
};

export default connect(null, {})(NormalSolutionItem);
