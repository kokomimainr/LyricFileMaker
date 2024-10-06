const { User } = require('../../db/models');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken'); 

class UserService {
  async signUp(username, email, password) {
    const [user, isCreated] = await User.findOrCreate({
      where: { email },
      defaults: { username, email, password: await bcrypt.hash(password, 10) },
    });

    if (!isCreated) {
      throw new Error('User already exists');
    }

    const plainUser = user.get();
    delete plainUser.password;

    return { user: plainUser };
  }

  async signIn(email, password) {
    const user = await User.findOne({ where: { email } });
    if (!user) throw new Error('User not found');

    const isCorrectPassword = await bcrypt.compare(password, user.password);
    if (!isCorrectPassword) throw new Error('Incorrect email or password');

    const plainUser = user.get();
    delete plainUser.password;

    return { user: plainUser };
  }


  async requestPasswordReset(email) {

   
    const user = await User.findOne({ where: { email } });
    if (!user) throw new Error('User not found');

    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
    
    const resetLink = `http://localhost:5173/reset-password/${token}`; 
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
       from: '"👻" <shifrina19anna@mail.ru>',
        to: email,
        subject: 'Сброс пароля LFM',
        html: `<h1>Здравствуйте, ${user.username}!</h1>

<p>Мы получили запрос на сброс пароля для вашей учетной записи на <a href="http://localhost:5173/">Lyric File Maker</a>.<br/>
<br/>

Чтобы установить новый пароль, пожалуйста, перейдите по следующей ссылке:<br/>

<a href="${resetLink}">Ссылка на сброс пароля</a><br/><br/>

Эта ссылка действительна в течение 24 часов. Если вы не запрашивали сброс пароля, просто проигнорируйте это письмо.<br/>

Если у вас есть какие-либо вопросы, не стесняйтесь обращаться в нашу службу поддержки.<br/><br/>

С уважением,  <br/>
Команда LFM</p>`,
    });
}
  async resetPassword(token, newPassword) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findOne({ where: { email: decoded.email } });
      if (!user) throw new Error('User not found');

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await user.update({ password: hashedPassword });
    } catch (error) {
      throw new Error('Invalid or expired token');
    }
  }
}

module.exports = new UserService();
