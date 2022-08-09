import axios from 'axios';
import { setAlert } from './alert';
import { loadUser } from './auth';
import {
  GET_MODULE_PROBLEMS,
  GET_LEARNING_MATERIAL,
  UPDATE_LEARNING_MATERIAL,
  DELETE_LEARNING_MATERIAL,
  ADD_TEST,
  ADD_EXAMPLE,
  ADD_HINT,
  ADD_ANSWER,
  REMOVE_TEST,
  REMOVE_EXAMPLE,
  REMOVE_HINT,
  REMOVE_ANSWER,
  LEARNING_ERROR,
} from './types';

// Get problems, quizzes and lessons by module
export const getAllMaterials = (moduleName) => async (dispatch) => {
  try {
    const res = await axios.get(
      `/api/learning-materials/modules/${moduleName}`
    );

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

// Get problems, quizzes and lessons by module
export const getLearningMaterial = (learningMaterialId) => async (dispatch) => {
  try {
    const res = await axios.get(
      `/api/learning-materials/${learningMaterialId}`
    );

    dispatch({
      type: GET_LEARNING_MATERIAL,
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

// Update learning material
export const updateLearningMaterial =
  (formData, materialId, materialType) => async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    let route = 'problems';
    if (materialType === 'Lesson') {
      route = 'lessons';
    } else if (materialType === 'Quiz') {
      route = 'quizzes';
    }
    try {
      const res = await axios.put(
        `/api/learning-materials/${route}/${materialId}`,
        formData,
        config
      );
      materialType =
        materialType.charAt(0).toUpperCase() + materialType.slice(1);

      dispatch({
        type: UPDATE_LEARNING_MATERIAL,
        payload: res.data,
      });

      dispatch(setAlert(`${materialType} Updated`, 'success'));
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

// Add an example to a problem
export const addExample = (problemId, formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.post(
      `/api/learning-materials/problems/${problemId}/examples`,
      formData,
      config
    );

    dispatch({
      type: ADD_EXAMPLE,
      payload: res.data,
    });
    dispatch(setAlert('Example Added', 'success', 2000, false));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'error')));
    }
  }
};

// Add a test to a problem
export const addTest = (problemId, formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.post(
      `/api/learning-materials/problems/${problemId}/tests`,
      formData,
      config
    );

    dispatch({
      type: ADD_TEST,
      payload: res.data,
    });
    dispatch(setAlert('Test Added', 'success', 2000, false));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'error')));
    }
  }
};

// Add a hint to a problem
export const addHint = (problemId, formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.post(
      `/api/learning-materials/problems/${problemId}/hints`,
      formData,
      config
    );

    dispatch({
      type: ADD_HINT,
      payload: res.data,
    });
    dispatch(setAlert('Hint Added', 'success', 2000, false));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'error')));
    }
  }
};

// Add an answer to a quiz
export const addAnswer = (quizId, answerType, formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.post(
      `/api/learning-materials/quizzes/${quizId}/${answerType}`,
      formData,
      config
    );

    dispatch({
      type: ADD_ANSWER,
      payload: { answers: res.data, answerType },
    });
    dispatch(setAlert('Answer Added', 'success', 2000, false));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'error')));
    }
  }
};

// Delete test from a problem
export const deleteTest = (problemId, testId) => async (dispatch) => {
  try {
    await axios.delete(
      `/api/learning-materials/problems/${problemId}/tests/${testId}`
    );

    dispatch({
      type: REMOVE_TEST,
      payload: testId,
    });
    dispatch(setAlert('Test Deleted', 'success', 2000, false));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'error')));
    }
  }
};

// Delete example from a problem
export const deleteExample = (problemId, exampleId) => async (dispatch) => {
  try {
    await axios.delete(
      `/api/learning-materials/problems/${problemId}/examples/${exampleId}`
    );

    dispatch({
      type: REMOVE_EXAMPLE,
      payload: exampleId,
    });
    dispatch(setAlert('Example Deleted', 'success', 2000, false));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'error')));
    }
  }
};

// Delete hint from a problem
export const deleteHint = (problemId, hintId) => async (dispatch) => {
  try {
    await axios.delete(
      `/api/learning-materials/problems/${problemId}/hints/${hintId}`
    );

    dispatch({
      type: REMOVE_HINT,
      payload: hintId,
    });
    dispatch(setAlert('Hint Deleted', 'success', 2000, false));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'error')));
    }
  }
};

// Delete answer from a quiz
export const deleteAnswer =
  (quizId, answerType, answerId) => async (dispatch) => {
    try {
      await axios.delete(
        `/api/learning-materials/quizzes/${quizId}/${answerType}/${answerId}`
      );

      dispatch({
        type: REMOVE_ANSWER,
        payload: { answerType, answerId },
      });
      dispatch(setAlert('Answer Deleted', 'success', 2000, false));
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, 'error')));
      }
    }
  };

// User completed a lesson
export const completeLesson = (lessonId) => async (dispatch) => {
  try {
    await axios.post(
      `/api/learning-materials/lessons/${lessonId}/lesson-learned`
    );

    dispatch(setAlert('Lesson Learned', 'success', 3000, false));
    dispatch(loadUser());
    // MAYBE update solvingUsers for this lesson
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'error')));
    }
  }
};
