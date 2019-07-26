const { User } = require("../models/index");
const jwt = require("jsonwebtoken");
const userService = require("./user.service");
const response = require("../helpers/response");
const cryptoHelper = require("../helpers/crypto");
const validator = require("../helpers/data-validator");

require("dotenv").config();

const login = async data => {
  const validatedData = validator.isValidLogin(data);
  if (!validatedData.valid) {
    response.throwError(400, "validation_error", validatedData.errors)();
  }

  data.username = data.username.toLowerCase();

  const user = await User.query()
    .findOne({ username: data.username })
    .then(
      response.throwIf(r => !r, 404, "not_found"),
      response.throwError(500, "database_error")
    );

  if (user) {
    const passwordMatched = await cryptoHelper.compareHash(
      data.password,
      user.password
    );
    if (passwordMatched) {
      user.password = undefined;
      let userData = user.toJSON();
      const token = jwt.sign(userData, process.env.SERVER_KEY, {
        expiresIn: process.env.TOKEN_LIFE
      });
      return { userData, token };
    } else {
      response.throwError(401, "unauthorized")();
    }
  }
};

module.exports = { login };
