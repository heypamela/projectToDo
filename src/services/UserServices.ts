import bcrypt from 'bcrypt';
import { User } from '../models/toDoModels';

export class UserServices {
  async createUserService(name: string, email: string, password: string) {
    const hasUser = await User.findOne({ where: { email } });
    if (!hasUser) {
      const hash = bcrypt.hashSync(password, 10); // 10 é o salt - criptografia
      const newUser = await User.create({
        name,
        email,
        password: hash
      });
      return newUser;
    } else {
      return new Error('E-mail já existe!');
    }
  }

  async getEmail(email: string) {
    return await User.findOne({ where: { email } });
  }

  async matchPassword(passwordText: string, encrypted: string) {
    return bcrypt.compareSync(passwordText, encrypted);
  }
}