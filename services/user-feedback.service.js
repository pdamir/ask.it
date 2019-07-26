const { UserFeedback } = require("../models/index");
const response = require("../helpers/response");
const validator = require("../helpers/data-validator");
const { raw } = require("objection");
require("dotenv").config();

const giveFeedback = async (isQuestion, userId, id, type) => {
  let existingFeedback, data, feedbackResponse;

  data = {
    userId,
    id,
    type
  };

  feedbackResponse = {};
  let params = {};
  if (isQuestion) {
    params = { questionId: id };
  } else {
    params = { answerId: id };
  }

  if (validator.isValidIPAddress(userId)) {
    data.isIPAddress = true;
    existingFeedback = await UserFeedback.query().findOne({
      ipAddress: userId,
      ...params
    });
  } else {
    existingFeedback = await UserFeedback.query().findOne({
      userId,
      ...params
    });
  }

  if (!existingFeedback) {
    // create
    feedbackResponse.action = "created";
    feedbackResponse.feedback = await createFeedback(isQuestion, data);
  } else {
    if (+existingFeedback.type !== +type) {
      // update
      feedbackResponse.action = "updated";
      feedbackResponse.feedback = await updateFeedback(
        data,
        existingFeedback.id
      );
    } else {
      // delete
      await deleteFeedback(existingFeedback.id);
      feedbackResponse.action = "deleted";
      feedbackResponse.feedback = isQuestion
        ? { questionId: +id, type: +type }
        : { answerId: +id, type: +type };
    }
  }

  return feedbackResponse;
};

const createFeedback = async (isQuestion, payload) => {
  data = {
    type: payload.type,
    userId: payload.isIPAddress ? null : payload.userId,
    ipAddress: payload.isIPAddress ? payload.userId : null
  };

  params = {
    type: payload.type,
    userId: payload.isIPAddress ? null : payload.userId,
    ipAddress: payload.isIPAddress ? payload.userId : null
  };

  if (isQuestion) {
    params.questionId = payload.id;
  } else {
    params.answerId = payload.id;
  }

  return await UserFeedback.query()
    .insertGraphAndFetch(params)
    .then(
      response.throwIf(r => !r, 404, "not_created"),
      response.throwError(500, "database_error")
    );
};

const updateFeedback = async (payload, feedbackId) => {
  return await UserFeedback.query()
    .updateAndFetchById(feedbackId, {
      type: payload.type,
      userId: payload.isIPAddress ? null : payload.userId,
      ipAddress: payload.isIPAddress ? payload.userId : null,
      questionId: payload.id
    })
    .then(
      response.throwIf(r => !r, 404, "not_updated"),
      response.throwError(500, "database_error")
    );
};

const deleteFeedback = async feedbackId => {
  return await UserFeedback.query().deleteById(feedbackId);
};

module.exports = { giveFeedback };
