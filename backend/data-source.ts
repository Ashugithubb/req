import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
dotenv.config();
const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities:[],
  migrations: [__dirname + '/migrations/*.{ts,js}'],
  synchronize: false,
});
export default AppDataSource;