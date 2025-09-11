import { Roles } from './../constants/index.ts';
import { Repository } from 'typeorm';
import { User } from '../entity/User.ts';
import type { UserData } from '../types';
import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
export class UserService {
   private userRepository: Repository<User>;
   constructor(userRepository: Repository<User>) {
      this.userRepository = userRepository;
   }

   async create({
      firstName,
      lastName,
      email,
      password,
      role = Roles.CUSTOMER,
   }: UserData): Promise<User> {
      const user = await this.userRepository.findOne({
         where: { email: email },
      });
      if (user) {
         throw createHttpError(400, 'Email already exists');
      }
      const saltRounds = 10;
      const hashPassword = await bcrypt.hash(password, saltRounds);
      try {
         const user = this.userRepository.create({
            firstName,
            lastName,
            email,
            password: hashPassword,
            role,
         });

         return await this.userRepository.save(user);
      } catch (error: unknown) {
         if (error instanceof Error) {
            const error = createHttpError(
               500,
               'Failed to create user in database',
            );
            throw error;
         }
         throw new Error('Unknown error while creating user');
      }
   }
}
