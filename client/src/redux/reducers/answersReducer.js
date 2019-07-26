/* eslint-disable no-param-reassign */
import {
  ANSWERS_CREATE_FAILURE,
  ANSWERS_CREATE_SUCCESS,
  ANSWERS_FEEDBACK_FAILURE,
  ANSWERS_FEEDBACK_SUCCESS,
  ANSWERS_GET_FAILURE,
  ANSWERS_DELETE_FAILURE,
  ANSWERS_DELETE_SUCCESS,
  ANSWERS_GET_SINGLE_FAILURE,
  ANSWERS_GET_SINGLE_SUCCESS,
  ANSWERS_GET_SUCCESS
} from '../actions/answers/types';

const initialState = { answer: null, answers: null, feedback: null, errors: null };

function updateAnswerWithFeedback(originalState, payload) {
  const state = JSON.parse(JSON.stringify(originalState));
  switch (payload.action) {
    case 'updated':
      if (state.answers && state.answers.results && state.answers.results.length) {
        const answer = state.answers.results.find(q => q.id === payload.feedback.answerId);
        if (answer) {
          answer.likesCount =
            payload.feedback.type === 0 ? +answer.likesCount + 1 : +answer.likesCount - 1;
          answer.dislikesCount =
            payload.feedback.type === 0 ? +answer.dislikesCount - 1 : +answer.dislikesCount + 1;

          answer.hasLiked = payload.feedback.type === 0 ? 1 : 0;
          answer.hasDisliked = payload.feedback.type === 0 ? 0 : 1;
        }
      }

      return state;
    case 'deleted':
      if (state.answers && state.answers.results && state.answers.results.length) {
        const answer = state.answers.results.find(q => q.id === payload.feedback.answerId);
        if (answer) {
          answer.likesCount =
            payload.feedback.type === 0 ? +answer.likesCount - 1 : answer.likesCount;
          answer.dislikesCount =
            payload.feedback.type === 1 ? +answer.dislikesCount - 1 : answer.dislikesCount;
          answer.hasLiked = payload.feedback.type === 0 ? 0 : answer.hasLiked;
          answer.hasDisliked = payload.feedback.type === 1 ? 0 : answer.hasDisliked;
        }
      }

      return state;
    case 'created':
      if (state.answers && state.answers.results && state.answers.results.length) {
        const answer = state.answers.results.find(q => q.id === payload.feedback.answerId);
        if (answer) {
          answer.likesCount =
            payload.feedback.type === 0 ? +answer.likesCount + 1 : answer.likesCount;
          answer.dislikesCount =
            payload.feedback.type === 1 ? +answer.dislikesCount + 1 : answer.dislikesCount;

          answer.hasLiked = payload.feedback.type === 0 ? 1 : answer.hasLiked;
          answer.hasDisliked = payload.feedback.type === 1 ? 1 : answer.hasDisliked;
        }
      }

      return state;
    default:
      return state;
  }
}

export default function answersReducer(state = initialState, action) {
  switch (action.type) {
    case ANSWERS_GET_SUCCESS: {
      const { payload } = action;
      if (payload.answers.page > 0) {
        payload.answers.results = [...state.answers.results, ...action.payload.answers.results];
      }

      return { ...state, ...payload, errors: {} };
    }

    case ANSWERS_DELETE_SUCCESS:
    case ANSWERS_GET_SINGLE_SUCCESS:
    case ANSWERS_CREATE_SUCCESS:
      return { ...state, ...action.payload, errors: {} };
    case ANSWERS_FEEDBACK_SUCCESS:
      state = updateAnswerWithFeedback(state, action.payload.feedback);
      return { ...state, ...action.payload, errors: {} };
    case ANSWERS_GET_FAILURE:
    case ANSWERS_DELETE_FAILURE:
    case ANSWERS_GET_SINGLE_FAILURE:
    case ANSWERS_CREATE_FAILURE:
    case ANSWERS_FEEDBACK_FAILURE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
