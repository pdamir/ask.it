const { User } = require("../models/index");
const response = require("../helpers/response");
const cryptoHelper = require("../helpers/crypto");
const validator = require("../helpers/data-validator");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const get = async () => {
  return await User.query()
    .omit(["password"])
    .then(
      response.throwIf(r => !r, 404, "not_found"),
      response.throwError(500, "database_error")
    );
};

const getMostAnswers = async () => {
  return await User.query()
    .select([
      "*",
      User.relatedQuery("answers")
        .count()
        .as("answersCount")
    ])
    .omit(["password"])
    .orderBy("answersCount", "desc")
    .limit(5)
    .then(
      response.throwIf(r => !r, 404, "not_found"),
      response.throwError(500, "database_error")
    );
};

const getById = async id => {
  if (!id) {
    return response.throwError(500, "missing_id")();
  }

  return await User.query()
    .omit(["password"])
    .findById(id)
    .then(
      response.throwIf(r => !r, 404, "not_found"),
      response.throwError(500, "database_error")
    );
};

const create = async data => {
  const validatedData = validator.isValidUser(data);
  if (!validatedData.valid) {
    response.throwError(400, "validation_error", validatedData.errors)();
  }

  await User.query()
    .findOne({ username: data.username })
    .then(
      response.throwIf(r => r, 400, "user_already_exists"),
      response.throwError(500, "database_error")
    );

  data.password = await cryptoHelper.hashString(data.password);

  if (!data.dateOfBirth) {
    data.dateOfBirth = null;
  }

  const createdUser = await User.query()
    .insertGraphAndFetch(data)
    .then(
      throwIf(r => !r, 404, "not_created"),
      throwError(500, "database_error")
    );

  let userData = createdUser.toJSON();
  const token = jwt.sign(userData, process.env.SERVER_KEY, {
    expiresIn: process.env.TOKEN_LIFE
  });
  return { userData, token };
};

const update = async (authenticatedUser, data) => {
  if (authenticatedUser.id !== data.id) {
    response.throwError(403, "forbidden")();
  }

  const validatedData = validator.isValidUserOnUpdate(data);
  if (!validatedData.valid) {
    response.throwError(400, "validation_error", validatedData.errors)();
  }

  const user = await User.query()
    .findById(data.id)
    .then(
      response.throwIf(r => !r, 400, "not_found"),
      response.throwError(500, "database_error")
    );

  const updatedData = {
    email: data.email,
    dateOfBirth: data.dateOfBirth,
    fullName: data.fullName
  };

  if (data.newPassword) {
    const passwordMatched = await cryptoHelper.compareHash(
      data.password,
      user.password
    );

    if (!passwordMatched) {
      response.throwError(401, "wrong_password")();
    }

    data.password = await cryptoHelper.hashString(data.newPassword);
    updatedData.password = data.password;
  }

  return await User.query()
    .omit(["password"])
    .updateAndFetchById(data.id, updatedData)
    .then(
      throwIf(r => !r, 404, "not_updated"),
      throwError(500, "database_error")
    );
};

const deleteById = async (authenticatedUser, id) => {
  if (authenticatedUser.id !== data.id) {
    response.throwError(403, "forbidden")();
  }

  return await User.query().deleteById(id);
};

module.exports = { get, getById, update, create, deleteById, getMostAnswers };
