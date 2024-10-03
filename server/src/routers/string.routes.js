const { getStrings, createString } = require("../controllers/stringController");

const router = require("express").Router();

router.route("/").get(getStrings).post(createString);

module.exports = router;
