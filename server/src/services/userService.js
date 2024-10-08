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
        subject: 'Добро пожаловать на Lyric File Maker!',
        html: `<h1>Здравствуйте, ${user.username}!</h1>

<p> Спасибо за регистрацию на <a href="http://localhost:5173/">Lyric File Maker</a>! <br/><br/>

Мы рады приветствовать вас в нашем сообществе.<br/>

Теперь вы можете войти в свою учетную запись и воспользоваться всеми возможностями нашего сайта.<br/>

Если у вас возникли вопросы или нужна помощь, не стесняйтесь обращаться в нашу службу поддержки.<br/>
<br/>

С уважением,  <br/>
Команда LFM</p>`,
    });
    return { user: plainUser };
  }

  async signIn(email, password) {
    const user = await User.findOne({ where: { email } });
    if (!user) throw new Error('User not found');

    const isCorrectPassword = await bcrypt.compare(password, user.password);
    if (!isCorrectPassword) throw new Error('Incorrect email or password');

    const plainUser = user.get();
    delete plainUser.password;

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
        subject: 'Успешная авторизация на Lyric File Maker!',
        html: `<h1>Здравствуйте, ${user.username}!</h1>

<p> Вы успешно вошли в свою учетную запись на <a href="http://localhost:5173/">Lyric File Maker</a>. <br/> <br/> 

Теперь вы можете наслаждаться всеми функциями и возможностями, которые мы предлагаем. <br/> 

Если у вас возникли вопросы или вам нужна помощь, наша служба поддержки всегда готова помочь. <br/> 

Спасибо, что выбрали нас! <br/> 

<br/>

С уважением,  <br/>
Команда LFM</p>`,
    });
    return { user: plainUser };
  }

  async updateUser( {id, username, email, avatar}) {
    try {
      const user = await User.findOne({ where: { id } });
      
      if (user) {
        user.username = username;
        user.email = email;
        if ( avatar !== '') {
          user.avatar = avatar;
        }
 
        await user.save();
        return user;
      } else {
        return null; 
      }
    } catch (error) {
      console.error(error);
      throw new Error('Database error occurred while updating the user.');
    }
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
      console.log(jwt.verify());
      
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
