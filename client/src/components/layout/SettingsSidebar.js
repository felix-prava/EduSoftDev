import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useLocation, Link } from 'react-router-dom';
import Account from '../settings/Account';
import Password from '../settings/Password';
import Appearance from '../settings/Appearance';
import { settingsTranslations } from './Translations';

const SettingsSidebar = ({ auth: { user } }) => {
  const menuItemClass =
    'text-gray-900 hover:text-gray-900 hover:bg-gray-50 group rounded-md px-3 py-2 flex items-center text-sm font-medium';
  const selectedMenuItemClass =
    'bg-gray-50 text-orange-600 hover:bg-white group rounded-md px-3 py-2 flex items-center text-sm font-medium';

  const svgClass =
    'text-gray-400 group-hover:text-gray-500 flex-shrink-0 -ml-1 mr-3 h-6 w-6';
  const selectedItemSvgClass =
    'text-orange-500 flex-shrink-0 -ml-1 mr-3 h-6 w-6';

  const language = user ? user.language : 'en';
  const accountLabel = settingsTranslations.account[language];
  const passwordLabel = settingsTranslations.password[language];
  const appearanceLabel = settingsTranslations.appearance[language];
  const notificationsLabel = settingsTranslations.notifications[language];
  const planAndBillingLabel = settingsTranslations.planAndBilling[language];

  let location = useLocation();
  let settingsMenu = null;
  switch (location.pathname) {
    case '/settings/account':
      settingsMenu = (
        <Fragment>
          <Account />
        </Fragment>
      );
      break;
    case '/settings/security':
      settingsMenu = (
        <Fragment>
          <Password />
        </Fragment>
      );
      break;
    case '/settings/appearance':
      settingsMenu = (
        <Fragment>
          <Appearance />
        </Fragment>
      );
      break;
    default:
      settingsMenu = 'Error';
  }

  return (
    <Fragment>
      <div className='h-full'>
        <main className='max-w-7xl mx-auto pb-10 lg:py-12 lg:px-8'>
          <div className='lg:grid lg:grid-cols-12 lg:gap-x-5'>
            <aside className='py-6 px-2 sm:px-6 lg:py-0 lg:px-0 lg:col-span-2'>
              <nav className='space-y-1'>
                <Link
                  to='/settings/account'
                  className={
                    location.pathname === '/settings/account'
                      ? selectedMenuItemClass
                      : menuItemClass
                  }
                >
                  <svg
                    className={
                      location.pathname === '/settings/account'
                        ? selectedItemSvgClass
                        : svgClass
                    }
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth='2'
                    stroke='currentColor'
                    aria-hidden='true'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z'
                    />
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                    />
                  </svg>
                  <span className='truncate'> {accountLabel} </span>
                </Link>

                <Link
                  to='/settings/security'
                  className={
                    location.pathname === '/settings/security'
                      ? selectedMenuItemClass
                      : menuItemClass
                  }
                >
                  <svg
                    className={
                      location.pathname === '/settings/security'
                        ? selectedItemSvgClass
                        : svgClass
                    }
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth='2'
                    stroke='currentColor'
                    aria-hidden='true'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z'
                    />
                  </svg>
                  <span className='truncate'> {passwordLabel} </span>
                </Link>

                <Link
                  to='/settings/appearance'
                  className={
                    location.pathname === '/settings/appearance'
                      ? selectedMenuItemClass
                      : menuItemClass
                  }
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className={
                      location.pathname === '/settings/appearance'
                        ? selectedItemSvgClass
                        : svgClass
                    }
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z'
                    />
                  </svg>
                  <span className='truncate'> {appearanceLabel} </span>
                </Link>

                <Link
                  to='/settings/emails'
                  className={
                    location.pathname === '/settings/emails'
                      ? selectedMenuItemClass
                      : menuItemClass
                  }
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className={
                      location.pathname === '/settings/emails'
                        ? selectedItemSvgClass
                        : svgClass
                    }
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207'
                    />
                  </svg>
                  <span className='truncate'> Email </span>
                </Link>

                <Link
                  to='/settings/notifications'
                  className={
                    location.pathname === '/settings/notifications'
                      ? selectedMenuItemClass
                      : menuItemClass
                  }
                >
                  <svg
                    className={
                      location.pathname === '/settings/notifications'
                        ? selectedItemSvgClass
                        : svgClass
                    }
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth='2'
                    stroke='currentColor'
                    aria-hidden='true'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9'
                    />
                  </svg>
                  <span className='truncate'> {notificationsLabel} </span>
                </Link>

                <Link
                  to='/settings/billing'
                  className={
                    location.pathname === '/settings/billing'
                      ? selectedMenuItemClass
                      : menuItemClass
                  }
                >
                  <svg
                    className={
                      location.pathname === '/settings/billing'
                        ? selectedItemSvgClass
                        : svgClass
                    }
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth='2'
                    stroke='currentColor'
                    aria-hidden='true'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z'
                    />
                  </svg>
                  <span className='truncate'> {planAndBillingLabel} </span>
                </Link>
              </nav>
            </aside>
            {settingsMenu}
          </div>
        </main>
      </div>
    </Fragment>
  );
};

SettingsSidebar.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(SettingsSidebar);
