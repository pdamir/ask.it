let express = require("express");
let router = express.Router();
const userService = require("../services/user.service");
const checkToken = require("../helpers/checkToken").validateToken;

router.get("/", async (req, res, next) => {
  try {
    let users = await userService.get();
    return res.json({ users });
  } catch (err) {
    next(err);
  }
});

router.get("/stats/most-answers", async (req, res, next) => {
  try {
    let hotUsers = await userService.getMostAnswers();
    return res.json({ hotUsers });
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    let user = await userService.getById(req.params.id);
    return res.json({ user });
  } catch (err) {
    next(err);
  }
});

router.put("/", checkToken(), async (req, res, next) => {
  try {
    let user = await userService.update(req.user, req.body);
    return res.json({ user });
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    let data = await userService.create(req.body);
    return res.json({ user: data.userData });
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", checkToken(), async (req, res, next) => {
  try {
    let data = await userService.deleteById(req.user, req.params.id);
    return res.json({ user: data.userData });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
