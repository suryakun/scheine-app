import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { apiKeyMiddleware } from './middlewares/apiKeyMiddleware';
import { userController } from './controllers/userController';
import AppDataSource from './db/datasource';
import morgan from 'morgan';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.use(morgan('dev'));
// Apply API key middleware to all routes
app.use(apiKeyMiddleware);

// Routes
app.use('/api/users', userController);

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Error during Data Source initialization', err);
  });
