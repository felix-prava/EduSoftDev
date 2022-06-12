import axios from 'axios';
import { setAlert } from './alert';
import { GET_ARTICLES, ARTICLE_ERROR } from './types';

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
