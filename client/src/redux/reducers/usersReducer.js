import {
  USERS_CREATE_FAILURE,
  USERS_CREATE_SUCCESS,
  USERS_GET_FAILURE,
  USERS_MOST_ANSWERS_SUCCESS,
  USERS_UPDATE_SUCCESS,
  USERS_UPDATE_FAILURE,
  USERS_DELETE_SUCCESS,
  USERS_DELETE_FAILURE,
  USERS_MOST_ANSWERS_FAILURE,
  USERS_GET_SINGLE_FAILURE,
  USERS_GET_SINGLE_SUCCESS,
  USERS_GET_SUCCESS
} from '../actions/users/types';

const initialState = { user: null, users: null, errors: null, hotUsers: [] };

export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    case USERS_GET_SUCCESS:
    case USERS_MOST_ANSWERS_SUCCESS:
    case USERS_GET_SINGLE_SUCCESS:
    case USERS_CREATE_SUCCESS:
    case USERS_UPDATE_SUCCESS:
    case USERS_DELETE_SUCCESS:
      return { ...state, ...action.payload, errors: {} };
    case USERS_GET_FAILURE:
    case USERS_MOST_ANSWERS_FAILURE:
    case USERS_GET_SINGLE_FAILURE:
    case USERS_CREATE_FAILURE:
    case USERS_UPDATE_FAILURE:
    case USERS_DELETE_FAILURE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
