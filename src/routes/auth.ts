import express from 'express';
import { getConnection } from 'typeorm';
import { AuthController } from '../controllers/AuthController.ts';
import { UserService } from '../services/UserService.ts';
import { User } from '../entity/User.ts';
import logger from '../config/logger.ts';
import registerValidators from '../validators/register.validators.ts';

import type { Request, Response, NextFunction } from 'express';

const router = express.Router();

router.post(
   '/register',
   registerValidators,
   async (req: Request, res: Response, next: NextFunction) => {
      const connection = getConnection();
      const userRepository = connection.getRepository(User);
      const userService = new UserService(userRepository);
      const authController = new AuthController(userService, logger);

      return authController.register(req, res, next);
   },
);

export default router;
