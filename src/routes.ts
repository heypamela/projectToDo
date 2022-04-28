import { Router, Request, Response } from "express";
import { Auth } from './auth/Auth';
import { toDoController } from "./controllers/toDoController";
import { UserController } from "./controllers/UserController"

const router = Router();

router.get('/', (req: Request, res: Response) => {
  return res.json({ mss: 'Hello World!' })
});

router.post('/todo', toDoController.add);
router.post('/users', UserController.createUser);
//router.get('/todo/:id_user', toDoController.getOneToDo) // Busca as tarefas de um usuário
router.get('/login', UserController.login);
router.get('/logout', UserController.logout);
router.get('/todo', Auth.private, toDoController.getAll); // Busca todas as tarefas - validação do JWT - Headers -> Authorization - Bearer + token gerado no login
router.get('/todo', toDoController.getAll); // Busca todas as tarefas 

export { router }