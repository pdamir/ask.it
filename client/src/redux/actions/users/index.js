import {
  USERS_CREATE_FAILURE,
  USERS_CREATE_SUCCESS,
  USERS_GET_FAILURE,
  USERS_DELETE_FAILURE,
  USERS_DELETE_SUCCESS,
  USERS_GET_SINGLE_FAILURE,
  USERS_GET_SINGLE_SUCCESS,
  USERS_GET_SUCCESS,
  USERS_UPDATE_SUCCESS,
  USERS_UPDATE_FAILURE,
  USERS_MOST_ANSWERS_SUCCESS,
  USERS_MOST_ANSWERS_FAILURE
} from './types';

export const getSuccess = data => {
  return {
    type: USERS_GET_SUCCESS,
    payload: {
      questions: data.questions
    }
  };
};

export const getFailure = data => {
  return {
    type: USERS_GET_FAILURE,
    payload: {
      errors: data.response.data
    }
  };
};

export const deleteSuccess = data => {
  return {
    type: USERS_DELETE_SUCCESS,
    payload: {
      hotQuestions: data.questions
    }
  };
};

export const deleteFailure = data => {
  return {
    type: USERS_DELETE_FAILURE,
    payload: {
      errors: data.response.data
    }
  };
};

export const getSingleSuccess = data => {
  return {
    type: USERS_GET_SINGLE_SUCCESS,
    payload: {
      user: data.user
    }
  };
};

export const getSingleFailure = data => {
  return {
    type: USERS_GET_SINGLE_FAILURE,
    payload: {
      errors: data.response.data
    }
  };
};

export const createSuccess = data => {
  return {
    type: USERS_CREATE_SUCCESS,
    payload: {
      user: data.user
    }
  };
};

export const createFailure = data => {
  return {
    type: USERS_CREATE_FAILURE,
    payload: {
      errors: data.response.data
    }
  };
};

export const updateSuccess = data => {
  return {
    type: USERS_UPDATE_SUCCESS,
    payload: {
      user: data.user
    }
  };
};

export const updateFailure = data => {
  return {
    type: USERS_UPDATE_FAILURE,
    payload: {
      errors: data.response.data
    }
  };
};

export const getHotSuccess = data => {
  return {
    type: USERS_MOST_ANSWERS_SUCCESS,
    payload: {
      hotUsers: data.hotUsers
    }
  };
};

export const getHotFailure = data => {
  return {
    type: USERS_MOST_ANSWERS_FAILURE,
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
  getHotSuccess,
  getHotFailure,
  updateSuccess,
  updateFailure
};
