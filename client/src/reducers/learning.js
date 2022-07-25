import {
  GET_MODULE_PROBLEMS,
  GET_PROBLEM,
  LEARNING_ERROR,
} from '../actions/types';

const initialState = {
  problem: null,
  problems: [],
  loading: true,
  error: {},
};

export default function LearningMaterialsReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_PROBLEM:
      return {
        ...state,
        problem: payload,
        loading: false,
      };
    case GET_MODULE_PROBLEMS:
      return {
        ...state,
        problems: payload,
        loading: false,
      };
    case LEARNING_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
