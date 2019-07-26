let express = require("express");
let router = express.Router();
const answerService = require("../services/answer.service");
const feedbackService = require("../services/user-feedback.service");
require("dotenv").config();
const checkToken = require("../helpers/checkToken").validateToken;

router.get("/", checkToken(true), async (req, res, next) => {
  let userId = req.user
    ? req.user.id
    : req.header("x-forwarded-for") || req.connection.remoteAddress;
  try {
    let answers = await answerService.get(req.query, userId);
    return res.json({ answers });
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    let answer = await answerService.getById(req.params.id);
    return res.json({ answer });
  } catch (err) {
    next(err);
  }
});

router.post("/", checkToken(), async (req, res, next) => {
  try {
    let answer = await answerService.create(req.user.id, req.body);
    return res.json({ answer });
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
      false,
      userId,
      req.params.id,
      req.params.type
    );
    return res.json({ feedback });
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", checkToken(), async (req, res, next) => {
  try {
    let answer = await answerService.deleteById(req.user, req.params.id);
    return res.json({ answer });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
