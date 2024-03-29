import axios from 'axios';
import { setAlert } from './alert';
import setAuthToken from '../utils/setAuthToken';
import setLanguage from '../utils/setLanguage';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_PROFILE,
  USER_UPDATED,
} from './types';

// Load user info
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  if (localStorage.esdLanguage) {
    setLanguage(localStorage.esdLanguage);
  }

  try {
    const res = await axios.get('/api/auth');
    dispatch({ type: USER_LOADED, payload: res.data });
  } catch (err) {
    dispatch({ type: AUTH_ERROR });
  }
};

export const registerUser =
  ({ firstName, lastName, preferredName, username, email, password }) =>
  async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = JSON.stringify({
      firstName,
      lastName,
      preferredName,
      username,
      email,
      password,
    });

    try {
      const res = await axios.post('/api/users', body, config);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });

      dispatch(loadUser());
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, 'error')));
      }
      dispatch({
        type: REGISTER_FAIL,
      });
    }
  };

export const loginUser = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({
    email,
    password,
  });

  try {
    const res = await axios.post('/api/auth', body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'error')));
    }
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

export const logoutUser = () => (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });
  dispatch({ type: LOGOUT });
  // TODO navigate to '/'
};

export const updateUser =
  (
    {
      firstName,
      lastName,
      preferredName,
      birthdate,
      getNotifications,
      getNews,
      username,
      language,
      email,
      oldPassword,
      password,
      role,
      status,
      githubUsername,
    },
    userId,
    msg,
    dispatchUserUpdated = true
  ) =>
  async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = JSON.stringify({
      firstName,
      lastName,
      preferredName,
      birthdate,
      getNotifications,
      getNews,
      username,
      language,
      email,
      oldPassword,
      password,
      role,
      status,
      githubUsername,
    });

    try {
      const res = await axios.put('/api/users/' + userId, body, config);

      if (dispatchUserUpdated) {
        dispatch({
          type: USER_UPDATED,
          payload: res.data,
        });
      }

      dispatch(setAlert(msg, 'success'));
      return 0;
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, 'error')));
      }
    }
  };
