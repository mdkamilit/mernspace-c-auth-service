import express from 'express';
import { getConnection } from 'typeorm';
import { AuthController } from '../controllers/AuthController';
import { UserService } from '../services/UserService';
import { User } from '../entity/User';
import logger from '../config/logger';

const router = express.Router();

router.post('/register', async (req, res, next) => {
   const connection = getConnection();
   const userRepository = connection.getRepository(User);
   const userService = new UserService(userRepository);
   const authController = new AuthController(userService, logger);

   return authController.register(req, res, next);
});

export default router;
