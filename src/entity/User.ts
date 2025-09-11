import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Roles } from '../constants/index.ts';

@Entity()
export class User {
   @PrimaryGeneratedColumn()
   id: number;

   @Column()
   firstName: string;

   @Column()
   lastName: string;

   @Column({ unique: true })
   email: string;

   @Column()
   password: string;

   @Column({ type: 'varchar', default: Roles.ADMIN })
   role: string;
}
