import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_ARTICLES,
  GET_ARTICLE,
  ARTICLE_ERROR,
  UPDATE_LIKES,
  UPDATE_DISLIKES,
  DELETE_ARTICLE,
  ADD_ARTICLE,
  UPDATE_ARTICLE,
  ADD_COMMENT,
  REMOVE_COMMENT,
} from './types';

// Get articles
export const getArticles = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/articles');

    dispatch({
      type: GET_ARTICLES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ARTICLE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get article
export const getArticle = (articleId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/articles/${articleId}`);

    dispatch({
      type: GET_ARTICLE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ARTICLE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Like an article
export const addLike =
  (articleId, singleArticle = false) =>
  async (dispatch) => {
    try {
      const res = await axios.put(`/api/articles/like/${articleId}`);
      dispatch({
        type: UPDATE_LIKES,
        payload: {
          articleId,
          likes: res.data.likes,
          dislikes: res.data.dislikes,
          singleArticle: singleArticle,
        },
      });
    } catch (err) {
      dispatch({
        type: ARTICLE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };

// Dislike an article
export const addDislike =
  (articleId, singleArticle = false) =>
  async (dispatch) => {
    try {
      const res = await axios.put(`/api/articles/dislike/${articleId}`);

      dispatch({
        type: UPDATE_DISLIKES,
        payload: {
          articleId,
          likes: res.data.likes,
          dislikes: res.data.dislikes,
          singleArticle: singleArticle,
        },
      });
    } catch (err) {
      dispatch({
        type: ARTICLE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };

// Delete an article
export const deleteArticle =
  (articleId, navigate, redirectUser = false) =>
  async (dispatch) => {
    try {
      await axios.delete(`/api/articles/${articleId}`);

      dispatch({
        type: DELETE_ARTICLE,
        payload: articleId,
      });
      if (redirectUser) {
        navigate('/articles');
      }
      dispatch(setAlert('Article Deleted', 'success'));
    } catch (err) {
      dispatch({
        type: ARTICLE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };

// Add an article
export const addArticle = (formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.post('/api/articles', formData, config);

    dispatch({
      type: ADD_ARTICLE,
      payload: res.data,
    });
    dispatch(setAlert('Article Created', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'error')));
    }
  }
};

// Update an article
export const updateArticle = (formData, articleId) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.put(`/api/articles/${articleId}`, formData, config);

    dispatch({
      type: UPDATE_ARTICLE,
      payload: res.data,
    });
    dispatch(setAlert('Article Updated', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'error')));
    }
  }
};

// Add a comment to a post
export const addComment = (articleId, formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.post(
      `/api/articles/comment/${articleId}`,
      formData,
      config
    );

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
export const deleteComment = (articleId, commentId) => async (dispatch) => {
  try {
    await axios.delete(`/api/articles/comment/${articleId}/${commentId}`);

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
