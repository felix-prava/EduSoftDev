import React from 'react';
import { Link } from 'react-router-dom';
import {
  DocumentReportIcon,
  InboxIcon,
  ReplyIcon,
  UsersIcon,
} from '@heroicons/react/outline';

const toggleMobileDropdown = function () {
  const dropdown = document.getElementById('mobile-dropdown-menu');
  dropdown.classList.toggle('hidden');
};

const features = [
  {
    name: '200+ Practice Questions',
    description: 'There are over 200 problems and quizzes you can choose from.',
    icon: InboxIcon,
  },
  {
    name: 'Help from our Mentors',
    description:
      'Do you have concerns or questions? Our mentors are always ready to answer.',
    icon: UsersIcon,
  },
  {
    name: 'View Your Progress',
    description:
      'There are different statistics that will help you understand what you are doing well, what you need to improve and how you are doing in relation to other users.',
    icon: DocumentReportIcon,
  },
  {
    name: 'In Your Own Rhythm',
    description:
      'There are no fixed hours at which you must be present. You can learn from where you want, when you want and for how long you want.',
    icon: ReplyIcon,
  },
];
const footerNavigation = {
  social: [
    {
      name: 'Facebook',
      href: '#',
      icon: (props) => (
        <svg fill='currentColor' viewBox='0 0 24 24' {...props}>
          <path
            fillRule='evenodd'
            d='M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z'
            clipRule='evenodd'
          />
        </svg>
      ),
    },
    {
      name: 'Instagram',
      href: '#',
      icon: (props) => (
        <svg fill='currentColor' viewBox='0 0 24 24' {...props}>
          <path
            fillRule='evenodd'
            d='M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z'
            clipRule='evenodd'
          />
        </svg>
      ),
    },
    {
      name: 'Twitter',
      href: '#',
      icon: (props) => (
        <svg fill='currentColor' viewBox='0 0 24 24' {...props}>
          <path d='M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84' />
        </svg>
      ),
    },
    {
      name: 'GitHub',
      href: '#',
      icon: (props) => (
        <svg fill='currentColor' viewBox='0 0 24 24' {...props}>
          <path
            fillRule='evenodd'
            d='M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z'
            clipRule='evenodd'
          />
        </svg>
      ),
    },
    {
      name: 'YouTube',
      href: '#',
      icon: (props) => (
        <svg fill='currentColor' viewBox='0 0 24 24' {...props}>
          <path
            fillRule='evenodd'
            d='M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z'
            clipRule='evenodd'
          />
        </svg>
      ),
    },
  ],
};

export default function Landing() {
  return (
    <div className='bg-white'>
      <header>
        <div className='relative bg-white'>
          <div className='flex justify-between items-center max-w-7xl mx-auto px-4 py-6 sm:px-6 md:justify-start md:space-x-10 lg:px-8'>
            <div className='flex justify-start lg:w-0 lg:flex-1'>
              <Link to='#'>
                <span className='sr-only'>Workflow</span>
                <img
                  className='h-8 w-auto sm:h-10'
                  src='https://tailwindui.com/img/logos/workflow-mark-purple-600-to-indigo-600.svg'
                  alt=''
                />
              </Link>
            </div>
            <div className='-mr-2 -my-2 md:hidden'>
              <button
                onClick={toggleMobileDropdown}
                type='button'
                className='bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500'
                aria-expanded='false'
              >
                <span className='sr-only'>Open menu</span>
                {/* Heroicon name: outline/menu */}
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
                    strokeWidth={2}
                    d='M4 6h16M4 12h16M4 18h16'
                  />
                </svg>
              </button>
            </div>

            <div className='hidden md:flex items-center justify-end md:flex-1 lg:w-0'>
              <Link
                to='/login'
                className='whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900'
              >
                {' '}
                Sign in{' '}
              </Link>
              <Link
                to='/register'
                className='ml-8 whitespace-nowrap inline-flex items-center justify-center bg-gradient-to-r from-purple-600 to-indigo-600 bg-origin-border px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white hover:from-purple-700 hover:to-indigo-700'
              >
                {' '}
                Sign up{' '}
              </Link>
            </div>
          </div>
          {/*
            Mobile menu, show/hide based on mobile menu state.

            Entering: "duration-200 ease-out"
              From: "opacity-0 scale-95"
              To: "opacity-100 scale-100"
            Leaving: "duration-100 ease-in"
              From: "opacity-100 scale-100"
              To: "opacity-0 scale-95"
          */}
          <div className='absolute z-30 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden'>
            <div
              id='mobile-dropdown-menu'
              className='rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50 hidden'
            >
              <div className='pt-5 pb-6 px-5'>
                <div className='flex items-center justify-between'>
                  <div>
                    <img
                      className='h-8 w-auto'
                      src='https://tailwindui.com/img/logos/workflow-mark-purple-600-to-indigo-600.svg'
                      alt='Workflow'
                    />
                  </div>
                  <div className='-mr-2'>
                    <button
                      onClick={toggleMobileDropdown}
                      type='button'
                      className='bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500'
                    >
                      <span className='sr-only'>Close menu</span>
                      {/* Heroicon name: outline/x */}
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
                          strokeWidth={2}
                          d='M6 18L18 6M6 6l12 12'
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              <div className='py-6 px-5'>
                <div className='grid grid-cols-2 gap-4'>
                  <Link
                    to='/about-us'
                    className='text-base font-medium text-gray-900 hover:text-gray-700'
                  >
                    About Us
                  </Link>
                </div>
                <div className='mt-6'>
                  <Link
                    to='/register'
                    className='w-full flex items-center justify-center bg-gradient-to-r from-purple-600 to-indigo-600 bg-origin-border px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white hover:from-purple-700 hover:to-indigo-700'
                  >
                    Sign up
                  </Link>
                  <p className='mt-6 text-center text-base font-medium text-gray-500'>
                    Existing customer?{' '}
                    <Link to='/login' className='text-gray-900'>
                      Sign in
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* Hero section */}
        <div className='relative'>
          <div className='absolute inset-x-0 bottom-0 h-1/2 bg-gray-100' />
          <div className='max-w-7xl mx-auto sm:px-6 lg:px-8'>
            <div className='relative shadow-xl sm:rounded-2xl sm:overflow-hidden'>
              <div className='absolute inset-0'>
                <img
                  className='h-full w-full object-cover'
                  src='https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2830&q=80&sat=-100'
                  alt='People working on laptops'
                />
                <div className='absolute inset-0 bg-gradient-to-r from-purple-800 to-indigo-700 mix-blend-multiply' />
              </div>
              <div className='relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8'>
                <h1 className='text-center text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl'>
                  <span className='block text-white'>Take control of your</span>
                  <span className='block text-indigo-200'>IT career</span>
                </h1>
                <p className='mt-6 max-w-lg mx-auto text-center text-xl text-indigo-200 sm:max-w-3xl'>
                  You get a solid foundation in online programming right from
                  the start – on EduSoftDev you understand what every line of
                  code you write does. Sign up for free and learn how to write
                  code with confidence even without taking a computer science
                  course!
                </p>
                <div className='mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center'>
                  <div className='space-y-4 sm:space-y-0 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5'>
                    <Link
                      to='/register'
                      className='flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-indigo-700 bg-white hover:bg-indigo-50 sm:px-8'
                    >
                      Get started
                    </Link>
                    <Link
                      to='/about-us'
                      className='flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-500 bg-opacity-60 hover:bg-opacity-70 sm:px-8'
                    >
                      About Us
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Logo Cloud */}
        <div className='bg-gray-100'>
          <div className='max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8'>
            {/* 
            <p className='text-center text-sm font-semibold uppercase text-gray-500 tracking-wide'>
              Trusted by over 5 very average small businesses
            </p>
            <div className='mt-6 grid grid-cols-2 gap-8 md:grid-cols-6 lg:grid-cols-5'>
              <div className='col-span-1 flex justify-center md:col-span-2 lg:col-span-1'>
                <img
                  className='h-12'
                  src='https://tailwindui.com/img/logos/tuple-logo-gray-400.svg'
                  alt='Tuple'
                />
              </div>
              <div className='col-span-1 flex justify-center md:col-span-2 lg:col-span-1'>
                <img
                  className='h-12'
                  src='https://tailwindui.com/img/logos/mirage-logo-gray-400.svg'
                  alt='Mirage'
                />
              </div>
              <div className='col-span-1 flex justify-center md:col-span-2 lg:col-span-1'>
                <img
                  className='h-12'
                  src='https://tailwindui.com/img/logos/statickit-logo-gray-400.svg'
                  alt='StaticKit'
                />
              </div>
              <div className='col-span-1 flex justify-center md:col-span-2 md:col-start-2 lg:col-span-1'>
                <img
                  className='h-12'
                  src='https://tailwindui.com/img/logos/transistor-logo-gray-400.svg'
                  alt='Transistor'
                />
              </div>
              <div className='col-span-2 flex justify-center md:col-span-2 md:col-start-4 lg:col-span-1'>
                <img
                  className='h-12'
                  src='https://tailwindui.com/img/logos/workcation-logo-gray-400.svg'
                  alt='Workcation'
                />
              </div>
            </div>
            */}
          </div>
        </div>

        {/* Alternating Feature Sections */}
        {/*
        <div className='relative pt-16 pb-32 overflow-hidden'>
          <div
            aria-hidden='true'
            className='absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-gray-100'
          />
          <div className='relative'>
            <div className='lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:grid-flow-col-dense lg:gap-24'>
              <div className='px-4 max-w-xl mx-auto sm:px-6 lg:py-16 lg:max-w-none lg:mx-0 lg:px-0'>
                <div>
                  <div>
                    <span className='h-12 w-12 rounded-md flex items-center justify-center bg-gradient-to-r from-purple-600 to-indigo-600'>
                      <InboxIcon
                        className='h-6 w-6 text-white'
                        aria-hidden='true'
                      />
                    </span>
                  </div>
                  <div className='mt-6'>
                    <h2 className='text-3xl font-extrabold tracking-tight text-gray-900'>
                      Stay on top of customer support
                    </h2>
                    <p className='mt-4 text-lg text-gray-500'>
                      Semper curabitur ullamcorper posuere nunc sed. Ornare
                      iaculis bibendum malesuada faucibus lacinia porttitor.
                      Pulvinar laoreet sagittis viverra duis. In venenatis sem
                      arcu pretium pharetra at. Lectus viverra dui tellus ornare
                      pharetra.
                    </p>
                    <div className='mt-6'>
                      <Link
                        to='/register'
                        className='inline-flex bg-gradient-to-r from-purple-600 to-indigo-600 bg-origin-border px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white hover:from-purple-700 hover:to-indigo-700'
                      >
                        Get started
                      </Link>
                    </div>
                  </div>
                </div>
                <div className='mt-8 border-t border-gray-200 pt-6'>
                  <blockquote>
                    <div>
                      <p className='text-base text-gray-500'>
                        &ldquo;Cras velit quis eros eget rhoncus lacus ultrices
                        sed diam. Sit orci risus aenean curabitur donec aliquet.
                        Mi venenatis in euismod ut.&rdquo;
                      </p>
                    </div>
                    <footer className='mt-3'>
                      <div className='flex items-center space-x-3'>
                        <div className='flex-shrink-0'>
                          <img
                            className='h-6 w-6 rounded-full'
                            src='https://images.unsplash.com/photo-1509783236416-c9ad59bae472?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80'
                            alt=''
                          />
                        </div>
                        <div className='text-base font-medium text-gray-700'>
                          Marcia Hill, Digital Marketing Manager
                        </div>
                      </div>
                    </footer>
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
          <div className='mt-24'>
            <div className='lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:grid-flow-col-dense lg:gap-24'>
              <div className='px-4 max-w-xl mx-auto sm:px-6 lg:py-32 lg:max-w-none lg:mx-0 lg:px-0 lg:col-start-2'>
                <div>
                  <div>
                    <span className='h-12 w-12 rounded-md flex items-center justify-center bg-gradient-to-r from-purple-600 to-indigo-600'>
                      <SparklesIcon
                        className='h-6 w-6 text-white'
                        aria-hidden='true'
                      />
                    </span>
                  </div>
                  <div className='mt-6'>
                    <h2 className='text-3xl font-extrabold tracking-tight text-gray-900'>
                      Better understand your customers
                    </h2>
                    <p className='mt-4 text-lg text-gray-500'>
                      Semper curabitur ullamcorper posuere nunc sed. Ornare
                      iaculis bibendum malesuada faucibus lacinia porttitor.
                      Pulvinar laoreet sagittis viverra duis. In venenatis sem
                      arcu pretium pharetra at. Lectus viverra dui tellus ornare
                      pharetra.
                    </p>
                    <div className='mt-6'>
                      <Link
                        to='/register'
                        className='inline-flex bg-gradient-to-r from-purple-600 to-indigo-600 bg-origin-border px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white hover:from-purple-700 hover:to-indigo-700'
                      >
                        Get started
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        */}

        {/* Gradient Feature Section */}
        <div className='bg-gradient-to-r from-purple-800 to-indigo-700'>
          <div className='max-w-4xl mx-auto px-4 py-16 sm:px-6 sm:pt-20 sm:pb-24 lg:max-w-7xl lg:pt-24 lg:px-8'>
            <h2 className='text-3xl font-extrabold text-white tracking-tight'>
              All-In-One Platform
            </h2>
            <p className='mt-4 max-w-3xl text-lg text-purple-200'>
              If you want to start learning programming, you don't need to leave
              the platform. You'll have everything you need right here.
            </p>
            <div className='mt-12 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-16'>
              {features.map((feature) => (
                <div key={feature.name}>
                  <div>
                    <span className='flex items-center justify-center h-12 w-12 rounded-md bg-white bg-opacity-10'>
                      <feature.icon
                        className='h-6 w-6 text-white'
                        aria-hidden='true'
                      />
                    </span>
                  </div>
                  <div className='mt-6'>
                    <h3 className='text-lg font-medium text-white'>
                      {feature.name}
                    </h3>
                    <p className='mt-2 text-base text-purple-200'>
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className='bg-white'>
          <div className='max-w-4xl mx-auto py-16 px-4 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 lg:flex lg:items-center lg:justify-between'>
            <h2 className='text-4xl font-extrabold tracking-tight text-gray-900 sm:text-4xl'>
              <span className='block'>Ready to get started?</span>
              <span className='-mb-1 pb-1 block bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent'>
                Get in touch or create an account.
              </span>
            </h2>
            <div className='mt-6 space-y-4 sm:space-y-0 sm:flex sm:space-x-5'>
              <Link
                to='/about-us'
                className='flex items-center justify-center bg-gradient-to-r from-purple-600 to-indigo-600 bg-origin-border px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white hover:from-purple-700 hover:to-indigo-700'
              >
                Learn more
              </Link>
              <Link
                to='/register'
                className='flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-indigo-800 bg-indigo-50 hover:bg-indigo-100'
              >
                Get started
              </Link>
            </div>
          </div>
        </div>
      </main>

      <footer className='bg-gray-50' aria-labelledby='footer-heading'>
        <h2 id='footer-heading' className='sr-only'>
          Footer
        </h2>
        <div className='max-w-7xl mx-auto pt-16 pb-8 px-4 sm:px-6 lg:pt-24 lg:px-8'>
          <div className='xl:grid xl:grid-cols-3 xl:gap-8'>
            <div className='mt-4 xl:mt-0'>
              <h3 className='text-sm font-semibold text-gray-400 tracking-wider uppercase'>
                Subscribe to our newsletter
              </h3>
              <p className='mt-0 text-base text-gray-500'>
                The latest news, articles, and resources, sent to your inbox
                weekly.
              </p>
              <form className='mt-4 sm:flex sm:max-w-md'>
                <label htmlFor='email-address' className='sr-only'>
                  Email address
                </label>
                <input
                  type='email'
                  name='email-address'
                  id='email-address'
                  autoComplete='email'
                  required
                  className='appearance-none min-w-0 w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-4 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:placeholder-gray-400'
                  placeholder='Enter your email'
                />
                <div className='mt-3 rounded-md sm:mt-0 sm:ml-3 sm:flex-shrink-0'>
                  <button
                    type='submit'
                    className='w-full flex items-center justify-center bg-gradient-to-r from-purple-600 to-indigo-600 bg-origin-border px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white hover:from-purple-700 hover:to-indigo-700'
                  >
                    Subscribe
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className='mt-12 border-t border-gray-200 pt-8 md:flex md:items-center md:justify-between lg:mt-16'>
            <div className='flex space-x-6 md:order-2'>
              {footerNavigation.social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className='text-gray-400 hover:text-gray-500'
                >
                  <span className='sr-only'>{item.name}</span>
                  <item.icon className='h-6 w-6' aria-hidden='true' />
                </a>
              ))}
            </div>
            <p className='mt-8 text-base text-gray-400 md:mt-0 md:order-1'>
              &copy; 2023 EduSoftDev, Inc. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
