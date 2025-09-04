import { getRepository } from 'typeorm';
import { User } from '../entity/User';
import type { UserData } from '../types';

export class UserService {
   async create({ firstName, lastName, email, password }: UserData) {
      const userRespository = getRepository(User);
      await userRespository.save({
         firstName,
         lastName,
         email,
         password,
      });
   }
}
