import { Fragment } from 'react';
import Moment from 'react-moment';
import moment from 'moment';
import { universalTranslations } from '../components/layout/Translations';

const LESSONS_IMAGES_COUNT = 4;
const PROBLEMS_IMAGES_COUNT = 7;
const QUIZZES_IMAGES_COUNT = 4;

export const displayDate = (date, language = 'en') => {
  let yesterdayMidnight = moment().subtract(1, 'days').endOf('day');
  let lastDayOfLastYear = moment().subtract(1, 'years').endOf('year');
  if (moment(date) > yesterdayMidnight) {
    return (
      <Fragment>
        {universalTranslations.today[language]}{' '}
        <Moment format='HH:mm'>{date}</Moment>
      </Fragment>
    );
  } else if (moment(date) > lastDayOfLastYear) {
    return <Moment format='DD/MM'>{date}</Moment>;
  } else {
    return <Moment format='DD/MM/YYYY'>{date}</Moment>;
  }
};

export const imageSource = (index, learningMaterialType) => {
  let availableImages = LESSONS_IMAGES_COUNT;
  let folderPath = 'lessons';
  if (learningMaterialType === 'Problem') {
    availableImages = PROBLEMS_IMAGES_COUNT;
    folderPath = 'problems';
  }
  if (learningMaterialType === 'Quiz') {
    availableImages = QUIZZES_IMAGES_COUNT;
    folderPath = 'quizzes';
  }
  const selectedImageIndex = index % availableImages;

  return (
    process.env.PUBLIC_URL +
    `/images/${folderPath}/${learningMaterialType.toLowerCase()}${selectedImageIndex}.jpg`
  );
};

export const scoreClassColour = (score) => {
  if (score === 0) return 'bg-red-500 text-red-900';
  if (score <= 60) return 'bg-yellow-100 text-yellow-600';
  if (score < 100) return 'bg-green-100 text-green-600';
  return 'bg-green-400 text-green-800';
};

export const statusClassColour = (status, onlyText = false) => {
  if (onlyText) {
    if (status === 'accepted') return 'text-green-600';
    if (status === 'pending') return 'text-yellow-500';
    return 'text-red-700';
  }
  if (status === 'accepted') return 'bg-green-400 text-green-800';
  if (status === 'pending') return 'bg-yellow-100 text-yellow-600';
  return 'bg-red-500 text-red-900';
};

export const capitalizeWords = (str) => {
  return str
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};
