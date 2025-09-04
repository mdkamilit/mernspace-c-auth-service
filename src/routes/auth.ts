import express from 'express';
import { getConnection } from 'typeorm';
import { AuthController } from '../controllers/AuthController';
import { UserService } from '../services/UserService';
import { User } from '../entity/User';

const router = express.Router();

router.post('/register', async (req, res) => {
   const connection = getConnection();
   const userRepository = connection.getRepository(User);
   const userService = new UserService(userRepository);
   const authController = new AuthController(userService);

   return authController.register(req, res);
});

export default router;
