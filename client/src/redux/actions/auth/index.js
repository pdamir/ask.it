import {
  AUTH_LOGIN_FAILURE,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGOUT,
  AUTH_REGISTER_FAILURE,
  AUTH_REGISTER_SUCCESS
} from './types';

export const loginSuccess = data => {
  return {
    type: AUTH_LOGIN_SUCCESS,
    payload: {
      user: data.user,
      token: data.token
    }
  };
};

export const loginFailure = data => {
  return {
    type: AUTH_LOGIN_FAILURE,
    payload: {
      errors: data.response.data
    }
  };
};

export const registerSuccess = data => {
  return {
    type: AUTH_REGISTER_SUCCESS,
    payload: {
      user: data.user,
      token: data.token
    }
  };
};

export const registerFailure = data => {
  return {
    type: AUTH_REGISTER_FAILURE,
    payload: {
      errors: data.response.data
    }
  };
};

export const logout = () => {
  return {
    type: AUTH_LOGOUT
  };
};

export default { loginSuccess, loginFailure, registerSuccess, registerFailure, logout };
