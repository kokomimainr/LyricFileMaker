const cookiesConfig = require("../configs/cookiesConfig");
const userService = require("../services/userService");
const generateTokens = require("../utils/generateToken");
const axios = require('axios');

async function checkEmailExistence(req, res) {
  const { email } = req.body;
  if (!email) {
    return res
      .status(400)
      .json({ exists: false, message: 'Email is required' });
  }

  try {
    const apiKey = 'e8ced4041df8fa076999afb5f93bb01c73715781'; //* этот apiKey
    const response = await axios.get(
      `https://api.hunter.io/v2/email-verifier?email=${email}&api_key=${apiKey}`
    );

    const { data } = response;

    if (data.data && data.data.result === 'undeliverable') {
      return res.status(200).json({ exists: false });
    }

    return res.status(200).json({
      exists: data.data.result === 'deliverable',
      message: data.data.status,
    });
  } catch (error) {
    console.error('Error checking email:', error);
    return res
      .status(500)
      .json({ exists: false, message: 'Internal Server Error' });
  }
}

async function signUp(req, res) {
  const { username, email, password } = req.body;
  if (!(username && email && password)) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const { user } = await userService.signUp(username, email, password);
    const { accessToken, refreshToken } = generateTokens({ user });
    res
      .cookie("refreshToken", refreshToken, cookiesConfig.refresh)
      .json({ user, accessToken });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
}

async function signIn(req, res) {
  const { email, password } = req.body;

  if (!(email && password)) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const { user } = await userService.signIn(email, password);
    const { accessToken, refreshToken } = generateTokens({ user });

    res
      .cookie("refreshToken", refreshToken, cookiesConfig.refresh)
      .json({ user, accessToken });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
}

async function logout(req, res) {
  try {
    res.clearCookie("refreshToken").sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(400);
  }
}

async function requestPasswordReset(req, res) {
  try {
    const { email } = req.body;

    await userService.requestPasswordReset(email);
    res
      .status(200)
      .json({ message: "Ссылка для сброса пароля отправлена на email" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function resetPassword(req, res) {
  try {
    const { token, newPassword } = req.body;
    await userService.resetPassword(token, newPassword);
    res.status(200).json({ message: "Пароль успешно сброшен" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function updateUser(req, res) {
  try {
    const { username, email } = req.body;
    
    const id = res.locals.user.id;

    let avatarPath = "";

    if (req.file) {
      avatarPath = req.file.filename;
    }

    const user = await userService.updateUser({
      id,
      username,
      email,
      avatar: `${avatarPath}`,
    });

    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }

    delete user.password;
    // Генерация токенов после успешного обновления
    const { accessToken, refreshToken } = generateTokens({ user });

    // Удаляем старый refreshToken и устанавливаем новый
    res
      .clearCookie("refreshToken")
      .status(200)
      .cookie("refreshToken", refreshToken, cookiesConfig.refresh)
      .json({ user, accessToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      data: null,
      message: error.message || "An error occurred while updating the user.",
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
  updateUser,
};
