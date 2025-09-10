import { type NextFunction, type Response } from 'express';
import type { RegisterRequest } from '../types';
import { UserService } from '../services/UserService';
import { User } from '../entity/User';
import type { Logger } from 'winston';
export class AuthController {
   constructor(
      private userService: UserService,
      private logger: Logger,
   ) {
      this.userService = userService;
   }
   async register(req: RegisterRequest, res: Response, next: NextFunction) {
      const { firstName, lastName, email, password } = req.body;
      this.logger.debug(`New request to registering user `, {
         firstName,
         lastName,
         email,
         password: '****',
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
            next(err); // safe pass
         } else {
            next(new Error('Unknown error occurred'));
         }
      }
   }
}
