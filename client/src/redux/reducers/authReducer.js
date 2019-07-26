import {
  AUTH_LOGIN_FAILURE,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGOUT,
  AUTH_REGISTER_FAILURE,
  AUTH_REGISTER_SUCCESS
} from '../actions/auth/types';

const initialState = { user: null, token: null, errors: null };

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case AUTH_LOGIN_SUCCESS:
    case AUTH_REGISTER_SUCCESS:
      return { ...state, ...action.payload, errors: {} };
    case AUTH_LOGIN_FAILURE:
    case AUTH_REGISTER_FAILURE:
      return { ...state, ...action.payload };
    case AUTH_LOGOUT:
      return initialState;
    default:
      return state;
  }
}
