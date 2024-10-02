const router = require('express').Router();
const authRouter = require('./auth.routes');
const tokenRouter = require('./token.routes');

router.use('/auth', authRouter);
router.use('/tokens', tokenRouter)

module.exports = router;
