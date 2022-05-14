import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const CreateProfile = (props) => {
  const [formData, setFormData] = useState({
    status: '',
    bio: '',
    githubUsername: '',
    linkedin: '',
    youtube: '',
    facebook: '',
    instagram: '',
    twitter: '',
  });

  const {
    status,
    bio,
    githubUsername,
    linkedin,
    youtube,
    facebook,
    instagram,
    twitter,
  } = formData;

  return (
    <Fragment>
      <div className='container mt-8'>
        <form className='space-y-8 divide-y divide-gray-200'>
          <div className='space-y-8 divide-y divide-gray-200'>
            <div>
              <div>
                <h3 className='text-lg leading-6 font-medium text-gray-900'>
                  My Profile
                </h3>
              </div>

              <div className='mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6'>
                <div className='sm:col-span-6'>
                  <label
                    for='about'
                    className='block text-sm font-medium text-gray-700'
                  >
                    {' '}
                    About{' '}
                  </label>
                  <div className='mt-1'>
                    <textarea
                      id='about'
                      name='about'
                      rows='3'
                      className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md'
                    ></textarea>
                  </div>
                  <p className='mt-2 text-sm text-gray-500'>
                    Tell us a little about yourself
                  </p>
                </div>
              </div>
            </div>

            <div>
              <div className='mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6'>
                <div className='sm:col-span-3'>
                  <label
                    for='first-name'
                    className='block text-sm font-medium text-gray-700'
                  >
                    {' '}
                    Status{' '}
                  </label>
                  <div className='mt-1'>
                    <input
                      type='text'
                      name='first-name'
                      id='first-name'
                      className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
                    />
                  </div>
                  <p className='mt-2 text-sm text-gray-500'>
                    What is your current job?
                  </p>
                </div>

                <div className='sm:col-span-3'>
                  <label
                    for='last-name'
                    className='block text-sm font-medium text-gray-700'
                  >
                    {' '}
                    Github Username{' '}
                  </label>
                  <div className='mt-1'>
                    <input
                      type='text'
                      name='last-name'
                      id='last-name'
                      className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className='mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6'>
              <div className='sm:col-span-3'>
                <label
                  for='first-name'
                  className='block text-sm font-medium text-gray-700'
                >
                  {' '}
                  Facebook{' '}
                </label>
                <div className='mt-2 flex rounded-md shadow-sm'>
                  <svg
                    className='w-9 h-9 text-blue-600 fill-current mr-2'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                  >
                    <path d='M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' />
                  </svg>
                  <input
                    type='text'
                    name='username'
                    id='username'
                    autocomplete='username'
                    class='flex-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300'
                  />
                </div>
              </div>

              <div className='sm:col-span-3'>
                <label
                  for='last-name'
                  className='block text-sm font-medium text-gray-700'
                >
                  {' '}
                  Instagram{' '}
                </label>
                <div className='mt-2 flex rounded-md shadow-sm'>
                  <input
                    type='text'
                    name='last-name'
                    id='last-name'
                    className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
                  />
                </div>
              </div>

              <div className='sm:col-span-3'>
                <label
                  for='last-name'
                  className='block text-sm font-medium text-gray-700'
                >
                  {' '}
                  YouTube{' '}
                </label>
                <div className='mt-2 flex rounded-md shadow-sm'>
                  <input
                    type='text'
                    name='last-name'
                    id='last-name'
                    className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
                  />
                </div>
              </div>

              <div className='sm:col-span-3'>
                <div className='mt-2 flex rounded-md shadow-sm'>
                  <svg
                    className='w-9 h-9 text-blue-500 fill-current mr-2'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 448 512'
                  >
                    <path d='M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z'></path>
                  </svg>
                  <input
                    type='text'
                    name='last-name'
                    id='last-name'
                    className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
                  />
                </div>
              </div>

              <div className='sm:col-span-3'>
                <div className='mt-2 flex rounded-md shadow-sm'>
                  <svg
                    className='w-9 h-9 text-blue-300 fill-current mr-2'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                  >
                    <path d='M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z' />
                  </svg>
                  <input
                    type='text'
                    name='last-name'
                    id='last-name'
                    className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
                  />
                </div>
              </div>
            </div>

            <div className='pt-8'>
              <div>
                <h3 className='text-lg leading-6 font-medium text-gray-900'>
                  Notifications
                </h3>
                <p className='mt-1 text-sm text-gray-500'>
                  We'll always let you know about important changes, but you
                  pick what else you want to hear about.
                </p>
              </div>
              <div className='mt-6'>
                <fieldset>
                  <legend className='sr-only'>By Email</legend>
                  <div
                    className='text-base font-medium text-gray-900'
                    aria-hidden='true'
                  >
                    By Email
                  </div>
                  <div className='mt-4 space-y-4'>
                    <div className='relative flex items-start'>
                      <div className='flex items-center h-5'>
                        <input
                          id='comments'
                          name='comments'
                          type='checkbox'
                          className='focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded'
                        />
                      </div>
                      <div className='ml-3 text-sm'>
                        <label
                          for='comments'
                          className='font-medium text-gray-700'
                        >
                          Comments
                        </label>
                        <p className='text-gray-500'>
                          Get notified when someones posts a comment on a
                          posting.
                        </p>
                      </div>
                    </div>
                    <div className='relative flex items-start'>
                      <div className='flex items-center h-5'>
                        <input
                          id='candidates'
                          name='candidates'
                          type='checkbox'
                          className='focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded'
                        />
                      </div>
                      <div className='ml-3 text-sm'>
                        <label
                          for='candidates'
                          className='font-medium text-gray-700'
                        >
                          Candidates
                        </label>
                        <p className='text-gray-500'>
                          Get notified when a candidate applies for a job.
                        </p>
                      </div>
                    </div>
                    <div className='relative flex items-start'>
                      <div className='flex items-center h-5'>
                        <input
                          id='offers'
                          name='offers'
                          type='checkbox'
                          className='focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded'
                        />
                      </div>
                      <div className='ml-3 text-sm'>
                        <label
                          for='offers'
                          className='font-medium text-gray-700'
                        >
                          Offers
                        </label>
                        <p className='text-gray-500'>
                          Get notified when a candidate accepts or rejects an
                          offer.
                        </p>
                      </div>
                    </div>
                  </div>
                </fieldset>
                <fieldset className='mt-6'>
                  <legend className='contents text-base font-medium text-gray-900'>
                    Push Notifications
                  </legend>
                  <p className='text-sm text-gray-500'>
                    These are delivered via SMS to your mobile phone.
                  </p>
                  <div className='mt-4 space-y-4'>
                    <div className='flex items-center'>
                      <input
                        id='push-everything'
                        name='push-notifications'
                        type='radio'
                        className='focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300'
                      />
                      <label
                        for='push-everything'
                        className='ml-3 block text-sm font-medium text-gray-700'
                      >
                        {' '}
                        Everything{' '}
                      </label>
                    </div>
                    <div className='flex items-center'>
                      <input
                        id='push-email'
                        name='push-notifications'
                        type='radio'
                        className='focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300'
                      />
                      <label
                        for='push-email'
                        className='ml-3 block text-sm font-medium text-gray-700'
                      >
                        {' '}
                        Same as email{' '}
                      </label>
                    </div>
                    <div className='flex items-center'>
                      <input
                        id='push-nothing'
                        name='push-notifications'
                        type='radio'
                        className='focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300'
                      />
                      <label
                        for='push-nothing'
                        className='ml-3 block text-sm font-medium text-gray-700'
                      >
                        {' '}
                        No push notifications{' '}
                      </label>
                    </div>
                  </div>
                </fieldset>
              </div>
            </div>
          </div>

          <div className='pt-5'>
            <div className='flex justify-end'>
              <button
                type='button'
                className='bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
              >
                Cancel
              </button>
              <button
                type='submit'
                className='ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
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

CreateProfile.propTypes = {};

export default CreateProfile;
