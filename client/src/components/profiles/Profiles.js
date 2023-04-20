import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllProfiles } from '../../actions/profile';
import ProfileItem from './ProfileItem';
import { profilesTranslation } from '../layout/Translations';
import Spinner from '../layout/Spinner';

const Profiles = ({
  auth: { user },
  getAllProfiles,
  profile: { profiles, loading },
}) => {
  useEffect(() => {
    getAllProfiles();
  }, [getAllProfiles]);

  const language = user ? user.language : 'en';
  const userProfilesLabel = profilesTranslation.userProfiles[language];
  const noProfilesLabel = profilesTranslation.noProfiles[language];

  return (
    <Fragment>
      {profiles.length === 0 || loading ? (
        <Spinner />
      ) : (
        <div className='bg-gray-300'>
          <div className='max-w-7xl mx-auto py-12 px-4 text-center sm:px-6 lg:px-8 lg:py-24'>
            <div className='space-y-12'>
              <div className='space-y-5 sm:mx-auto sm:max-w-xl sm:space-y-4 lg:max-w-5xl'>
                <h2 className='text-3xl font-extrabold tracking-tight sm:text-4xl'>
                  {profiles.length > 0
                    ? `${userProfilesLabel}`
                    : `${noProfilesLabel}`}
                </h2>
              </div>
              {profiles.length > 0 && (
                <Fragment>
                  <ul className='space-y-4 sm:grid sm:grid-cols-2 sm:gap-6 sm:space-y-0 lg:grid-cols-3 lg:gap-8'>
                    {profiles.map((profile) => (
                      <ProfileItem key={profile._id} profile={profile} />
                    ))}
                  </ul>
                </Fragment>
              )}
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

Profiles.propTypes = {
  getAllProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getAllProfiles })(Profiles);
