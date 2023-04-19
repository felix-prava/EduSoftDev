import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logoutUser } from '../../actions/auth';
import { useLocation } from 'react-router-dom';
import { navbarTranslation } from './Translations';

const toggleProfileDropdown = function () {
  const profileDropdown = document.getElementById('profile-dropdown-options');
  const notificationsDropdown = document.getElementById(
    'notifications-dropdown-options'
  );
  profileDropdown.classList.toggle('hidden');
  notificationsDropdown.classList.add('hidden');
};

const toggleNotificationsDropdown = function () {
  const profileDropdown = document.getElementById('profile-dropdown-options');
  const notificationsDropdown = document.getElementById(
    'notifications-dropdown-options'
  );
  notificationsDropdown.classList.toggle('hidden');
  profileDropdown.classList.add('hidden');
};

const toggleMobileDropdown = function () {
  const dropdown = document.getElementById('mobile-menu');
  const profileDropdown = document.getElementById('profile-dropdown-options');
  const notificationsDropdown = document.getElementById(
    'notifications-dropdown-options'
  );

  dropdown.classList.toggle('hidden');
  profileDropdown.classList.add('hidden');
  notificationsDropdown.classList.add('hidden');
};

const Navbar = ({ auth: { isAuthenticated, loading, user }, logoutUser }) => {
  let location = useLocation();
  if (location.pathname === '/') {
    return <Fragment></Fragment>;
  }

  const language = user ? user.language : 'en';
  const homeLabel = navbarTranslation.home[language];
  const profilesLabel = navbarTranslation.profiles[language];
  const modulesLabel = navbarTranslation.modules[language];
  const articlesLabel = navbarTranslation.articles[language];
  const registerLabel = navbarTranslation.register[language];
  const aboutUsLabel = navbarTranslation.aboutUs[language];
  const loginLabel = navbarTranslation.login[language];
  const logoutLabel = navbarTranslation.logout[language];
  const signOutLabel = navbarTranslation.signOut[language];
  const settingsLabel = navbarTranslation.settings[language];
  const myProfileLabel = navbarTranslation.myProfile[language];

  const modules = (
    <Link
      to='/modules'
      className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'
    >
      {modulesLabel}
    </Link>
  );

  const modulesMobile = (
    <Link
      to='/modules'
      className='text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium'
    >
      {modulesLabel}
    </Link>
  );

  const articles = (
    <Link
      to='/articles'
      className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'
    >
      {articlesLabel}
    </Link>
  );

  const articlesMobile = (
    <Link
      to='/articles'
      className='text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium'
    >
      {articlesLabel}
    </Link>
  );

  const normalUserLinks = (
    <Fragment>
      <Link
        to='/home'
        className='bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium'
        aria-current='page'
      >
        {homeLabel}
      </Link>

      {modules}
      {articles}

      <Link
        to='#'
        onClick={logoutUser}
        className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'
      >
        {logoutLabel}
      </Link>
    </Fragment>
  );

  const mentorLinks = (
    <Fragment>
      <Link
        to='/home'
        className='bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium'
        aria-current='page'
      >
        {homeLabel}
      </Link>

      {modules}
      {articles}
    </Fragment>
  );

  const adminLinks = (
    <Fragment>
      <Link
        to='/home'
        className='bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium'
        aria-current='page'
      >
        {homeLabel}
      </Link>

      {modules}

      <Link
        to='/admin/profiles'
        className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'
      >
        {profilesLabel}
      </Link>

      {articles}
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <Link
        to='/'
        className='bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium'
        aria-current='page'
      >
        {homeLabel}
      </Link>

      <Link
        to='/register'
        className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'
      >
        {registerLabel}
      </Link>

      <Link
        to='/login'
        className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'
      >
        {loginLabel}
      </Link>

      {articles}

      <Link
        to='/about-us'
        className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'
      >
        {aboutUsLabel}
      </Link>
    </Fragment>
  );

  const normalUserMobileLinks = (
    <Fragment>
      <Link
        to='/home'
        className='bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium'
        aria-current='page'
      >
        {homeLabel}
      </Link>

      {modulesMobile}
      {articlesMobile}

      <Link
        to='#'
        onClick={logoutUser}
        className='text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium'
      >
        {logoutLabel}
      </Link>
    </Fragment>
  );

  const mentorMobileLinks = (
    <Fragment>
      <Link
        to='/home'
        className='bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium'
        aria-current='page'
      >
        {homeLabel}
      </Link>

      {modulesMobile}
      {articlesMobile}
    </Fragment>
  );

  const adminMobileLinks = (
    <Fragment>
      <Link
        to='/home'
        className='bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium'
        aria-current='page'
      >
        {homeLabel}
      </Link>

      {modulesMobile}

      <Link
        to='/admin/profiles'
        className='text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium'
      >
        {profilesLabel}
      </Link>

      {articlesMobile}
    </Fragment>
  );

  const guestMobileLinks = (
    <Fragment>
      <Link
        to='/'
        className='bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium'
        aria-current='page'
      >
        {homeLabel}
      </Link>

      <Link
        to='/register'
        className='text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium'
      >
        {registerLabel}
      </Link>

      <Link
        to='/login'
        className='text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium'
      >
        {loginLabel}
      </Link>

      {articlesMobile}

      <Link
        to='/about-us'
        className='text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium'
      >
        {aboutUsLabel}
      </Link>
    </Fragment>
  );

  function displayNavbarLinks(userRole) {
    if (userRole === 'normal') {
      return normalUserLinks;
    }
    if (userRole === 'mentor') {
      return mentorLinks;
    }
    return adminLinks;
  }

  function displayNavbarMobileLinks(userRole) {
    if (userRole === 'normal') {
      return normalUserMobileLinks;
    }
    if (userRole === 'mentor') {
      return mentorMobileLinks;
    }
    return adminMobileLinks;
  }

  return (
    <Fragment>
      <nav className='bg-gray-800'>
        <div className='mx-auto mr-12 ml-6'>
          <div className='relative flex items-center justify-between h-16'>
            <div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
              {/*<!-- Mobile menu button-->*/}
              <button
                type='button'
                className='inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
                aria-controls='mobile-menu'
                aria-expanded='false'
              >
                <span className='sr-only'>Open main menu</span>

                <svg
                  className='block h-6 w-6'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  aria-hidden='true'
                  id='mobile-menu-button'
                  onClick={toggleMobileDropdown}
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M4 6h16M4 12h16M4 18h16'
                  />
                </svg>
                <svg
                  className='hidden h-6 w-6'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  aria-hidden='true'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              </button>
            </div>
            <div className='flex-1 flex items-center justify-center sm:items-stretch sm:justify-start'>
              <div className='flex-shrink-0 flex items-center'>
                <img
                  className='block lg:hidden h-8 w-auto'
                  src='https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg'
                  alt='Workflow'
                ></img>
                <img
                  className='hidden lg:block h-8 w-auto'
                  src='https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg'
                  alt='Workflow'
                ></img>
              </div>
              <div className='hidden sm:block sm:ml-6'>
                <div className='flex space-x-4'>
                  {!loading && (
                    <Fragment>
                      {isAuthenticated
                        ? user && displayNavbarLinks(user.role)
                        : guestLinks}
                    </Fragment>
                  )}
                </div>
              </div>
            </div>
            {!loading && isAuthenticated && (
              <div className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
                <div
                  id='notifications-bell'
                  onClick={toggleNotificationsDropdown}
                >
                  <button
                    type='button'
                    className='bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'
                  >
                    <span className='sr-only'>View notifications</span>
                    {/*<!-- Heroicon name: outline/bell -->*/}

                    <svg
                      className='h-6 w-6'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                      aria-hidden='true'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9'
                      />
                    </svg>
                  </button>
                </div>

                {/*<!-- Profile dropdown -->*/}
                <div className='ml-3 relative'>
                  <div
                    id='profile-dropdown-button'
                    onClick={toggleProfileDropdown}
                  >
                    <button
                      type='button'
                      className='bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'
                      id='user-menu-button'
                      aria-expanded='false'
                      aria-haspopup='true'
                    >
                      <span className='sr-only'>Open user menu</span>
                      <img
                        className='h-8 w-8 rounded-full'
                        src={user && user.avatar}
                        alt=''
                      ></img>
                    </button>
                  </div>

                  <div id='notifications-dropdown-options' className='hidden'>
                    <div
                      className='origin-top-right absolute right-12 mt-2 ml-8 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50'
                      role='menu'
                      aria-orientation='vertical'
                      aria-labelledby='user-menu-button'
                      tabIndex='-1'
                    >
                      {/*<!-- Active: "bg-gray-100", Not Active: "" -->*/}
                      <Link
                        to='#'
                        className='block px-4 py-2 text-sm text-gray-700'
                        role='menuitem'
                        tabIndex='-1'
                        id='user-menu-item-0'
                      >
                        Your Profile24
                      </Link>
                      <Link
                        to='#'
                        className='block px-4 py-2 text-sm text-gray-700'
                        role='menuitem'
                        tabIndex='-1'
                        id='user-menu-item-1'
                      >
                        Settings24
                      </Link>
                      <Link
                        to='#'
                        className='block px-4 py-2 text-sm text-gray-700'
                        role='menuitem'
                        tabIndex='-1'
                        id='user-menu-item-2'
                      >
                        Sign out24
                      </Link>
                    </div>
                  </div>

                  <div id='profile-dropdown-options' className='hidden'>
                    <div
                      className='origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50'
                      role='menu'
                      aria-orientation='vertical'
                      aria-labelledby='user-menu-button'
                      tabIndex='-1'
                    >
                      {/*<!-- Active: "bg-gray-100", Not Active: "" -->*/}
                      <Link
                        to='/my-profile'
                        className='block px-4 py-2 text-sm text-gray-700'
                        role='menuitem'
                        tabIndex='-1'
                        id='user-menu-item-0'
                      >
                        {myProfileLabel}
                      </Link>
                      <Link
                        to='/settings/account'
                        className='block px-4 py-2 text-sm text-gray-700'
                        role='menuitem'
                        tabIndex='-1'
                        id='user-menu-item-1'
                      >
                        {settingsLabel}
                      </Link>
                      <Link
                        to='#'
                        onClick={logoutUser}
                        className='block px-4 py-2 text-sm text-gray-700'
                        role='menuitem'
                        tabIndex='-1'
                        id='user-menu-item-2'
                      >
                        {signOutLabel}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/*<!-- Mobile menu, show/hide based on menu state. -->*/}
        <div className='sm:hidden hidden' id='mobile-menu'>
          <div className='px-2 pt-2 pb-3 space-y-1'>
            {isAuthenticated
              ? user && displayNavbarMobileLinks(user.role)
              : guestMobileLinks}
          </div>
        </div>
      </nav>
    </Fragment>
  );
};

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(Navbar);
