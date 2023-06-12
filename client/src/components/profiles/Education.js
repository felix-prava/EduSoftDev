import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { deleteEducation } from '../../actions/profile';
import Modal from '../layout/Modal';
import {
  educationTranslations,
  universalTranslations,
} from '../layout/Translations';

const Education = ({ auth: { user }, education, userId, deleteEducation }) => {
  const language = user ? user.language : 'en';
  const deleteEducationLabel = educationTranslations.deleteEducation[language];
  const areYouSureDeleteEducationLabel =
    educationTranslations.areYouSureDeleteEducation[language];
  const deleteButtonLabel = universalTranslations.deleteButton[language];

  const [modal, setModal] = useState(false);
  const [targetId, setTargetId] = useState('');

  const educations = education.map((edu) => (
    <li key={edu._id} className='sm:py-8'>
      <div className='space-y-4 mr-4 sm:gap-6 sm:space-y-0'>
        <div className='sm:col-span-2'>
          <div className='space-y-4'>
            <div className='grid grid-cols-1 sm:grid-cols-2'>
              <div className='text-lg leading-6 font-medium space-y-1'>
                <h2>{edu.school}</h2>
                <p className='text-indigo-600'>
                  {edu.degree} - {edu.fieldOfStudy}
                </p>
                <p className='text-gray-800'>
                  <Moment format='YYYY/MM/DD'>{edu.from}</Moment> -{' '}
                  {edu.to === null ? (
                    'Now'
                  ) : (
                    <Moment format='YYYY/MM/DD'>{edu.to}</Moment>
                  )}
                </p>
              </div>
              {(user._id === userId || user.role === 'admin') && (
                <div>
                  <button
                    type='button'
                    onClick={() => {
                      setTargetId(edu._id);
                      setModal(!modal);
                    }}
                    className='mt-4 sm:float-center inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400'
                  >
                    {deleteButtonLabel}
                  </button>
                </div>
              )}
            </div>
            <div className='text-lg'>
              <p className='text-gray-500'>{edu.description}</p>
            </div>
          </div>
        </div>
      </div>
    </li>
  ));

  return (
    <Fragment>
      <ul className='space-y-12 sm:divide-y sm:divide-gray-200 sm:space-y-0 sm:-mt-8 lg:gap-x-8 lg:space-y-0'>
        {educations}
      </ul>
      {modal && (
        <Modal
          modalData={[deleteEducationLabel, areYouSureDeleteEducationLabel]}
          hideModal={() => setModal(false)}
          action={() => deleteEducation(targetId, userId)}
        />
      )}
    </Fragment>
  );
};

Education.propTypes = {
  auth: PropTypes.object.isRequired,
  education: PropTypes.array.isRequired,
  deleteEducation: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deleteEducation })(Education);
