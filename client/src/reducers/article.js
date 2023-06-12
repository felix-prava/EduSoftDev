import {
  GET_ARTICLES,
  GET_ARTICLE,
  ARTICLE_ERROR,
  UPDATE_LIKES,
  UPDATE_DISLIKES,
  DELETE_ARTICLE,
  ADD_ARTICLE,
  UPDATE_ARTICLE,
  ADD_ARTICLE_COMMENT,
  REMOVE_ARTICLE_COMMENT,
} from '../actions/types';

const initialState = {
  article: null,
  articles: [],
  loading: true,
  error: {},
};

export default function ArticleReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_ARTICLES:
      return {
        ...state,
        articles: payload,
        loading: false,
        error: {},
      };
    case GET_ARTICLE:
      return {
        ...state,
        article: payload,
        loading: false,
        error: {},
      };
    case ADD_ARTICLE:
      return {
        ...state,
        articles: [payload, ...state.articles],
        loading: false,
        error: {},
      };
    case UPDATE_ARTICLE:
      return {
        ...state,
        article: payload,
        loading: false,
        error: {},
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
      let returnedArticle = state.article;
      if (payload.singleArticle) {
        returnedArticle = {
          ...state.article,
          likes: payload.likes,
          dislikes: payload.dislikes,
        };
      }
      return {
        ...state,
        articles: state.articles.map((article) =>
          article._id === payload.articleId
            ? { ...article, likes: payload.likes, dislikes: payload.dislikes }
            : article
        ),
        article: returnedArticle,
        loading: false,
        error: {},
      };
    case ADD_ARTICLE_COMMENT:
      return {
        ...state,
        article: { ...state.article, comments: payload },
        loading: false,
        error: {},
      };
    case REMOVE_ARTICLE_COMMENT:
      return {
        ...state,
        article: {
          ...state.article,
          comments: state.article.comments.filter(
            (comment) => comment._id !== payload
          ),
        },
        loading: false,
        error: {},
      };
    case DELETE_ARTICLE:
      return {
        ...state,
        articles: state.articles.filter((article) => article._id !== payload),
        loading: false,
        error: {},
      };
    default:
      return state;
  }
}
