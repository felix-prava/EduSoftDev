import {
  GET_PROFILE,
  GET_PROFILES,
  GET_REPOS,
  UPDATE_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  GITHUB_ERROR,
} from '../actions/types';

const initialState = {
  profile: null,
  profiles: [],
  repos: [],
  loading: true,
  error: {},
};

export default function ProfileReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE:
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false,
        error: {},
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles: payload,
        loading: false,
        error: {},
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        repos: [],
        loading: false,
        error: {},
      };
    case GET_REPOS:
      return {
        ...state,
        repos: payload,
        loading: false,
        error: {},
      };
    case GITHUB_ERROR:
      return {
        ...state,
        repos: [],
        loading: false,
      };
    default:
      return state;
  }
}
