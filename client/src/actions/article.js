import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_ARTICLES,
  ARTICLE_ERROR,
  UPDATE_LIKES,
  UPDATE_DISLIKES,
  DELETE_ARTICLE,
  ADD_ARTICLE,
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

// Like an article
export const addLike = (articleId) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/articles/like/${articleId}`);
    dispatch({
      type: UPDATE_LIKES,
      payload: {
        articleId,
        likes: res.data.likes,
        dislikes: res.data.dislikes,
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
export const addDislike = (articleId) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/articles/dislike/${articleId}`);

    dispatch({
      type: UPDATE_DISLIKES,
      payload: {
        articleId,
        likes: res.data.likes,
        dislikes: res.data.dislikes,
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
export const deleteArticle = (articleId) => async (dispatch) => {
  try {
    await axios.delete(`/api/articles/${articleId}`);

    dispatch({
      type: DELETE_ARTICLE,
      payload: articleId,
    });
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
