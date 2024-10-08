const {
  getAllLyricFiles,
  getLyricFilesByUserId,
  getLyricFile,
  createLyricFile,
  updateLyricFile,
  deleteLyricFile,
} = require("../controllers/lyricFileController");
const {verifyAccessToken} = require("../middleware/verifyToken");
const upload = require("../utils/upload");
const router = require("express").Router();

router
  .route("/")
  .get(verifyAccessToken, getAllLyricFiles)
  .post(verifyAccessToken,upload.single('cover'), createLyricFile)

router
  .route("/:lyricFileId")
  .get(getLyricFile)
  .put(verifyAccessToken, updateLyricFile)
  .delete(verifyAccessToken, deleteLyricFile);

module.exports = router;
