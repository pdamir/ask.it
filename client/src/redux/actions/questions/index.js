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
} from './types';

export const getSuccess = data => {
  return {
    type: QUESTIONS_GET_SUCCESS,
    payload: {
      questions: data.questions
    }
  };
};

export const getFailure = data => {
  return {
    type: QUESTIONS_GET_FAILURE,
    payload: {
      errors: data.response.data
    }
  };
};

export const getHotSuccess = data => {
  return {
    type: QUESTIONS_GET_HOT_SUCCESS,
    payload: {
      hotQuestions: data.questions
    }
  };
};

export const getHotFailure = data => {
  return {
    type: QUESTIONS_GET_HOT_FAILURE,
    payload: {
      errors: data.response.data
    }
  };
};

export const getSingleSuccess = data => {
  return {
    type: QUESTIONS_GET_SINGLE_SUCCESS,
    payload: {
      question: data.question
    }
  };
};

export const getSingleFailure = data => {
  return {
    type: QUESTIONS_GET_SINGLE_FAILURE,
    payload: {
      errors: data.response.data
    }
  };
};

export const createSuccess = data => {
  return {
    type: QUESTIONS_CREATE_SUCCESS,
    payload: {
      question: data.question
    }
  };
};

export const createFailure = data => {
  return {
    type: QUESTIONS_CREATE_FAILURE,
    payload: {
      errors: data.response.data
    }
  };
};

export const feedbackSuccess = data => {
  return {
    type: QUESTIONS_FEEDBACK_SUCCESS,
    payload: {
      feedback: data.feedback
    }
  };
};

export const feedbackFailure = data => {
  return {
    type: QUESTIONS_FEEDBACK_FAILURE,
    payload: {
      errors: data.response.data
    }
  };
};

export default {
  getSuccess,
  getFailure,
  getHotSuccess,
  getHotFailure,
  getSingleSuccess,
  getSingleFailure,
  createSuccess,
  createFailure,
  feedbackSuccess,
  feedbackFailure
};
