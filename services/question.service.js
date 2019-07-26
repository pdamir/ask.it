const { Question, Answer, UserFeedback } = require("../models/index");
const response = require("../helpers/response");
const validator = require("../helpers/data-validator");
const { raw } = require("objection");
require("dotenv").config();

const get = async (page, userId) => {
  let queryParams = {
    page,
    pageSize: 20,
    orderBy: "createdAt",
    order: "desc"
  };

  let query = Question.query()
    .eager("[user]")
    .select([
      "*",
      Question.relatedQuery("user_feedback")
        .count()
        .where("type", 0)
        .as("likesCount"),
      Question.relatedQuery("user_feedback")
        .count()
        .where("type", 1)
        .as("dislikesCount"),
      Question.relatedQuery("answers")
        .count()
        .as("answersCount")
    ]);

  let hasLiked = Question.relatedQuery("user_feedback").count();

  let hasDisliked = Question.relatedQuery("user_feedback").count();

  if (validator.isValidIPAddress(userId)) {
    query = query.select([
      hasLiked
        .where("ipAddress", userId)
        .andWhere("type", 0)
        .as("hasLiked"),
      hasDisliked
        .where("ipAddress", userId)
        .andWhere("type", 1)
        .as("hasDisliked")
    ]);
  } else {
    query = query.select([
      hasLiked
        .where("userId", userId)
        .andWhere("type", 0)
        .as("hasLiked"),
      hasDisliked
        .where("userId", userId)
        .andWhere("type", 1)
        .as("hasDisliked")
    ]);
  }

  query = query
    .page(queryParams.page, queryParams.pageSize)
    .orderBy(queryParams.orderBy, queryParams.order);

  const questions = await query.then(
    response.throwIf(r => !r, 404, "not_found"),
    response.throwError(500, "database_error")
  );

  questions.page = +page;
  questions.totalPages = questions.total ? Math.ceil(questions.total / 20) : 0;

  return questions;
};

const getHottest = async userId => {
  let query = Question.query()
    .eager("[user]")
    .select([
      "*",
      Question.relatedQuery("user_feedback")
        .count()
        .where("type", 0)
        .as("likesCount"),
      Question.relatedQuery("user_feedback")
        .count()
        .where("type", 1)
        .as("dislikesCount"),
      Question.relatedQuery("answers")
        .count()
        .as("answersCount")
    ]);

  if (validator.isValidIPAddress(userId)) {
    query = query.select([
      Question.relatedQuery("user_feedback")
        .count()
        .where("ipAddress", userId)
        .andWhere("type", 0)
        .as("hasLiked"),
      Question.relatedQuery("user_feedback")
        .count()
        .where("ipAddress", userId)
        .andWhere("type", 1)
        .as("hasDisliked")
    ]);
  } else {
    query = query.select([
      Question.relatedQuery("user_feedback")
        .count()
        .where("userId", userId)
        .andWhere("type", 0)
        .as("hasLiked"),
      Question.relatedQuery("user_feedback")
        .count()
        .where("userId", userId)
        .andWhere("type", 1)
        .as("hasDisliked")
    ]);
  }

  return await query
    .orderBy("likesCount", "desc")
    .limit(5)
    .then(
      response.throwIf(r => !r, 404, "not_found"),
      response.throwError(500, "database_error")
    );
};

const getById = async (userId, id) => {
  if (!id) {
    return response.throwError(400, "missing_id")();
  }

  let question = Question.query()
    .eager("[user]")
    .select([
      "*",
      Question.relatedQuery("user_feedback")
        .count()
        .where("type", 0)
        .as("likesCount"),
      Question.relatedQuery("user_feedback")
        .count()
        .where("type", 1)
        .as("dislikesCount")
    ]);

  let questionFeedbackLiked = Question.relatedQuery("user_feedback").count();
  let questionFeedbackDisliked = Question.relatedQuery("user_feedback").count();

  if (validator.isValidIPAddress(userId)) {
    questionFeedbackLiked = questionFeedbackLiked.where("ipAddress", userId);
    questionFeedbackDisliked = questionFeedbackDisliked.where(
      "ipAddress",
      userId
    );
  } else {
    questionFeedbackLiked = questionFeedbackLiked.where("userId", userId);
    questionFeedbackDisliked = questionFeedbackDisliked.where("userId", userId);
  }

  question = question.select([
    questionFeedbackLiked.andWhere("type", 0).as("hasLiked"),
    questionFeedbackDisliked.andWhere("type", 1).as("hasDisliked")
  ]);

  return await question
    .findById(id)
    .then(
      response.throwIf(r => !r, 404, "not_found"),
      response.throwError(500, "database_error")
    );
};

const create = async (userId, data) => {
  const validatedData = validator.isValidQuestion(data);
  if (!validatedData.valid) {
    response.throwError(400, "validation_error", validatedData.errors)();
  }

  data.userId = userId;

  return await Question.query()
    .eager("[user]")
    .insertGraphAndFetch(data)
    .then(
      throwIf(r => !r, 404, "not_created"),
      throwError(500, "database_error")
    );
};

module.exports = { get, getById, create, getHottest };
