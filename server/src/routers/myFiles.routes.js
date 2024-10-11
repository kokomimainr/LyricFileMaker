const { getLyricFilesByUserId } = require("../controllers/lyricFileController");
const { verifyAccessToken } = require("../middleware/verifyToken");


const router = require("express").Router();

router.route("/").get(verifyAccessToken, getLyricFilesByUserId);

module.exports = router;