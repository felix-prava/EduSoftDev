import axios from 'axios';
import { GET_USER_SOLUTIONS, SOLUTION_ERROR } from './types';

// Get user solutions
export const getUserSolutions = (userId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/solutions/users/${userId}`);

    dispatch({
      type: GET_USER_SOLUTIONS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: SOLUTION_ERROR,
      payload: { msg: err.response.data.msg, status: err.response.status },
    });
  }
};
