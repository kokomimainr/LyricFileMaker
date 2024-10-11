const router = require('express').Router();
const upload = require('../utils/upload')
const {verifyAccessToken} = require('../middleware/verifyToken')
const { signUp, signIn, logout, requestPasswordReset, resetPassword, checkEmailExistence, updateUser } = require('../controllers/authController');

router.post('/signup', signUp);
router.post('/signin', signIn);
router.get('/logout', logout);
router.post('/request-reset-password', requestPasswordReset);
router.post('/reset-password', resetPassword);
router.post('/check-email', checkEmailExistence);
router.put('/update', verifyAccessToken, upload.single('avatar'), updateUser)

module.exports = router;
