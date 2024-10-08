const router = require('express').Router();
const { verifyRefreshToken } = require('../middleware/verifyToken');
const generateTokens = require('../utils/generateToken');
const cookiesConfig = require('../configs/cookiesConfig');

router.get('/refresh', verifyRefreshToken, (req, res) => {
  const { accessToken, refreshToken } = generateTokens({
    user: res.locals.user,
  });

  return res
  .cookie('refreshToken', refreshToken, cookiesConfig.refresh)
  .status(200)
  .json({
     user: res.locals.user, accessToken ,
    message: 'Token refreshed successfully',
  });
});

module.exports = router;
