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
} from './types';

export const getSuccess = data => {
  return {
    type: ANSWERS_GET_SUCCESS,
    payload: {
      answers: data.answers
    }
  };
};

export const getFailure = data => {
  return {
    type: ANSWERS_GET_FAILURE,
    payload: {
      errors: data.response.data
    }
  };
};

export const deleteSuccess = data => {
  return {
    type: ANSWERS_DELETE_SUCCESS,
    payload: {
      answer: data.answer
    }
  };
};

export const deleteFailure = data => {
  return {
    type: ANSWERS_DELETE_FAILURE,
    payload: {
      errors: data.response.data
    }
  };
};

export const getSingleSuccess = data => {
  return {
    type: ANSWERS_GET_SINGLE_SUCCESS,
    payload: {
      answer: data.answer
    }
  };
};

export const getSingleFailure = data => {
  return {
    type: ANSWERS_GET_SINGLE_FAILURE,
    payload: {
      errors: data.response.data
    }
  };
};

export const createSuccess = data => {
  return {
    type: ANSWERS_CREATE_SUCCESS,
    payload: {
      answer: data.answer
    }
  };
};

export const createFailure = data => {
  return {
    type: ANSWERS_CREATE_FAILURE,
    payload: {
      errors: data.response.data
    }
  };
};

export const feedbackSuccess = data => {
  return {
    type: ANSWERS_FEEDBACK_SUCCESS,
    payload: {
      feedback: data.feedback
    }
  };
};

export const feedbackFailure = data => {
  return {
    type: ANSWERS_FEEDBACK_FAILURE,
    payload: {
      errors: data.response.data
    }
  };
};

export default {
  getSuccess,
  getFailure,
  deleteSuccess,
  deleteFailure,
  getSingleSuccess,
  getSingleFailure,
  createSuccess,
  createFailure,
  feedbackSuccess,
  feedbackFailure
};
