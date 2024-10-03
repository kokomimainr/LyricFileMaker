const {
  getTimeCodes,
  createTimeCode,
} = require("../controllers/timeCodeController");

const router = require("express").Router();

router.route("/").get(getTimeCodes).post(createTimeCode);

module.exports = router;
