const { getStrings, createString } = require("../controllers/stringController");

const router = require("express").Router();

router.route("/").post(createString);

router.route('/:lyricFileId').get(getStrings);

module.exports = router;
