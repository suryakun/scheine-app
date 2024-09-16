import { DataSourceOptions } from 'typeorm';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables from .env file
dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const config: DataSourceOptions & { seeds: string[] } = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [path.join(__dirname, './src/db/entities/**/*.ts')],
  migrations: [path.join(__dirname, './src/db/migrations/**/*.ts')],
  seeds: [path.join(__dirname, './src/db/seeds/**/*.ts')],
  synchronize: true,
  logging: process.env.NODE_ENV !== 'production',
  extra: {
    ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
  },
};

export default config;
