import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_LEARNING_MATERIAL,
  GET_MODULE_PROBLEMS,
  LEARNING_ERROR,
  DELETE_LEARNING_MATERIAL,
} from './types';

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
  (formData, materialType, moduleName, navigate) => async (dispatch) => {
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

      navigate(`/modules/${moduleName}`);
      dispatch(setAlert(`${materialType} Created`, 'success'));
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, 'error')));
      }
    }
  };

// Delete one learning material
export const deleteLearningMaterial =
  (learningMaterialId, materialType) => async (dispatch) => {
    try {
      await axios.delete(`/api/learning-materials/${learningMaterialId}`);

      dispatch({
        type: DELETE_LEARNING_MATERIAL,
        payload: learningMaterialId,
      });
      dispatch(setAlert(`${materialType} Deleted`, 'success', 2500, false));
    } catch (err) {
      dispatch({
        type: LEARNING_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
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
