import React, { Fragment } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Account = ({ auth: { user } }) => {
  return (
    <Fragment>
      <div className='space-y-6 sm:px-6 lg:px-0 lg:col-span-9'>
        <section aria-labelledby='payment-details-heading'>
          <form action='#' method='POST'>
            <div className='shadow sm:rounded-md sm:overflow-hidden'>
              <div className='bg-white py-6 px-4 sm:p-6'>
                <div>
                  <h2
                    id='payment-details-heading'
                    className='text-lg leading-6 font-medium text-gray-900'
                  >
                    Payment details
                  </h2>
                  <p className='mt-1 text-sm text-gray-500'>
                    Update your billing information. Please note that updating
                    your location could affect your tax rates.
                  </p>
                </div>

                <div className='mt-6 grid grid-cols-4 gap-6'>
                  <div className='col-span-4 sm:col-span-2'>
                    <label
                      htmlFor='first-name'
                      className='block text-sm font-medium text-gray-700'
                    >
                      First name
                    </label>
                    <input
                      type='text'
                      name='first-name'
                      id='first-name'
                      autoComplete='cc-given-name'
                      className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm'
                    />
                  </div>

                  <div className='col-span-4 sm:col-span-2'>
                    <label
                      htmlFor='last-name'
                      className='block text-sm font-medium text-gray-700'
                    >
                      Last name
                    </label>
                    <input
                      type='text'
                      name='last-name'
                      id='last-name'
                      autoComplete='cc-family-name'
                      className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm'
                    />
                  </div>

                  <div className='col-span-4 sm:col-span-2'>
                    <label
                      htmlFor='email-address'
                      className='block text-sm font-medium text-gray-700'
                    >
                      Email address
                    </label>
                    <input
                      type='text'
                      name='email-address'
                      id='email-address'
                      autoComplete='email'
                      className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm'
                    />
                  </div>

                  <div className='col-span-4 sm:col-span-1'>
                    <label
                      htmlFor='expiration-date'
                      className='block text-sm font-medium text-gray-700'
                    >
                      Expration date
                    </label>
                    <input
                      type='text'
                      name='expiration-date'
                      id='expiration-date'
                      autoComplete='cc-exp'
                      className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm'
                      placeholder='MM / YY'
                    />
                  </div>

                  <div className='col-span-4 sm:col-span-1'>
                    <label
                      htmlFor='security-code'
                      className='flex items-center text-sm font-medium text-gray-700'
                    >
                      <span>Security code</span>
                      <svg
                        className='ml-1 flex-shrink-0 h-5 w-5 text-gray-300'
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 20 20'
                        fill='currentColor'
                        aria-hidden='true'
                      >
                        <path
                          fillRule='evenodd'
                          d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z'
                          clipRule='evenodd'
                        />
                      </svg>
                    </label>
                    <input
                      type='text'
                      name='security-code'
                      id='security-code'
                      autoComplete='cc-csc'
                      className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm'
                    />
                  </div>

                  <div className='col-span-4 sm:col-span-2'>
                    <label
                      htmlFor='country'
                      className='block text-sm font-medium text-gray-700'
                    >
                      Country
                    </label>
                    <select
                      id='country'
                      name='country'
                      autoComplete='country-name'
                      className='mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm'
                    >
                      <option>United States</option>
                      <option>Canada</option>
                      <option>Mexico</option>
                    </select>
                  </div>

                  <div className='col-span-4 sm:col-span-2'>
                    <label
                      htmlFor='postal-code'
                      className='block text-sm font-medium text-gray-700'
                    >
                      ZIP / Postal code
                    </label>
                    <input
                      type='text'
                      name='postal-code'
                      id='postal-code'
                      autoComplete='postal-code'
                      className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm'
                    />
                  </div>
                </div>
              </div>
              <div className='px-4 py-3 bg-gray-50 text-right sm:px-6'>
                <button
                  type='submit'
                  className='bg-gray-800 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900'
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </section>

        <section aria-labelledby='plan-heading'>
          <form action='#' method='POST'>
            <div className='shadow sm:rounded-md sm:overflow-hidden'>
              <div className='bg-white py-6 px-4 space-y-6 sm:p-6'>
                <div>
                  <h2
                    id='plan-heading'
                    className='text-lg leading-6 font-medium text-gray-900'
                  >
                    Plan
                  </h2>
                </div>

                <fieldset>
                  <legend className='sr-only'>Pricing plans</legend>
                  <div className='relative bg-white rounded-md -space-y-px'>
                    <label className='rounded-tl-md rounded-tr-md relative border p-4 flex flex-col cursor-pointer md:pl-4 md:pr-6 md:grid md:grid-cols-3 focus:outline-none'>
                      <span className='flex items-center text-sm'>
                        <input
                          type='radio'
                          name='pricing-plan'
                          value='Startup'
                          className='h-4 w-4 text-orange-500 border-gray-300 focus:ring-gray-900'
                          aria-labelledby='pricing-plans-0-label'
                          aria-describedby='pricing-plans-0-description-0 pricing-plans-0-description-1'
                        />
                        <span
                          id='pricing-plans-0-label'
                          className='ml-3 font-medium text-gray-900'
                        >
                          Startup
                        </span>
                      </span>
                      <span
                        id='pricing-plans-0-description-0'
                        className='ml-6 pl-1 text-sm md:ml-0 md:pl-0 md:text-center'
                      >
                        <span className='font-medium'>$29 / mo</span>
                        <span>($290 / yr)</span>
                      </span>
                      <span
                        id='pricing-plans-0-description-1'
                        className='ml-6 pl-1 text-sm md:ml-0 md:pl-0 md:text-right'
                      >
                        Up to 5 active job postings
                      </span>
                    </label>

                    <label className='relative border p-4 flex flex-col cursor-pointer md:pl-4 md:pr-6 md:grid md:grid-cols-3 focus:outline-none'>
                      <span className='flex items-center text-sm'>
                        <input
                          type='radio'
                          name='pricing-plan'
                          value='Business'
                          className='h-4 w-4 text-orange-500 border-gray-300 focus:ring-gray-900'
                          aria-labelledby='pricing-plans-1-label'
                          aria-describedby='pricing-plans-1-description-0 pricing-plans-1-description-1'
                        />
                        <span
                          id='pricing-plans-1-label'
                          className='ml-3 font-medium text-gray-900'
                        >
                          Business
                        </span>
                      </span>
                      <span
                        id='pricing-plans-1-description-0'
                        className='ml-6 pl-1 text-sm md:ml-0 md:pl-0 md:text-center'
                      >
                        <span className='font-medium'>$99 / mo</span>
                        <span>($990 / yr)</span>
                      </span>
                      <span
                        id='pricing-plans-1-description-1'
                        className='ml-6 pl-1 text-sm md:ml-0 md:pl-0 md:text-right'
                      >
                        Up to 25 active job postings
                      </span>
                    </label>

                    <label className='rounded-bl-md rounded-br-md relative border p-4 flex flex-col cursor-pointer md:pl-4 md:pr-6 md:grid md:grid-cols-3 focus:outline-none'>
                      <span className='flex items-center text-sm'>
                        <input
                          type='radio'
                          name='pricing-plan'
                          value='Enterprise'
                          className='h-4 w-4 text-orange-500 border-gray-300 focus:ring-gray-900'
                          aria-labelledby='pricing-plans-2-label'
                          aria-describedby='pricing-plans-2-description-0 pricing-plans-2-description-1'
                        />
                        <span
                          id='pricing-plans-2-label'
                          className='ml-3 font-medium text-gray-900'
                        >
                          Enterprise
                        </span>
                      </span>
                      <span
                        id='pricing-plans-2-description-0'
                        className='ml-6 pl-1 text-sm md:ml-0 md:pl-0 md:text-center'
                      >
                        <span className='font-medium'>$249 / mo</span>
                        <span>($2490 / yr)</span>
                      </span>
                      <span
                        id='pricing-plans-2-description-1'
                        className='ml-6 pl-1 text-sm md:ml-0 md:pl-0 md:text-right'
                      >
                        Unlimited active job postings
                      </span>
                    </label>
                  </div>
                </fieldset>

                <div className='flex items-center'>
                  {/*<!-- Enabled: "bg-orange-500", Not Enabled: "bg-gray-200" -->*/}
                  <button
                    type='button'
                    className='bg-gray-200 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors ease-in-out duration-200'
                    role='switch'
                    aria-checked='true'
                    aria-labelledby='annual-billing-label'
                  >
                    {/*<!-- Enabled: "translate-x-5", Not Enabled: "translate-x-0" -->*/}
                    <span
                      aria-hidden='true'
                      className='translate-x-0 inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
                    ></span>
                  </button>
                  <span className='ml-3' id='annual-billing-label'>
                    <span className='text-sm font-medium text-gray-900'>
                      Annual billing{' '}
                    </span>
                    <span className='text-sm text-gray-500'>(Save 10%)</span>
                  </span>
                </div>
              </div>
              <div className='px-4 py-3 bg-gray-50 text-right sm:px-6'>
                <button
                  type='submit'
                  className='bg-gray-800 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900'
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </section>

        {/*<!-- Billing history -->*/}
        <section aria-labelledby='billing-history-heading'>
          <div className='bg-white pt-6 shadow sm:rounded-md sm:overflow-hidden'>
            <div className='px-4 sm:px-6'>
              <h2
                id='billing-history-heading'
                className='text-lg leading-6 font-medium text-gray-900'
              >
                Billing history
              </h2>
            </div>
            <div className='mt-6 flex flex-col'>
              <div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
                <div className='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8'>
                  <div className='overflow-hidden border-t border-gray-200'>
                    <table className='min-w-full divide-y divide-gray-200'>
                      <thead className='bg-gray-50'>
                        <tr>
                          <th
                            scope='col'
                            className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                          >
                            Date
                          </th>
                          <th
                            scope='col'
                            className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                          >
                            Description
                          </th>
                          <th
                            scope='col'
                            className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                          >
                            Amount
                          </th>
                          {/*<!--
                            `relative` is added here due to a weird bug in Safari that causes `sr-only` headings to introduce overflow on the body on mobile.
                            -->*/}
                          <th
                            scope='col'
                            className='relative px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                          >
                            <span className='sr-only'>View receipt</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className='bg-white divide-y divide-gray-200'>
                        <tr>
                          <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                            <time dateTime='2020-01-01'>1/1/2020</time>
                          </td>
                          <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                            Business Plan - Annual Billing
                          </td>
                          <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                            CA$109.00
                          </td>
                          <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
                            <a
                              href='#'
                              className='text-orange-600 hover:text-orange-900'
                            >
                              View receipt
                            </a>
                          </td>
                        </tr>
                        {/*<!-- More payments... -->*/}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Fragment>
  );
};

Account.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Account);
