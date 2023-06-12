import {
  GET_MODULE_PROBLEMS,
  GET_LEARNING_MATERIAL,
  UPDATE_LEARNING_MATERIAL,
  DELETE_LEARNING_MATERIAL,
  ADD_TEST,
  ADD_EXAMPLE,
  ADD_HINT,
  ADD_ANSWER,
  ADD_LEARNING_MATERIAL_COMMENT,
  REMOVE_TEST,
  REMOVE_EXAMPLE,
  REMOVE_HINT,
  REMOVE_ANSWER,
  REMOVE_LEARNING_MATERIAL_COMMENT,
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
        error: {},
      };
    case GET_MODULE_PROBLEMS:
      return {
        ...state,
        learningMaterial: null,
        problems: payload,
        loading: false,
        error: {},
      };
    case DELETE_LEARNING_MATERIAL:
      return {
        ...state,
        problems: state.problems.filter(
          (learningMaterial) => learningMaterial._id !== payload
        ),
        loading: false,
        error: {},
      };
    case ADD_TEST:
      return {
        ...state,
        learningMaterial: {
          ...state.learningMaterial,
          tests: payload,
        },
        loading: false,
        error: {},
      };
    case ADD_EXAMPLE:
      return {
        ...state,
        learningMaterial: {
          ...state.learningMaterial,
          examples: payload,
        },
        loading: false,
        error: {},
      };
    case ADD_HINT:
      return {
        ...state,
        learningMaterial: {
          ...state.learningMaterial,
          hints: payload,
        },
        loading: false,
        error: {},
      };
    case ADD_ANSWER: {
      let wrongAnswers = state.learningMaterial.wrongAnswers;
      let rightAnswers = state.learningMaterial.rightAnswers;
      if (payload.answerType === 'wrongAnswer') {
        wrongAnswers = payload.answers;
      } else {
        rightAnswers = payload.answers;
      }
      return {
        ...state,
        learningMaterial: {
          ...state.learningMaterial,
          wrongAnswers: wrongAnswers,
          rightAnswers: rightAnswers,
        },
        loading: false,
        error: {},
      };
    }
    case ADD_LEARNING_MATERIAL_COMMENT:
      return {
        ...state,
        learningMaterial: { ...state.learningMaterial, comments: payload },
        loading: false,
        error: {},
      };
    case REMOVE_TEST:
      return {
        ...state,
        learningMaterial: {
          ...state.learningMaterial,
          tests: state.learningMaterial.tests.filter(
            (test) => test._id !== payload
          ),
        },
        loading: false,
        error: {},
      };
    case REMOVE_EXAMPLE:
      return {
        ...state,
        learningMaterial: {
          ...state.learningMaterial,
          examples: state.learningMaterial.examples.filter(
            (example) => example._id !== payload
          ),
        },
        loading: false,
        error: {},
      };
    case REMOVE_HINT:
      return {
        ...state,
        learningMaterial: {
          ...state.learningMaterial,
          hints: state.learningMaterial.hints.filter(
            (hint) => hint._id !== payload
          ),
        },
        loading: false,
        error: {},
      };
    case REMOVE_ANSWER: {
      let wrongAnswers = state.learningMaterial.wrongAnswers;
      let rightAnswers = state.learningMaterial.rightAnswers;
      if (payload.answerType === 'wrongAnswers') {
        wrongAnswers = state.learningMaterial.wrongAnswers.filter(
          (answer) => answer._id !== payload.answerId
        );
      } else {
        rightAnswers = state.learningMaterial.rightAnswers.filter(
          (answer) => answer._id !== payload.answerId
        );
      }
      return {
        ...state,
        learningMaterial: {
          ...state.learningMaterial,
          wrongAnswers: wrongAnswers,
          rightAnswers: rightAnswers,
        },
        loading: false,
        error: {},
      };
    }
    case REMOVE_LEARNING_MATERIAL_COMMENT:
      return {
        ...state,
        learningMaterial: {
          ...state.learningMaterial,
          comments: state.learningMaterial.comments.filter(
            (comment) => comment._id !== payload
          ),
        },
        loading: false,
        error: {},
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
