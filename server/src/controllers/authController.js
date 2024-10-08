const cookiesConfig = require('../configs/cookiesConfig');
const userService = require('../services/userService');
const generateTokens = require('../utils/generateToken');
const emailExistence = require('email-existence');

async function checkEmailExistence(req, res) {
  const { email } = req.body;
  if (!email) {
    return res
      .status(400)
      .json({ exists: false, message: 'Email is required' });
  }

  emailExistence.check(email, (error, result) => {
    if (error) {
      console.error(error);
      return res
        .status(500)
        .json({ exists: false, message: 'Internal Server Error' });
    }
    return res.status(200).json({ exists: result });
  });
}

async function signUp(req, res) {
  const { username, email, password } = req.body;
  if (!(username && email && password)) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const { user } = await userService.signUp(username, email, password);
    const { accessToken, refreshToken } = generateTokens({ user });
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

async function updateUser(req, res) {
  const { id } = req.params;
  const { username, email } = req.body;

  if (!username || !email) {
    return res.status(400).json({
      data: null,
      message: 'Username and email are required.',
    });
  }

  try {
    // Обновляем пользователя
    const updatedUser = await userService.updateUser(+id, username, email);
    
    if (updatedUser) {
      // Генерация токенов после успешного обновления
      const { accessToken, refreshToken } = generateTokens({ user: updatedUser });

      // Удаляем старый refreshToken и устанавливаем новый
      res.clearCookie('refreshToken')
        .status(200)
        .cookie('refreshToken', refreshToken, cookiesConfig.refresh)
        .json({ user: updatedUser, accessToken });
    } else {
      res.status(404).json({
        data: null,
        message: 'User not found',
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      data: null,
      message: error.message || 'An error occurred while updating the user.',
    });
  }
}
module.exports = {
  signUp,
  signIn,
  logout,
  requestPasswordReset,
  resetPassword,
  checkEmailExistence,
  updateUser
};
