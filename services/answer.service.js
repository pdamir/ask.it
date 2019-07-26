const { Answer, User } = require("../models/index");
const response = require("../helpers/response");
const cryptoHelper = require("../helpers/crypto");
const validator = require("../helpers/data-validator");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const get = async (queryParams, userId) => {
  if (!queryParams.questionId) {
    return response.throwError(400, "missing_id")();
  }

  queryParams = {
    ...queryParams,
    ...{ pageSize: 20, orderBy: "createdAt", order: "desc" }
  };

  let answers = Answer.query()
    .eager("[user]")
    .select([
      "*",
      Answer.relatedQuery("user_feedback")
        .count()
        .where("type", 0)
        .as("likesCount"),
      Answer.relatedQuery("user_feedback")
        .count()
        .where("type", 1)
        .as("dislikesCount")
    ]);

  let answerFeedbackLiked = Answer.relatedQuery("user_feedback").count();
  let answerFeedbackDisliked = Answer.relatedQuery("user_feedback").count();

  if (validator.isValidIPAddress(userId)) {
    answerFeedbackLiked = answerFeedbackLiked.where("ipAddress", userId);
    answerFeedbackDisliked = answerFeedbackDisliked.where("ipAddress", userId);
  } else {
    answerFeedbackLiked = answerFeedbackLiked.where("userId", userId);
    answerFeedbackDisliked = answerFeedbackDisliked.where("userId", userId);
  }

  answers = answers.select([
    answerFeedbackLiked.andWhere("type", 0).as("hasLiked"),
    answerFeedbackDisliked.andWhere("type", 1).as("hasDisliked")
  ]);

  answers = answers
    .page(queryParams.page, queryParams.pageSize)
    .orderBy(queryParams.orderBy, queryParams.order);

  if (queryParams.userId) {
    answers = answers.where("userId", queryParams.userId);
  }

  if (queryParams.questionId) {
    answers = answers.where("questionId", queryParams.questionId);
  }

  answers = await answers.then(
    response.throwIf(r => !r, 404, "not_found"),
    response.throwError(500, "database_error")
  );

  answers.page = +queryParams.page;
  answers.totalPages = answers.total ? Math.ceil(answers.total / 20) : 0;

  return answers;
};

const getById = async id => {
  if (!id) {
    return response.throwError(400, "missing_id")();
  }

  return await Answer.query()
    .eager("[question, user]")
    .omit(User, ["password"])
    .findById(id)
    .then(
      response.throwIf(r => !r, 404, "not_found"),
      response.throwError(500, "database_error")
    );
};

const create = async (userId, data) => {
  data.userId = userId;
  const validatedData = validator.isValidAnswer(data);
  if (!validatedData.valid) {
    response.throwError(400, "validation_error", validatedData.errors)();
  }

  data.userId = userId;

  return await Answer.query()
    .eager("[user]")
    .insertGraphAndFetch(data)
    .then(
      throwIf(r => !r, 404, "not_created"),
      throwError(500, "database_error")
    );
};

const deleteById = async (authenticatedUser, id) => {
  if (authenticatedUser.id !== data.id) {
    response.throwError(403, "forbidden")();
  }

  return await User.query().deleteById(id);
};

module.exports = { get, getById, create, deleteById };
