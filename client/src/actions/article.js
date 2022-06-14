import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_ARTICLES,
  ARTICLE_ERROR,
  UPDATE_LIKES,
  UPDATE_DISLIKES,
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
