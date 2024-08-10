import { Sequelize } from "sequelize-typescript";
import dotenv from 'dotenv';
import { join } from 'path';


dotenv.config()

const db = new Sequelize(process.env.DATABASE_URL!, {
    models: [join(__dirname, '../models/*')],
    logging: false
})

export default db;