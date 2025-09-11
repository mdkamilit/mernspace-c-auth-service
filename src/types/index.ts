import type { RoleType } from './../constants/index.ts';
import type { Request } from 'express';

export interface UserData {
   firstName: string;
   lastName: string;
   email: string;
   password: string;
   role?: RoleType | undefined;
}

export interface RegisterRequest extends Request {
   body: UserData;
}
