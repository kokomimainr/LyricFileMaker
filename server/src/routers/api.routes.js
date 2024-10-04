const router = require("express").Router();
const errorRouter = require("./error.routes");
const authRouter = require("./auth.routes");
const tokenRouter = require("./token.routes");
const timeCodeRouter = require("./timeCode.routes");
const stringRouter = require("./string.routes");
const lyricFileRouter = require("./lyricFile.routes");

router.use("/auth", authRouter);
router.use("/tokens", tokenRouter);
router.use("/time-codes", timeCodeRouter);
router.use("/strings", stringRouter);
router.use("/lyric-files", lyricFileRouter);

router.use("*", errorRouter);

module.exports = router;
