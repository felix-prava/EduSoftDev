import {
  GET_USER_SOLUTIONS,
  GET_SOLUTION,
  SOLUTION_ERROR,
} from '../actions/types';

const initialState = {
  solution: null,
  solutions: [],
  loading: true,
  error: {},
};

export default function SolutionReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_USER_SOLUTIONS:
      return {
        ...state,
        solutions: payload,
        loading: false,
        error: {},
      };
    case GET_SOLUTION:
      return {
        ...state,
        solution: payload,
        loading: false,
        error: {},
      };
    case SOLUTION_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
