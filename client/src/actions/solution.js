import axios from 'axios';
import { GET_USER_SOLUTIONS, GET_SOLUTION, SOLUTION_ERROR } from './types';

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

// Get solution by id
export const getSolution = (solutionId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/solutions/${solutionId}`);

    dispatch({
      type: GET_SOLUTION,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: SOLUTION_ERROR,
      payload: { msg: err.response.data.msg, status: err.response.status },
    });
  }
};
