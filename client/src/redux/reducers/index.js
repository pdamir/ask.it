import { combineReducers } from 'redux';
import { loadingBarReducer } from 'react-redux-loading-bar';
import authReducer from './authReducer';
import questionsReducer from './questionsReducer';
import answersReducer from './answersReducer';
import usersReducer from './usersReducer';

export default combineReducers({
  auth: authReducer,
  questionData: questionsReducer,
  answerData: answersReducer,
  userData: usersReducer,
  loadingBar: loadingBarReducer
});
