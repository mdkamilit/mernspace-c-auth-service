import app from './app.ts';
import { Config } from './config/index.ts';

const startServer = () => {
   const PORT = Config.PORT || 3000;
   try {
      app.listen(PORT, () => {
         console.log(` Server is running on port ${PORT}`);
      });
   } catch (error) {
      console.error('Failed to start server:', error);
      process.exit(1);
   }
};

startServer();
