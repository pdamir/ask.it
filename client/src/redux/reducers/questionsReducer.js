/* eslint-disable no-param-reassign */
/* eslint-disable no-case-declarations */
import {
  QUESTIONS_CREATE_FAILURE,
  QUESTIONS_CREATE_SUCCESS,
  QUESTIONS_FEEDBACK_FAILURE,
  QUESTIONS_FEEDBACK_SUCCESS,
  QUESTIONS_GET_FAILURE,
  QUESTIONS_GET_HOT_FAILURE,
  QUESTIONS_GET_HOT_SUCCESS,
  QUESTIONS_GET_SINGLE_FAILURE,
  QUESTIONS_GET_SINGLE_SUCCESS,
  QUESTIONS_GET_SUCCESS
} from '../actions/questions/types';

const initialState = {
  question: null,
  questions: null,
  feedback: null,
  errors: null,
  hotQuestions: []
};

function updateQuestionWithFeedback(originalState, payload) {
  const state = JSON.parse(JSON.stringify(originalState));
  switch (payload.action) {
    case 'updated':
      if (state.question && state.question.id === payload.feedback.questionId) {
        state.question.likesCount =
          payload.feedback.type === 0
            ? +state.question.likesCount + 1
            : +state.question.likesCount - 1;
        state.question.dislikesCount =
          payload.feedback.type === 0
            ? +state.question.dislikesCount - 1
            : +state.question.dislikesCount + 1;
        state.question.hasLiked = payload.feedback.type === 0 ? 1 : 0;
        state.question.hasDisliked = payload.feedback.type === 0 ? 0 : 1;
      }
      if (state.questions && state.questions.results.length) {
        const question = state.questions.results.find(q => q.id === payload.feedback.questionId);
        if (question) {
          question.likesCount =
            payload.feedback.type === 0 ? +question.likesCount + 1 : +question.likesCount - 1;
          question.dislikesCount =
            payload.feedback.type === 0 ? +question.dislikesCount - 1 : +question.dislikesCount + 1;

          question.hasLiked = payload.feedback.type === 0 ? 1 : 0;
          question.hasDisliked = payload.feedback.type === 0 ? 0 : 1;
        }
      }

      if (state.hotQuestions && state.hotQuestions.length) {
        const question = state.hotQuestions.find(q => q.id === payload.feedback.questionId);
        if (question) {
          question.likesCount =
            payload.feedback.type === 0 ? +question.likesCount + 1 : +question.likesCount - 1;
          question.dislikesCount =
            payload.feedback.type === 0 ? +question.dislikesCount - 1 : +question.dislikesCount + 1;

          question.hasLiked = payload.feedback.type === 0 ? 1 : 0;
          question.hasDisliked = payload.feedback.type === 0 ? 0 : 1;
        }
      }
      return state;
    case 'deleted':
      if (state.question && state.question.id === payload.feedback.questionId) {
        state.question.likesCount =
          payload.feedback.type === 0 ? +state.question.likesCount - 1 : state.question.likesCount;
        state.question.dislikesCount =
          payload.feedback.type === 1
            ? +state.question.dislikesCount - 1
            : state.question.dislikesCount;

        state.question.hasLiked = payload.feedback.type === 0 ? 0 : state.question.hasLiked;
        state.question.hasDisliked = payload.feedback.type === 1 ? 0 : state.question.hasDisliked;
      }
      if (state.questions && state.questions.results.length) {
        const question = state.questions.results.find(q => q.id === payload.feedback.questionId);
        if (question) {
          question.likesCount =
            payload.feedback.type === 0 ? +question.likesCount - 1 : question.likesCount;
          question.dislikesCount =
            payload.feedback.type === 1 ? +question.dislikesCount - 1 : question.dislikesCount;
          question.hasLiked = payload.feedback.type === 0 ? 0 : question.hasLiked;
          question.hasDisliked = payload.feedback.type === 1 ? 0 : question.hasDisliked;
        }
      }

      if (state.hotQuestions && state.hotQuestions.length) {
        const question = state.hotQuestions.find(q => q.id === payload.feedback.questionId);
        if (question) {
          question.likesCount =
            payload.feedback.type === 0 ? +question.likesCount - 1 : question.likesCount;
          question.dislikesCount =
            payload.feedback.type === 1 ? +question.dislikesCount - 1 : question.dislikesCount;
          question.hasLiked = payload.feedback.type === 0 ? 0 : question.hasLiked;
          question.hasDisliked = payload.feedback.type === 1 ? 0 : question.hasDisliked;
        }
      }
      return state;
    case 'created':
      if (state.question && state.question.id === payload.feedback.questionId) {
        state.question.likesCount =
          payload.feedback.type === 0 ? +state.question.likesCount + 1 : state.question.likesCount;
        state.question.dislikesCount =
          payload.feedback.type === 1
            ? +state.question.dislikesCount + 1
            : state.question.dislikesCount;

        state.question.hasLiked = payload.feedback.type === 0 ? 1 : state.question.hasLiked;
        state.question.hasDisliked = payload.feedback.type === 1 ? 1 : state.question.hasDisliked;
      }
      if (state.questions && state.questions.results.length) {
        const question = state.questions.results.find(q => q.id === payload.feedback.questionId);
        if (question) {
          question.likesCount =
            payload.feedback.type === 0 ? +question.likesCount + 1 : question.likesCount;
          question.dislikesCount =
            payload.feedback.type === 1 ? +question.dislikesCount + 1 : question.dislikesCount;

          question.hasLiked = payload.feedback.type === 0 ? 1 : question.hasLiked;
          question.hasDisliked = payload.feedback.type === 1 ? 1 : question.hasDisliked;
        }
      }

      if (state.hotQuestions && state.hotQuestions.length) {
        const question = state.hotQuestions.find(q => q.id === payload.feedback.questionId);
        if (question) {
          question.likesCount =
            payload.feedback.type === 0 ? +question.likesCount + 1 : question.likesCount;
          question.dislikesCount =
            payload.feedback.type === 1 ? +question.dislikesCount + 1 : question.dislikesCount;

          question.hasLiked = payload.feedback.type === 0 ? 1 : question.hasLiked;
          question.hasDisliked = payload.feedback.type === 1 ? 1 : question.hasDisliked;
        }
      }
      return state;
    default:
      return state;
  }
}

export default function questionsReducer(state = initialState, action) {
  switch (action.type) {
    case QUESTIONS_GET_SUCCESS: {
      const { payload } = action;
      if (payload.questions.page > 0) {
        payload.questions.results = [
          ...state.questions.results,
          ...action.payload.questions.results
        ];
      }

      return { ...state, ...payload, errors: {} };
    }

    case QUESTIONS_GET_HOT_SUCCESS:
    case QUESTIONS_GET_SINGLE_SUCCESS:
    case QUESTIONS_CREATE_SUCCESS:
      return { ...state, ...action.payload, errors: {} };

    case QUESTIONS_FEEDBACK_SUCCESS:
      state = updateQuestionWithFeedback(state, action.payload.feedback);
      return { ...state, ...action.payload, errors: {} };

    case QUESTIONS_GET_FAILURE:
    case QUESTIONS_GET_HOT_FAILURE:
    case QUESTIONS_GET_SINGLE_FAILURE:
    case QUESTIONS_CREATE_FAILURE:
    case QUESTIONS_FEEDBACK_FAILURE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
