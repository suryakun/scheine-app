import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import config from '../../ormconfig';

dotenv.config();
const AppDataSource: DataSource = new DataSource(config);

export default AppDataSource;
