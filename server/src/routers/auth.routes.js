const router = require('express').Router();
const { signUp, signIn, logout, requestPasswordReset, resetPassword, checkEmailExistence } = require('../controllers/authController');

router.post('/signup', signUp);
router.post('/signin', signIn);
router.get('/logout', logout);
router.post('/request-reset-password', requestPasswordReset);
router.post('/reset-password', resetPassword);
router.post('/check-email', checkEmailExistence);

module.exports = router;
