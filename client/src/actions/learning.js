import axios from 'axios';
import { setAlert } from './alert';
import { loadUser } from './auth';
import { learningTranslations } from './translations';
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

function setAlertMessage(materialType, action) {
  const language = localStorage.esdLanguage || 'en';
  materialType = materialType.charAt(0).toUpperCase() + materialType.slice(1);
  if (action === 'created') {
    if (materialType === 'Problem')
      return learningTranslations.problemCreated[language];
    if (materialType === 'Lesson')
      return learningTranslations.lessonCreated[language];
    if (materialType === 'Quiz')
      return learningTranslations.quizCreated[language];
  } else if (action === 'updated') {
    if (materialType === 'Problem')
      return learningTranslations.problemUpdated[language];
    if (materialType === 'Lesson')
      return learningTranslations.lessonUpdated[language];
    if (materialType === 'Quiz')
      return learningTranslations.quizUpdated[language];
  } else if (action === 'deleted') {
    if (materialType === 'Problem')
      return learningTranslations.problemDeleted[language];
    if (materialType === 'Lesson')
      return learningTranslations.lessonDeleted[language];
    if (materialType === 'Quiz')
      return learningTranslations.quizDeleted[language];
  }
}

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

// Get problem, quiz or lessons by id
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

      navigate(`/modules/${moduleName}`);
      dispatch(
        setAlert(
          setAlertMessage(materialType, 'created'),
          'success',
          5500,
          true
        )
      );
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

      dispatch({
        type: UPDATE_LEARNING_MATERIAL,
        payload: res.data,
      });

      dispatch(
        setAlert(
          setAlertMessage(materialType, 'updated'),
          'success',
          5500,
          true
        )
      );
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

      dispatch(
        setAlert(
          setAlertMessage(materialType, 'deleted'),
          'success',
          4500,
          true
        )
      );
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

    const language = localStorage.esdLanguage || 'en';
    dispatch(
      setAlert(
        learningTranslations.exampleAdded[language],
        'success',
        2000,
        false
      )
    );
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

    const language = localStorage.esdLanguage || 'en';
    dispatch(
      setAlert(learningTranslations.testAdded[language], 'success', 2000, false)
    );
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

    const language = localStorage.esdLanguage || 'en';
    dispatch(
      setAlert(learningTranslations.hintAdded[language], 'success', 2000, false)
    );
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

    const language = localStorage.esdLanguage || 'en';
    dispatch(
      setAlert(
        learningTranslations.answerAdded[language],
        'success',
        2000,
        false
      )
    );
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

    const language = localStorage.esdLanguage || 'en';
    dispatch(
      setAlert(
        learningTranslations.testDeleted[language],
        'success',
        2000,
        false
      )
    );
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

    const language = localStorage.esdLanguage || 'en';
    dispatch(
      setAlert(
        learningTranslations.exampleDeleted[language],
        'success',
        2000,
        false
      )
    );
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

    const language = localStorage.esdLanguage || 'en';
    dispatch(
      setAlert(
        learningTranslations.hintDeleted[language],
        'success',
        2000,
        false
      )
    );
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

      const language = localStorage.esdLanguage || 'en';
      dispatch(
        setAlert(
          learningTranslations.answerDeleted[language],
          'success',
          2000,
          false
        )
      );
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, 'error')));
      }
    }
  };

// User completes a lesson
export const completeLesson = (lessonId) => async (dispatch) => {
  try {
    await axios.post(
      `/api/learning-materials/lessons/${lessonId}/lesson-learned`
    );

    const language = localStorage.esdLanguage || 'en';
    dispatch(
      setAlert(
        learningTranslations.lessonLearned[language],
        'success',
        3000,
        true
      )
    );
    dispatch(loadUser());
    // MAYBE update solvingUsers for this lesson
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'error')));
    }
  }
};

// User solves a quiz
export const solveQuiz = (quizId, answers) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    await axios.post(
      `/api/learning-materials/quizzes/${quizId}/quiz-solved`,
      answers,
      config
    );

    const language = localStorage.esdLanguage || 'en';
    dispatch(
      setAlert(
        learningTranslations.quizCompleted[language],
        'success',
        3000,
        true
      )
    );
    dispatch(loadUser());
    // TODO MAYBE update solvingUsers for this quiz
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'error')));
    }
  }
};

// User solves a problem
export const solveProblem = (problemId, solution) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    await axios.post(
      `/api/solutions/${problemId}/add-solution`,
      { code: solution },
      config
    );

    const language = localStorage.esdLanguage || 'en';
    dispatch(
      setAlert(
        learningTranslations.solutionAdded[language],
        'success',
        3000,
        true
      )
    );
    dispatch(loadUser());
    // TODO MAYBE update solvingUsers for this problem
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'error')));
    }
  }
};
