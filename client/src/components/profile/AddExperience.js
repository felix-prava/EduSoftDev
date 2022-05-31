import React, { Fragment, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addExperience } from '../../actions/profile';

const AddExperience = ({ addExperience, auth: { user } }) => {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    from: '',
    to: '',
    current: false,
    description: '',
  });

  const [endDateDisabled, toggleDisabled] = useState(false);

  const { title, company, location, from, to, current, description } = formData;

  const onChange = (e) => {
    if (e.target.name === 'current') {
      toggleDisabled(!endDateDisabled);
      if (!endDateDisabled) {
        setFormData({ ...formData, to: '', current: !current });
      } else {
        setFormData({ ...formData, current: !current });
      }
      return;
    }
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();
  const onSubmit = (e) => {
    e.preventDefault();
    addExperience(formData, navigate, user._id);
  };

  return (
    <Fragment>
      <div className='container mt-8'>
        <form
          className='space-y-8 divide-y divide-gray-200'
          onSubmit={(e) => onSubmit(e)}
        >
          <div className='space-y-8 divide-y divide-gray-200'>
            <div>
              <div>
                <h3 className='text-2xl font-bold leading-6 font-medium text-gray-900 sm:text-2xl'>
                  Add Education
                </h3>
              </div>
            </div>

            <div>
              <div className='mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6'>
                <div className='sm:col-span-6'>
                  <label className='block text-sm font-medium text-gray-700'>
                    {' '}
                    Job title{' '}
                  </label>
                  <div className='mt-1'>
                    <input
                      type='text'
                      name='title'
                      value={title}
                      onChange={(e) => onChange(e)}
                      className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
                    />
                  </div>
                </div>

                <div className='sm:col-span-3'>
                  <label className='block text-sm font-medium text-gray-700'>
                    {' '}
                    Company name{' '}
                  </label>
                  <div className='mt-1'>
                    <input
                      type='text'
                      name='company'
                      value={company}
                      onChange={(e) => onChange(e)}
                      className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
                    />
                  </div>
                </div>

                <div className='sm:col-span-3'>
                  <label className='block text-sm font-medium text-gray-700'>
                    {' '}
                    Location{' '}
                  </label>
                  <div className='mt-1'>
                    <input
                      type='text'
                      name='location'
                      value={location}
                      onChange={(e) => onChange(e)}
                      className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
                    />
                  </div>
                </div>

                <div className='inline-flex'>
                  <div className='col-span-6 sm:col-span-6 lg:col-span-2 mr-3'>
                    <label className='block text-sm font-medium text-gray-700'>
                      {' '}
                      Start Date{' '}
                    </label>
                    <div className='mt-1'>
                      <input
                        type='date'
                        name='from'
                        value={from}
                        onChange={(e) => onChange(e)}
                        className='max-w-lg w-48 h-10 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md'
                      />
                    </div>
                  </div>

                  <div className='col-span-6 sm:col-span-6 lg:col-span-2 mr-3'>
                    <label className='block text-sm font-medium text-gray-700'>
                      {' '}
                      End Date{' '}
                    </label>
                    <div className='mt-1'>
                      <input
                        type='date'
                        name='to'
                        value={to}
                        onChange={(e) => onChange(e)}
                        disabled={endDateDisabled ? 'disabled' : ''}
                        className='max-w-lg w-48 h-10 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md'
                      />
                    </div>
                  </div>

                  <div className='col-span-6 sm:col-span-6 lg:col-span-2'>
                    <label className='block text-sm font-medium text-gray-700'>
                      Current
                    </label>
                    <div className='mt-1'>
                      <input
                        aria-describedby='comments-description'
                        name='current'
                        checked={current}
                        onChange={(e) => onChange(e)}
                        type='checkbox'
                        className='focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded'
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className='mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6'>
              <div className='sm:col-span-6'>
                <label className='block text-sm font-medium text-gray-700'>
                  {' '}
                  Job Description{' '}
                </label>
                <div className='mt-1'>
                  <textarea
                    name='description'
                    value={description}
                    onChange={(e) => onChange(e)}
                    rows='3'
                    className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md'
                  ></textarea>
                </div>
              </div>
            </div>
          </div>

          <div className='pt-5'>
            <div className='flex justify-end mb-8'>
              <Link to='/my-profile'>
                <button
                  type='button'
                  className='bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-offset-2 focus:ring-indigo-500'
                >
                  Cancel
                </button>
              </Link>
              <button
                type='submit'
                className='ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-offset-2 focus:ring-indigo-500'
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

AddExperience.propTypes = {
  auth: PropTypes.object.isRequired,
  addExperience: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { addExperience })(AddExperience);
