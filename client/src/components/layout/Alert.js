import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { XCircleIcon, CheckCircleIcon, XIcon } from '@heroicons/react/solid';
import { removeAlert } from '../../actions/alert';

const Alert = ({ alerts, removeAlert }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map((alert) => {
    const alertColour = alert.alertType === 'error' ? 'red' : 'green';

    let firstDivClassName = null;
    if (alert.alertType === 'error') {
      firstDivClassName = 'rounded-md bg-red-50 p-4';
    } else {
      firstDivClassName = 'rounded-md bg-green-50 p-4';
    }

    let secondDivClassName = null;
    if (alert.alertType === 'error') {
      secondDivClassName = 'text-sm font-medium text-red-800';
    } else {
      secondDivClassName = 'text-sm font-medium text-green-800';
    }

    let thirdDivClassName = null;
    if (alert.alertType === 'error') {
      thirdDivClassName =
        'inline-flex bg-red-50 rounded-md p-1.5 text-red-500 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-red-50 focus:ring-red-600';
    } else {
      thirdDivClassName =
        'inline-flex bg-green-50 rounded-md p-1.5 text-green-500 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-50 focus:ring-green-600';
    }

    return (
      <div key={alert.id} className='container mt-6 mb-3'>
        <div className={firstDivClassName}>
          <div className='flex'>
            <div className='flex-shrink-0'>
              {alert.alertType === 'error' ? (
                <XCircleIcon
                  className='h-5 w-5 text-red-400'
                  aria-hidden='true'
                />
              ) : (
                <CheckCircleIcon
                  className='h-5 w-5 text-green-400'
                  aria-hidden='true'
                />
              )}
            </div>
            <div className='ml-3'>
              <h3 className={secondDivClassName}>{alert.msg}</h3>
            </div>
            <div className='ml-auto pl-3'>
              <div className='-mx-1.5 -my-1.5'>
                <button
                  onClick={() => removeAlert(alert.id)}
                  type='button'
                  className={thirdDivClassName}
                >
                  <span className='sr-only'>Dismiss</span>
                  <XIcon className='h-5 w-5' aria-hidden='true' />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  });

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
  removeAlert: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps, { removeAlert })(Alert);
