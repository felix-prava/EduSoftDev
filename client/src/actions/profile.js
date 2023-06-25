import axios from 'axios';
import { setAlert } from './alert';
import { profileTranslations } from './translations';
import {
  GET_PROFILE,
  GET_PROFILES,
  UPDATE_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  ACCOUNT_DELETED,
  GET_REPOS,
  GITHUB_ERROR,
} from './types';

// Get current user profile
export const getCurrentUserProfile = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/profiles/me');

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({ type: CLEAR_PROFILE });
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get all profiles
export const getAllProfiles = () => async (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });
  try {
    const res = await axios.get('/api/profiles');

    dispatch({
      type: GET_PROFILES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({ type: CLEAR_PROFILE });
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get profile by userId
export const getProfileById = (userId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profiles/user/${userId}`);

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({ type: CLEAR_PROFILE });
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Create or update a profile
export const createUpdateProfile =
  (formData, navigate, userId, edit = false) =>
  async (dispatch) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const res = await axios.post('/api/profiles/' + userId, formData, config);

      dispatch({
        type: edit === false ? GET_PROFILE : UPDATE_PROFILE,
        payload: res.data,
      });

      const language = localStorage.esdLanguage || 'en';
      const alertMessage = edit
        ? profileTranslations.profilUpdated[language]
        : profileTranslations.profilCreated[language];
      dispatch(setAlert(alertMessage, 'success'));

      if (!edit) {
        navigate('/home');
      }
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, 'error')));
      }

      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };

// Add Experience
export const addExperience =
  (formData, navigate, userId) => async (dispatch) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const res = await axios.put(
        '/api/profiles/experience/' + userId,
        formData,
        config
      );

      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data,
      });

      const language = localStorage.esdLanguage || 'en';
      dispatch(
        setAlert(
          profileTranslations.experienceAdded[language],
          'success',
          3000,
          true,
          true
        )
      );

      navigate('/my-profile');
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, 'error')));
      }

      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };

// Add Education
export const addEducation =
  (formData, navigate, userId) => async (dispatch) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const res = await axios.put(
        '/api/profiles/education/' + userId,
        formData,
        config
      );

      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data,
      });

      const language = localStorage.esdLanguage || 'en';
      dispatch(
        setAlert(
          profileTranslations.educationAdded[language],
          'success',
          3000,
          true,
          true
        )
      );

      navigate('/my-profile');
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, 'error')));
      }

      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };

// Delete experience
export const deleteExperience = (expId, userId) => async (dispatch) => {
  try {
    const res = await axios.delete(
      `/api/profiles/experience/${userId}/${expId}`
    );

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    const language = localStorage.esdLanguage || 'en';
    dispatch(
      setAlert(profileTranslations.experienceRemoved[language], 'success')
    );
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete education
export const deleteEducation = (expId, userId) => async (dispatch) => {
  try {
    const res = await axios.delete(
      `/api/profiles/education/${userId}/${expId}`
    );

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    const language = localStorage.esdLanguage || 'en';
    dispatch(
      setAlert(profileTranslations.educationRemoved[language], 'success')
    );
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete account & profile
export const deleteAccount =
  (userId, ownUserAccount = true, navigate = null) =>
  async (dispatch) => {
    try {
      await axios.delete(`/api/profiles/${userId}`);

      const language = localStorage.esdLanguage || 'en';
      if (ownUserAccount) {
        dispatch({
          type: CLEAR_PROFILE,
        });
        dispatch({
          type: ACCOUNT_DELETED,
        });

        dispatch(
          setAlert(
            profileTranslations.yourAccountWasDeleted[language],
            'error',
            6000,
            true,
            true
          )
        );
        return;
      }
      dispatch(
        setAlert(
          profileTranslations.userAccountWasDeleted[language],
          'error',
          6000,
          true,
          true
        )
      );
      navigate('/admin/profiles');
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };

// Get Github repos
export const getGithubRepos = (githubUsername) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profiles/github/${githubUsername}`);

    dispatch({
      type: GET_REPOS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({ type: GITHUB_ERROR });
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
