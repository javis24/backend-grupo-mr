import { Sequelize } from "sequelize";
import dotenv from 'dotenv';

dotenv.config();

const db = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
        port: process.env.APP_PORT,  // Asegúrate de incluir el puerto si es necesario
    }
);

export default db;
