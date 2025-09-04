import { config } from 'dotenv';
import path from 'path';

config({ path: path.join(__dirname, `../../.env.${process.env.NODE_ENV}`) });

interface IConfig {
   PORT: number;
   NODE_ENV: string;
   DB_HOST: string;
   DB_PORT: number;
   DB_USERNAME: string;
   DB_PASSWORD: string;
   DB_NAME: string;
}

export const Config: IConfig = {
   PORT: Number(process.env.PORT) || 3000,
   NODE_ENV: process.env.NODE_ENV || 'development',
   DB_HOST: process.env.DB_HOST || 'localhost',
   DB_PORT: Number(process.env.DB_PORT) || 5432,
   DB_USERNAME: process.env.DB_USERNAME || 'postgres',
   DB_PASSWORD: process.env.DB_PASSWORD || 'postgres',
   DB_NAME: process.env.DB_NAME || 'test',
};
