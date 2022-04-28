import { Request, Response } from 'express';
import { ToDoServices } from '../services/toDoServices';

const toDoServices = new ToDoServices();

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
}