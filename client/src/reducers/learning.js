import {
  GET_MODULE_PROBLEMS,
  GET_LEARNING_MATERIAL,
  UPDATE_LEARNING_MATERIAL,
  DELETE_LEARNING_MATERIAL,
  LEARNING_ERROR,
} from '../actions/types';

const initialState = {
  learningMaterial: null,
  problems: [],
  loading: true,
  error: {},
};

export default function LearningMaterialsReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_LEARNING_MATERIAL:
    case UPDATE_LEARNING_MATERIAL:
      return {
        ...state,
        learningMaterial: payload,
        loading: false,
      };
    case GET_MODULE_PROBLEMS:
      return {
        ...state,
        problems: payload,
        loading: false,
      };
    case DELETE_LEARNING_MATERIAL:
      return {
        ...state,
        problems: state.problems.filter(
          (learningMaterial) => learningMaterial._id !== payload
        ),
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
