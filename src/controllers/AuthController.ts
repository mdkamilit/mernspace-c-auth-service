import { type NextFunction, type Response } from 'express';
import type { RegisterRequest } from '../types';
import { UserService } from '../services/UserService.ts';
import { User } from '../entity/User.ts';
import type { Logger } from 'winston';
import { Roles } from '../constants/index.ts';
export class AuthController {
   private userService: UserService;
   private logger: Logger;

   constructor(userService: UserService, logger: Logger) {
      this.userService = userService;
      this.logger = logger;
   }

   async register(req: RegisterRequest, res: Response, next: NextFunction) {
      const { firstName, lastName, email, password } = req.body;
      this.logger.debug(`New request to registering user`, {
         firstName,
         lastName,
         email,
         password: '****',
         Roles,
      });

      try {
         const user: User = await this.userService.create({
            firstName,
            lastName,
            email,
            password,
         });
         this.logger.info(`User has been registered with email: ${email}`);
         res.status(200).json({ id: user.id });
      } catch (err: unknown) {
         if (err instanceof Error) {
            next(err);
         } else {
            next(new Error('Unknown error occurred'));
         }
      }
   }
}
