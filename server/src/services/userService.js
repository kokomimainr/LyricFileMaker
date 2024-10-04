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
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    
    
    
    await transporter.sendMail({
        to: email,
        subject: 'Сброс пароля',
        html: `<p>Для сброса пароля перейдите по следующей ссылке: <a href="${resetLink}">Сбросить пароль</a></p>`,
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
