import bcrypt from 'bcrypt';
import { toDo, User } from '../models/toDoModels';

export class ToDoServices {
  async add(title: string, deadline: string, category: string, done: boolean) {
    const newTask = await toDo.findOne({ where: { title } });
    if (!newTask) {
      const newToDo = await toDo.create({
        title,
        deadline,
        category,
        done
      });
      return newToDo;
    } else {
      return new Error('Tarefa já existe!');
    }
  }

  async getAllTasks() {
    return await toDo.findAll();
  }

  async UserTask(id_user: number) {
    await User.findOne({ where: { id_user } })
    return await toDo.findAll();
  }
}

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
