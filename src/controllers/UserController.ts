import dotenv from 'dotenv';
import JWT from 'jsonwebtoken';
import { Request, Response } from 'express';
import { UserServices } from "../services/UserServices";


dotenv.config();
const userServices = new UserServices();


export class UserController {
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

  static async logout(req: Request, res: Response) {
    const token = req.headers.token;
    if (token) {
      res.cookie('token', null, { httpOnly: true });
    } else {
      res.status(401).send("Logout não autorizado!");
    }
    res.json({ status: false, token });
    console.log(token, "Sessão finalizada");
  }
}