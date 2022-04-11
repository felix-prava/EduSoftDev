import axios from 'axios';
import { setAlert } from './alert';
import { REGISTER_SUCCESS, REGISTER_FAIL } from './types';

export const registerUser =
  ({ firstName, lastName, preferredName, username, email, password }) =>
  async (dispatch) => {
    const config = {
      Headers: {
        Host: 'http://localhost:3000',
        Origin: 'http://localhost:5000/api/users',

        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        Accept: 'application/json',
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
      const a = await axios.get('/api/articles', body, config);
      console.log(a);
      const res = await axios.post('/api/users', {}, config);

      console.log(res);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
      //const errors = err.res.data.errors;
      //if (errors) {
      //errors.forEach((error) => dispatch(setAlert(error.msg, 'error')));
      //}
      //dispatch({
      //type: REGISTER_FAIL,
      //});
    }
  };
