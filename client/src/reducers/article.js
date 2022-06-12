import { GET_ARTICLES, ARTICLE_ERROR } from '../actions/types';

const initialState = {
  article: null,
  articles: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_ARTICLES:
      return {
        ...state,
        articles: payload,
        loading: false,
      };
    case ARTICLE_ERROR:
      return {
        ...state,
        article: null,
        articles: [],
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
