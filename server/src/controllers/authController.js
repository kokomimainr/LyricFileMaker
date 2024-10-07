const cookiesConfig = require('../configs/cookiesConfig');
const userService = require('../services/userService');
const generateTokens = require('../utils/generateToken');

async function signUp(req, res) {
  const { username, email, password } = req.body;

  if (!(username && email && password)) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const { user } = await userService.signUp(username, email, password);
    const { accessToken, refreshToken } = generateTokens({ user });
      console.log(accessToken, refreshToken);
    res
      .cookie('refreshToken', refreshToken, cookiesConfig.refresh)
      .json({ user, accessToken });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
}

async function signIn(req, res) {
  const { email, password } = req.body;

  if (!(email && password)) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const { user } = await userService.signIn(email, password);
    const { accessToken, refreshToken } = generateTokens({ user });

    res
      .cookie('refreshToken', refreshToken, cookiesConfig.refresh)
      .json({ user, accessToken });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
}

async function logout(req, res) {
  try {
    res.clearCookie('refreshToken').sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(400);
  }
}

async function requestPasswordReset(req, res) {
  try {
    const { email } = req.body;
    
    await userService.requestPasswordReset(email);
    res.status(200).json({ message: 'Ссылка для сброса пароля отправлена на email' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function resetPassword(req, res) {
  try {
    const { token, newPassword } = req.body;
    await userService.resetPassword(token, newPassword);
    res.status(200).json({ message: 'Пароль успешно сброшен' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

module.exports = {
  signUp,
  signIn,
  logout,
  requestPasswordReset,
  resetPassword
};
