import { toDo } from '../models/toDoModels';

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
  /*
    async UserTask(id_user: number) {
      await User.findOne({ where: { id_user } })
      return await toDo.findAll();
    }*/
}
