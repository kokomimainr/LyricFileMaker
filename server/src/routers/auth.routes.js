const router = require('express').Router();
const { signUp, signIn, logout, requestPasswordReset, resetPassword } = require('../controllers/authController');

router.post('/signup', signUp);
router.post('/signin', signIn);
router.get('/logout', logout);
router.post('/request-reset-password', requestPasswordReset);
router.post('/reset-password', resetPassword);

module.exports = router;
