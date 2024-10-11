const { User } = require("../../db/models");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

class UserService {
  async signUp(username, email, password) {
    try {

      const isCreated = await User.findOne({ where: { email } });
      if (isCreated) {
        throw new Error("Пользователь уже зарегистрирован");
      }

      if (email === process.env.EMAIL_USER) {
        await User.create({
          username,
          email,
          isAdmin: true,
          password: await bcrypt.hash(password, 10),
        });
      }
      const transporter = nodemailer.createTransport({
        host: "smtp.mail.ru",
        port: 465,
        secure: true,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      await transporter.sendMail({
        from: `"👻" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Добро пожаловать на Lyric File Maker!",
        html: `<div style="text-align: center;">
    <h1>Здравствуйте, ${username}!</h1>

<p> Спасибо за регистрацию на <a href=${process.env.CLIENT_URL}>Lyric File Maker</a>! <br/><br/>

Мы рады приветствовать вас в нашем сообществе.<br/>

Теперь вы можете войти в свою учетную запись и воспользоваться всеми возможностями нашего сайта.<br/>

Если у вас возникли вопросы или нужна помощь, не стесняйтесь обращаться в нашу службу поддержки.<br/>
<br/>

С уважением,  <br/>
Команда LFM</p></div>`,
      });

      const user = await User.create({
        username,
        email,
        password: await bcrypt.hash(password, 10),
      });

      const plainUser = user.get();
      delete plainUser.password;

      return { user: plainUser };
    } catch (error) {
      let err ;
      error.message === "Пользователь уже зарегистрирован" ? err = error.message : err = "Такой электронной почты не существует";
      throw new Error(err);
    }
  }

  async signIn(email, password) {
    const user = await User.findOne({ where: { email } });
    if (!user) throw new Error("User not found");

    const isCorrectPassword = await bcrypt.compare(password, user.password);
    if (!isCorrectPassword) throw new Error("Неверный адрес электронной почты или пароль");

    const plainUser = user.get();
    delete plainUser.password;

    return { user: plainUser };
  }

  async updateUser({ id, username, email, avatar }) {
    try {
      const user = await User.findOne({ where: { id } });

      if (user) {
        user.username = username;
        user.email = email;
        if (avatar !== "") {
          user.avatar = avatar;
        }

        await user.save();
        return user;
      } else {
        return null;
      }
    } catch (error) {
      console.error(error);
      throw new Error("При обновлении пользователя произошла ошибка базы данных.");
    }
  }

  async requestPasswordReset(email) {
    const user = await User.findOne({ where: { email } });
    if (!user) throw new Error("User not found");

    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const resetLink = `${process.env.CLIENT_URL}/reset-password/${token}`;

    // Настройка Nodemailer
    const transporter = nodemailer.createTransport({
      host: "smtp.mail.ru",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"👻" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Сброс пароля LFM",
      html: `<div style="text-align: center;">
      <h1>Здравствуйте, ${user.username}!</h1>

<p>Мы получили запрос на сброс пароля для вашей учетной записи на <a href=${process.env.CLIENT_URL}>Lyric File Maker</a>.<br/>
<br/>

Чтобы установить новый пароль, пожалуйста, перейдите по следующей ссылке:<br/>

<button style="border-radius: 5px; border: 1px solid #ccc; padding: 10px; background-color: #FE9FAD; font-size: 15px; margin: 20px 0px;">
  <a href="${resetLink}" style="text-decoration: none; color: #ffebeb; transition: 0.3s ease-in-out;">
    Сбросить пароль
  </a>
</button>
<br/><br/>

Эта ссылка действительна в течение 24 часов. Если вы не запрашивали сброс пароля, просто проигнорируйте это письмо.<br/>

Если у вас есть какие-либо вопросы, не стесняйтесь обращаться в нашу службу поддержки.<br/><br/>

С уважением,  <br/>
Команда LFM</p></div>`,
    });
  }
  async resetPassword(token, newPassword) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findOne({ where: { email: decoded.email } });
      if (!user) throw new Error("Пользователь не найден");

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await user.update({ password: hashedPassword });
    } catch (error) {
      throw new Error("Invalid or expired token");
    }
  }
}

module.exports = new UserService();
