import { Sequelize } from "sequelize-typescript";
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';





dotenv.config()

const db = new Sequelize(process.env.DATABASE_URL!, {
    models: [join(__dirname, '../models/*.ts')]
})

export default db;