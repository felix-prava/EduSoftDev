import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { XCircleIcon, CheckCircleIcon, XIcon } from '@heroicons/react/solid';

const Alert = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map((alert) => (
    <div key={alert.id} className='container mt-6 mb-3'>
      <div
        className={`rounded-md bg-${
          alert.alertType === 'error' ? 'red' : 'green'
        }-50 p-4`}
      >
        <div className='flex'>
          {alert.alertType === 'error' ? (
            <div className='flex-shrink-0'>
              <XCircleIcon
                className='h-5 w-5 text-red-400'
                aria-hidden='true'
              />
            </div>
          ) : (
            <div className='flex-shrink-0'>
              <CheckCircleIcon
                className='h-5 w-5 text-green-400'
                aria-hidden='true'
              />
            </div>
          )}
          <div className='ml-3'>
            <h3
              className={`text-sm font-medium text-${
                alert.alertType === 'error' ? 'red' : 'green'
              }-800`}
            >
              {alert.msg}
            </h3>
          </div>
          {alert.alertType === 'error' ? (
            <div className='ml-auto pl-3'>
              <div className='-mx-1.5 -my-1.5'>
                <button
                  type='button'
                  className={`inline-flex bg-red-50 rounded-md p-1.5 text-red-500 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-red-50 focus:ring-red-600`}
                >
                  <span className='sr-only'>Dismiss</span>
                  <XIcon className='h-5 w-5' aria-hidden='true' />
                </button>
              </div>
            </div>
          ) : (
            <div className='ml-auto pl-3'>
              <div className='-mx-1.5 -my-1.5'>
                <button
                  type='button'
                  className={`inline-flex bg-green-50 rounded-md p-1.5 text-green-500 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-50 focus:ring-green-600`}
                >
                  <span className='sr-only'>Dismiss</span>
                  <XIcon className='h-5 w-5' aria-hidden='true' />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  ));

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(Alert);
