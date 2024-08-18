import { Sequelize } from "sequelize";
import dotenv from 'dotenv';

dotenv.config();

const db = new Sequelize(
    process.env.MYSQLDATABASE || process.env.DB_NAME,
    process.env.MYSQLUSER || process.env.DB_USER,
    process.env.MYSQLPASSWORD || process.env.DB_PASSWORD,
    {
        host: process.env.MYSQLHOST || process.env.DB_HOST,
        dialect: process.env.DB_DIALECT || 'mysql',
        port: process.env.MYSQLPORT || 3306,  // Usamos el puerto de MySQL
    }
);

export default db;
