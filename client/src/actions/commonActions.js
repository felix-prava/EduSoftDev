import axios from 'axios';
import { ADD_COMMENT, REMOVE_COMMENT } from './types';
import { setAlert } from './alert';

// Add a comment to a post or to a learning material
export const addComment =
  (objectId, formData, resourceType) => async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    let reqEndpoint = null;
    if (resourceType === 'article')
      reqEndpoint = `/api/articles/comment/${objectId}`;
    if (resourceType === 'learning material')
      reqEndpoint = `/api/lm/comment/${objectId}`;

    try {
      const res = await axios.post(reqEndpoint, formData, config);

      dispatch({
        type: ADD_COMMENT,
        payload: res.data,
      });
      dispatch(setAlert('Comment Added', 'success', 3000, false));
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, 'error')));
      }
    }
  };

// Remove comment
export const deleteComment = (objectId, commentId) => async (dispatch) => {
  try {
    await axios.delete(`/api/articles/comment/${objectId}/${commentId}`);

    dispatch({
      type: REMOVE_COMMENT,
      payload: commentId,
    });
    dispatch(setAlert('Comment Deleted', 'success', 3000, false));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'error')));
    }
  }
};
