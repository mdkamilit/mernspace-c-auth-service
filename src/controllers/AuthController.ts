import { type Response } from 'express';
import type { RegisterRequest } from '../types';
import { UserService } from '../services/UserService';

export class AuthController {
   constructor(private userService: UserService) {
      this.userService = userService;
   }
   async register(req: RegisterRequest, res: Response) {
      const { firstName, lastName, email, password } = req.body;
      await this.userService.create({ firstName, lastName, email, password });

      res.status(200).json();
   }
}
