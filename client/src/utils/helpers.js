import { Fragment } from 'react';
import Moment from 'react-moment';
import moment from 'moment';

export const displayDate = (date) => {
  let yesterdayMidnight = moment().subtract(1, 'days').endOf('day');
  let lastDayOfLastYear = moment().subtract(1, 'years').endOf('year');
  if (moment(date) > yesterdayMidnight) {
    return (
      <Fragment>
        Today <Moment format='HH:mm'>{date}</Moment>
      </Fragment>
    );
  } else if (moment(date) > lastDayOfLastYear) {
    return <Moment format='DD/MM'>{date}</Moment>;
  } else {
    return <Moment format='DD/MM/YYYY'>{date}</Moment>;
  }
};

export const scoreClassColour = (score) => {
  if (score == 0) return 'bg-red-500 text-red-900';
  if (score <= 60) return 'bg-yellow-100 text-yellow-600';
  if (score < 100) return 'bg-green-100 text-green-600';
  return 'bg-green-400 text-green-800';
};

export const statusClassColour = (status) => {
  if (status === 'accepted') return 'bg-green-400 text-green-800';
  if (status === 'pending') return 'bg-yellow-100 text-yellow-600';
  return 'bg-red-500 text-red-900';
};
