import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { User } from '../entity/User';
import { Config } from '.';

if (
   !Config.DB_HOST ||
   !Config.DB_PORT ||
   !Config.DB_USERNAME ||
   !Config.DB_PASSWORD ||
   !Config.DB_NAME
) {
   throw new Error(
      'Database configuration is incomplete. Please check your environment variables.',
   );
}

createConnection({
   type: 'postgres',
   host: Config.DB_HOST,
   port: Config.DB_PORT,
   username: Config.DB_USERNAME,
   password: Config.DB_PASSWORD,
   database: Config.DB_NAME,
   entities: [User],
   //dont use synchronize in production - may lose data
   //use migrations instead
   synchronize: Config.NODE_ENV == 'test' || Config.NODE_ENV == 'dev',
   logging: true,
})
   .then(() => {
      console.log('Database connected');
   })
   .catch((error) => console.error(error));
