import axios from 'axios';
import { setAlert } from './alert';
import { GET_PROBLEM, GET_MODULE_PROBLEMS, LEARNING_ERROR } from './types';

// Get problems, quizzes and lessons by module
export const getAllMaterials = (moduleName) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/learning-materials/${moduleName}`);

    dispatch({
      type: GET_MODULE_PROBLEMS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: LEARNING_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add learning material
export const addLearningMaterial =
  (formData, materialType) => async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      await axios.post(
        `/api/learning-materials/add-${materialType}`,
        formData,
        config
      );
      materialType =
        materialType.charAt(0).toUpperCase() + materialType.slice(1);
      // TODO redirect user
      dispatch(setAlert(`${materialType} Created`, 'success'));
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, 'error')));
      }
    }
  };

// Get profile by userId
/* export const getProfileById = (userId) => async (dispatch) => {
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
}; */
