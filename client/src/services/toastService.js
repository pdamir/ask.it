/* eslint-disable import/no-named-as-default-member */
import { toast } from 'react-toastify';

const getMessageFromType = type => {
  switch (type) {
    case 'validation_error':
      return 'Invalid data';
    case 'forbidden':
    case 'unauthorized':
      return 'Unauthorized action';
    case 'not_created':
      return 'Resource could not be created';
    case 'wrong_password':
      return 'Current and new password do not match';
    case 'not_updated':
      return 'Resource could not be updated';
    case 'user_already_exists':
      return 'User with the same username already exists';
    case 'missing_id':
    case 'not_found':
    case 'database_error':
    default:
      return 'Unknown error';
  }
};

const getLabelFromField = {
  id: 'ID',
  password: 'Password',
  text: 'Text',
  userId: 'User ID',
  questionId: 'Question ID',
  fullName: 'Full name',
  email: 'Email',
  username: 'Username'
};

export const toastSuccess = message => {
  toast(message, {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 2000,
    className: 'toast-success'
  });
};

export const toastError = error => {
  if (error && error.response && error.response.data && error.response.data.message) {
    if (!error.response.data.errors || error.response.data.errors === {}) {
      toast(getMessageFromType(error.response.data.message), {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 4000,
        className: 'toast-error'
      });
    } else {
      const values = Object.values(error.response.data.errors);
      const initialMessage = getMessageFromType(error.response.data.message);
      values.forEach(errList => {
        errList.forEach(err => {
          const field = getLabelFromField[err.field];
          let details = '';
          if (field) {
            details = `${getLabelFromField[err.field]} is ${err.message}`;
          } else {
            details = 'Error';
          }

          toast(`${initialMessage} - ${details}`, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 4000,
            className: 'toast-error'
          });
        });
      });
    }
  }
};
