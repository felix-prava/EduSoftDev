import {
  GET_ARTICLES,
  ARTICLE_ERROR,
  UPDATE_LIKES,
  UPDATE_DISLIKES,
} from '../actions/types';

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
    case UPDATE_LIKES:
    case UPDATE_DISLIKES:
      return {
        ...state,
        articles: state.articles.map((article) =>
          article._id === payload.articleId
            ? { ...article, likes: payload.likes, dislikes: payload.dislikes }
            : article
        ),
      };
    default:
      return state;
  }
}
