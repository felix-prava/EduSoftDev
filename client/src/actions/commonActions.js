import axios from 'axios';
import { commonActionsTranslations } from './translations';
import { setAlert } from './alert';
import {
  ADD_ARTICLE_COMMENT,
  ADD_LEARNING_MATERIAL_COMMENT,
  REMOVE_ARTICLE_COMMENT,
  REMOVE_LEARNING_MATERIAL_COMMENT,
} from './types';

// Add a comment to a post or to a learning material
export const addComment =
  (objectId, formData, resourceType) => async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    let reqEndpoint,
      actionType = null;
    if (resourceType === 'article') {
      reqEndpoint = `/api/articles/comment/${objectId}`;
      actionType = ADD_ARTICLE_COMMENT;
    }
    if (resourceType === 'learning material') {
      reqEndpoint = `/api/learning-materials/comment/${objectId}`;
      actionType = ADD_LEARNING_MATERIAL_COMMENT;
    }

    try {
      const res = await axios.post(reqEndpoint, formData, config);

      dispatch({
        type: actionType,
        payload: res.data,
      });

      const language = localStorage.esdLanguage || 'en';
      dispatch(
        setAlert(
          commonActionsTranslations.commentAdded[language],
          'success',
          3000,
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

// Remove comment
export const deleteComment =
  (objectId, commentId, resourceType) => async (dispatch) => {
    try {
      let reqEndpoint,
        actionType = null;
      if (resourceType === 'article') {
        reqEndpoint = `/api/articles/comment/${objectId}/${commentId}`;
        actionType = REMOVE_ARTICLE_COMMENT;
      }
      if (resourceType === 'learning material') {
        reqEndpoint = `/api/learning-materials/comment/${objectId}/${commentId}`;
        actionType = REMOVE_LEARNING_MATERIAL_COMMENT;
      }

      await axios.delete(reqEndpoint);
      dispatch({
        type: actionType,
        payload: commentId,
      });

      const language = localStorage.esdLanguage || 'en';
      dispatch(
        setAlert(
          commonActionsTranslations.commentDeleted[language],
          'success',
          3000,
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
