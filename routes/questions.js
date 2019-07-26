let express = require("express");
let router = express.Router();
const questionService = require("../services/question.service");
const feedbackService = require("../services/user-feedback.service");
const checkToken = require("../helpers/checkToken").validateToken;
require("dotenv").config();

router.get("/", checkToken(true), async (req, res, next) => {
  let userId = req.user
    ? req.user.id
    : req.header("x-forwarded-for") || req.connection.remoteAddress;
  try {
    let questions = await questionService.get(req.query.page, userId);
    return res.json({ questions });
  } catch (err) {
    next(err);
  }
});

router.get("/stats/hot", checkToken(true), async (req, res, next) => {
  let userId = req.user
    ? req.user.id
    : req.header("x-forwarded-for") || req.connection.remoteAddress;
  try {
    let questions = await questionService.getHottest(userId);
    return res.json({ questions });
  } catch (err) {
    next(err);
  }
});

router.get("/:id", checkToken(true), async (req, res, next) => {
  let userId = req.user
    ? req.user.id
    : req.header("x-forwarded-for") || req.connection.remoteAddress;

  try {
    let question = await questionService.getById(userId, req.params.id);
    return res.json({ question });
  } catch (err) {
    next(err);
  }
});

router.post("/", checkToken(), async (req, res, next) => {
  try {
    let data = await questionService.create(req.user.id, req.body);
    return res.json({ question: data });
  } catch (err) {
    next(err);
  }
});

router.put("/:id/:type", checkToken(true), async (req, res, next) => {
  let userId = req.user
    ? req.user.id
    : req.header("x-forwarded-for") || req.connection.remoteAddress;

  try {
    let feedback = await feedbackService.giveFeedback(
      true,
      userId,
      req.params.id,
      req.params.type
    );
    return res.json({ feedback });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
