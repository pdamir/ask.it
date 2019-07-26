/* eslint-disable import/no-named-as-default-member */
import axios from 'axios';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import usersActions from '../redux/actions/users/index';
import { toastSuccess, toastError } from './toastService';

const apiUrl = '/api';

// Call to get users API (currently not used)
export const get = () => {
  return dispatch => {
    dispatch(showLoading());
    return axios
      .get(`${apiUrl}/users`)
      .then(response => {
        dispatch(hideLoading());
        dispatch(usersActions.getSuccess(response.data));
      })
      .catch(error => {
        dispatch(hideLoading());
        toastError(error);
        dispatch(usersActions.getFailure(error));
      });
  };
};

// Call to get users with most answers (hot users) API
export const getMostAnswers = () => {
  return dispatch => {
    dispatch(showLoading());
    return axios
      .get(`${apiUrl}/users/stats/most-answers`)
      .then(response => {
        dispatch(hideLoading());
        dispatch(usersActions.getHotSuccess(response.data));
      })
      .catch(error => {
        dispatch(hideLoading());
        toastError(error);
        dispatch(usersActions.getHotFailure(error));
      });
  };
};

// Call to get single user API
export const getSingle = id => {
  return dispatch => {
    dispatch(showLoading());
    return axios
      .get(`${apiUrl}/users/${id}`)
      .then(response => {
        dispatch(hideLoading());
        dispatch(usersActions.getSingleSuccess(response.data));
      })
      .catch(error => {
        dispatch(hideLoading());
        toastError(error);
        dispatch(usersActions.getSingleFailure(error));
      });
  };
};

// Call to create user API (currently not used)
export const create = data => {
  return dispatch => {
    dispatch(showLoading());
    return axios
      .post(`${apiUrl}/users`, data)
      .then(response => {
        dispatch(hideLoading());
        toastSuccess('User created!');
        dispatch(usersActions.createSuccess(response.data));
      })
      .catch(error => {
        dispatch(hideLoading());
        toastError(error);
        dispatch(usersActions.createFailure(error));
      });
  };
};

// Call to update user API
export const update = data => {
  return (dispatch, getState) => {
    dispatch(showLoading());
    const state = getState();
    const headers = {
      Authorization: `Bearer ${state.auth.token}`
    };

    return axios
      .put(`${apiUrl}/users`, data, { headers })
      .then(response => {
        dispatch(hideLoading());
        toastSuccess('Profile updated!');
        dispatch(usersActions.updateSuccess(response.data));
      })
      .catch(error => {
        dispatch(hideLoading());
        toastError(error);
        dispatch(usersActions.updateFailure(error));
      });
  };
};

// Call to remove/delete user API
export const remove = id => {
  return (dispatch, getState) => {
    dispatch(showLoading());
    const state = getState();
    const headers = {
      Authorization: `Bearer ${state.auth.token}`
    };

    return axios
      .delete(`${apiUrl}/users/${id}`, { headers })
      .then(response => {
        dispatch(hideLoading());
        toastSuccess('Profile deleted!');
        dispatch(usersActions.deleteSuccess(response.data));
      })
      .catch(error => {
        dispatch(hideLoading());
        toastError(error);
        dispatch(usersActions.deleteFailure(error));
      });
  };
};
