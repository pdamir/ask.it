/* eslint-disable import/no-named-as-default-member */
import axios from 'axios';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import questionsActions from '../redux/actions/questions/index';
import { toastSuccess, toastError } from './toastService';

const apiUrl = '/api';

// Call to get questions API
export const get = data => {
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
      .get(`${apiUrl}/questions?page=${data.page}`, { headers })
      .then(response => {
        dispatch(hideLoading());
        dispatch(questionsActions.getSuccess(response.data));
      })
      .catch(error => {
        dispatch(hideLoading());
        toastError(error);
        dispatch(questionsActions.getFailure(error));
      });
  };
};

// Call to get hottest questions API
export const getHot = () => {
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
      .get(`${apiUrl}/questions/stats/hot`, headers)
      .then(response => {
        dispatch(hideLoading());
        dispatch(questionsActions.getHotSuccess(response.data));
      })
      .catch(error => {
        dispatch(hideLoading());
        toastError(error);
        dispatch(questionsActions.getHotFailure(error));
      });
  };
};

// Call to get single question API
export const getSingle = id => {
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
      .get(`${apiUrl}/questions/${id}`, headers)
      .then(response => {
        dispatch(hideLoading());
        dispatch(questionsActions.getSingleSuccess(response.data));
      })
      .catch(error => {
        dispatch(hideLoading());
        toastError(error);
        dispatch(questionsActions.getSingleFailure(error));
      });
  };
};

// Call to add/create single question API
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
      .post(`${apiUrl}/questions`, data, { headers })
      .then(response => {
        dispatch(hideLoading());
        toastSuccess('Question added!');
        dispatch(questionsActions.createSuccess(response.data));
      })
      .catch(error => {
        dispatch(hideLoading());
        toastError(error);
        dispatch(questionsActions.createFailure(error));
      });
  };
};

// Call to like/dislike single question API
export const feedback = (id, type) => {
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
      .put(`${apiUrl}/questions/${id}/${type}`, {}, { headers })
      .then(response => {
        dispatch(hideLoading());
        dispatch(questionsActions.feedbackSuccess(response.data));
      })
      .catch(error => {
        dispatch(hideLoading());
        dispatch(questionsActions.feedbackFailure(error));
      });
  };
};
