/* eslint-disable import/no-named-as-default-member */
import axios from 'axios';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import authActions from '../redux/actions/auth/index';
import { toastSuccess, toastError } from './toastService';

const apiUrl = '/api';

// Call to login API
export const login = ({ username, password }) => {
  return dispatch => {
    dispatch(showLoading());
    return axios
      .post(`${apiUrl}/login`, { username, password })
      .then(response => {
        dispatch(hideLoading());
        toastSuccess('Login successful!');
        dispatch(authActions.loginSuccess(response.data));
      })
      .catch(error => {
        dispatch(hideLoading());
        toastError(error);
        dispatch(authActions.loginFailure(error));
      });
  };
};

// Call to register API
export const register = ({ username, password, email, dateOfBirth, fullName }) => {
  return dispatch => {
    dispatch(showLoading());
    return axios
      .post(`${apiUrl}/register`, { username, password, email, dateOfBirth, fullName })
      .then(response => {
        dispatch(hideLoading());
        toastSuccess('Registration successful!');
        dispatch(authActions.registerSuccess(response.data));
      })
      .catch(error => {
        dispatch(hideLoading());
        toastError(error);
        dispatch(authActions.registerFailure(error));
      });
  };
};
