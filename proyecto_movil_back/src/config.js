import { config } from 'dotenv';

config();
export default {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  dbuser: process.env.DB_USER || 'root',
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  dbPort: process.env.DB_PORT,
};

export { config };
