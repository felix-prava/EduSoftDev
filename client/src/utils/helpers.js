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
