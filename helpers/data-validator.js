const response = require("./response");

let $this = this;
// 8 characters or more, at least 1 number
const regPass = new RegExp(
  "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d!$%@#£€*?&]{8,}$"
);
const regMail = new RegExp(
  "^[a-zA-Z0-9!#$%&'*+/=?^_'{|}~-]+(?:.[a-zA-Z0-9!#$%&'*+/=?^_'{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])$"
);
const regIPAddress = new RegExp(
  "^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$"
);
$this.errors = [];

const checkErrors = () => {
  let result = response.validationErrors($this.errors);
  $this.errors = result.errors;

  return { valid: !result.count, errors: $this.errors };
};

// User and login related checks

const checkUsernameAndPassword = (data, isForUpdate = false) => {
  if (!data.username) {
    $this.errors.push({ field: "username", message: "invalid" });
  }

  if (!isForUpdate && (!data.password || !regPass.test(data.password))) {
    $this.errors.push({ field: "password", message: "invalid" });
  }

  if (isForUpdate && (data.newPassword && !regPass.test(data.newPassword))) {
    $this.errors.push({ field: "password", message: "invalid" });
  }
};

const checkEmailAndName = data => {
  if (data.email && !regMail.test(data.email)) {
    $this.errors.push({ field: "email", message: "invalid" });
  }

  if (data.fullName && data.fullName.match(/\d+/g)) {
    // fullName contains a number
    $this.errors.push({ field: "fullName", message: "invalid" });
  }
};

const isValidLogin = data => {
  $this.errors = [];

  checkUsernameAndPassword(data);

  return checkErrors();
};

const isValidUser = data => {
  $this.errors = [];

  checkUsernameAndPassword(data);

  checkEmailAndName(data);

  return checkErrors();
};

const isValidUserOnUpdate = data => {
  $this.errors = [];
  if (!data.id) {
    $this.errors.push({ field: "id", message: "required" });
  }

  if (!data.password && data.newPassword) {
    $this.errors.push({ field: "password", message: "required" });
  }

  checkUsernameAndPassword(data, true);
  checkEmailAndName(data);

  return checkErrors();
};

const isValidQuestion = data => {
  $this.errors = [];

  if (!data.text) {
    $this.errors.push({ field: "text", message: "required" });
  }

  return checkErrors();
};

const isValidAnswer = data => {
  $this.errors = [];

  if (!data.text) {
    $this.errors.push({ field: "text", message: "required" });
  }

  if (!data.userId) {
    $this.errors.push({ field: "userId", message: "required" });
  }

  if (!data.questionId) {
    $this.errors.push({ field: "questionId", message: "required" });
  }

  return checkErrors();
};

const isValidIPAddress = ipAddress => {
  if (
    regIPAddress.test(ipAddress) ||
    ["::1", "::ffff:127.0.0.1", "127.0.0.1"].includes(ipAddress)
  ) {
    return true;
  }
  return false;
};

module.exports = {
  isValidUser,
  isValidLogin,
  isValidUserOnUpdate,
  isValidQuestion,
  isValidAnswer,
  isValidIPAddress
};
