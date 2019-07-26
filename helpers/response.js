validationErrors = errors => {
  let res = {};
  res.errors = errors.reduce((e, a) => {
    e[a.field] = e[a.field] || [];
    e[a.field].push(a);
    return e;
  }, Object.create(null));

  res.count = Object.keys(res.errors).length;
  return res;
};

throwError = (code, errorType, errors) => error => {
  if (!error) error = new Error();
  error.code = code;
  error.message = errorType;
  error.errors = errors;
  throw error;
};

throwIf = (fn, code, errorType, errorMessage) => result => {
  if (fn(result)) {
    return throwError(code, errorType, errorMessage)();
  }
  return result;
};

module.exports = {
  throwError,
  throwIf,
  validationErrors
};
