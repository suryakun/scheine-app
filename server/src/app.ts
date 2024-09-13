import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { apiKeyMiddleware } from './middlewares/apiKeyMiddleware';
import { userController } from './controllers/userController';
import AppDataSource from './db/datasource';
import morgan from 'morgan';
import { doctorController } from './controllers/doctorController';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.use(morgan('dev'));
app.use(apiKeyMiddleware);

// Routes
app.use('/api/users', userController);
app.use('/api/doctors', doctorController);

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
