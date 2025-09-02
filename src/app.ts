import express, {
   type NextFunction,
   type Request,
   type Response,
} from 'express';
import logger from './config/logger.ts';
import type { HttpError } from 'http-errors';

const app = express();

app.get('/', (req, res) => {
   res.status(200).send('Welcome to our service');
});

//Global middleware error handler
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
   logger.error('Global error handler:', err.message);
   const statusCode = err.statusCode || 500;
   res.status(statusCode).json({
      errors: [
         {
            type: err.name,
            message: err.message,
            path: '',
            location: '',
         },
      ],
   });
});

export default app;
