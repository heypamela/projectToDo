import dotenv from 'dotenv';
import JWT from 'jsonwebtoken';
import { Request, Response } from 'express';
import { ToDoServices, UserServices } from '../services/toDoServices';

dotenv.config();

const toDoServices = new ToDoServices();
const userServices = new UserServices();

export class toDoController {
  static async add(req: Request, res: Response) {
    const { title, deadline, category, done } = req.body;
    const createTask = { title, deadline, category, done };

    if (createTask) {
      const newTask = await toDoServices.add(title, deadline, category, done);

      if (newTask instanceof Error) {
        res.json({ error: newTask.message });
      } else {
        res.status(201);
        res.json({ id: newTask.id_to_do, done });
      }
    } else {
      res.json({ error: 'Informações não enviadas.' });
    }
  }

  static async getAll(req: Request, res: Response) {
    const list = await toDoServices.getAllTasks();
    res.json({ list });
  }

  static async createUser(req: Request, res: Response) {
    const { name, email, password } = req.body;
    const createUser = { name, email, password };

    if (createUser) {
      const newUser = await userServices.createUserService(name, email, password);
      const token = JWT.sign(
        { newUser },
        process.env.JWT_TOKEN as string,
        { expiresIn: '1h' }
      )


      if (newUser instanceof Error) {
        res.json({ error: newUser.message });
      } else {
        res.status(201).json({ id: newUser.id_user, name, email, token });
      }
    } else {
      res.json({ error: 'Informações não enviadas.' });
    }
  }


  static async login(req: Request, res: Response) {
    if (req.body.email && req.body.password) {
      const { email, password } = req.body;

      const user = await userServices.getEmail(email);
      const validatePassword = await userServices.matchPassword(password, user?.password as string);

      if (user && validatePassword) {
        const token = JWT.sign(
          { id: user.id_user, email: user.email },
          process.env.JWT_TOKEN as string,
          { expiresIn: '1h' }
        )
        res.json({ status: true, token });
        return;
      }
    }
    res.json({ status: false });
  }
}