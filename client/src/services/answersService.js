/* eslint-disable import/no-named-as-default-member */
import axios from 'axios';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import answersActions from '../redux/actions/answers/index';
import { toastSuccess, toastError } from './toastService';

const apiUrl = '/api';

// Call to get answers API
export const get = data => {
  return (dispatch, getState) => {
    const state = getState();
    let headers = {};
    if (state.auth && state.auth.token) {
      headers = {
        Authorization: `Bearer ${state.auth.token}`
      };
    }

    dispatch(showLoading());
    return axios
      .get(`${apiUrl}/answers`, {
        params: {
          userId: data.userId ? data.userId : null,
          questionId: data.questionId ? data.questionId : null,
          page: data.page
        },
        headers
      })
      .then(response => {
        dispatch(hideLoading());
        dispatch(answersActions.getSuccess(response.data));
      })
      .catch(error => {
        dispatch(hideLoading());
        toastError(error);
        dispatch(answersActions.getFailure(error));
      });
  };
};

// Call to get single answer API (currently not used)
export const getSingle = id => {
  return dispatch => {
    dispatch(showLoading());
    return axios
      .get(`${apiUrl}/answers/${id}`)
      .then(response => {
        dispatch(hideLoading());
        dispatch(answersActions.getSingleSuccess(response.data));
      })
      .catch(error => {
        dispatch(hideLoading());
        toastError(error);
        dispatch(answersActions.getSingleFailure(error));
      });
  };
};

// Call to add/create single answer API
export const create = data => {
  return (dispatch, getState) => {
    dispatch(showLoading());
    const state = getState();
    let headers = {};
    if (state.auth && state.auth.token) {
      headers = {
        Authorization: `Bearer ${state.auth.token}`
      };
    }

    return axios
      .post(`${apiUrl}/answers`, data, { headers })
      .then(response => {
        dispatch(hideLoading());
        toastSuccess('Answer added!');
        dispatch(answersActions.createSuccess(response.data));
      })
      .catch(error => {
        dispatch(hideLoading());
        toastError(error);
        dispatch(answersActions.createFailure(error));
      });
  };
};

// Call to like/dislike single answer API
export const feedback = (id, type) => {
  return (dispatch, getState) => {
    const state = getState();
    let headers = {};
    if (state.auth && state.auth.token) {
      headers = {
        Authorization: `Bearer ${state.auth.token}`
      };
    }

    dispatch(showLoading());
    return axios
      .put(`${apiUrl}/answers/${id}/${type}`, {}, { headers })
      .then(response => {
        dispatch(hideLoading());
        dispatch(answersActions.feedbackSuccess(response.data));
      })
      .catch(error => {
        dispatch(hideLoading());
        dispatch(answersActions.feedbackFailure(error));
      });
  };
};

// Call to remove single answer API (currently not used)
export const remove = id => {
  return (dispatch, getState) => {
    dispatch(showLoading());
    const state = getState();
    const headers = {
      Authorization: `Bearer ${state.auth.token}`
    };

    return axios
      .delete(`${apiUrl}/answers/${id}`, { headers })
      .then(response => {
        dispatch(hideLoading());
        toastSuccess('Deleted successfully!');
        dispatch(answersActions.deleteSuccess(response.data));
      })
      .catch(error => {
        dispatch(hideLoading());
        toastError(error);
        dispatch(answersActions.deleteFailure(error));
      });
  };
};
