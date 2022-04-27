import { Router, Request, Response } from "express";
import { Auth } from './auth/Auth';
import { toDoController } from "./controllers/toDoController";

const router = Router();

router.get('/', (req: Request, res: Response) => {
  return res.json({ mss: 'Hello World!' })
});

router.post('/todo', toDoController.add);
router.post('/users', toDoController.createUser);
//router.get('/todo/:id_user', toDoController.getOneToDo) // Busca as tarefas de um usuário
router.get('/login', toDoController.login);
router.get('/todo', Auth.private, toDoController.getAll); // Busca todas as tarefas - validação do JWT - Headers -> Authorization - Bearer + token gerado no login
router.get('/todo', toDoController.getAll); // Busca todas as tarefas 

export { router }