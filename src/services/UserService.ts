import { Repository } from 'typeorm';
import { User } from '../entity/User';
import type { UserData } from '../types';
import createHttpError from 'http-errors';
import { Roles } from '../constants';

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
   }: UserData): Promise<User> {
      try {
         const user = this.userRepository.create({
            firstName,
            lastName,
            email,
            password,
            role: Roles.CUSTOMER,
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
