const {
  getTimeCode,
  createTimeCode,
  updateTimeCode,
} = require("../controllers/timeCodeController");

const router = require("express").Router();

router.route("/").post(createTimeCode);

router.route("/:stringId").get(getTimeCode).put(updateTimeCode);

module.exports = router;
