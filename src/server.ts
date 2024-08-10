import express from 'express';
import cors from 'cors'
import morgan from 'morgan'
import { Request, Response, Express } from 'express';
import swaggerUi from 'swagger-ui-express'
import swaggerSpec, { swaggerUiOptions } from './config/swagger';
import db from './config/db';
import productsRoutes from './router'

const server: Express = express();

server.use(cors())
server.use(morgan('dev'))
server.use(express.json());

async function connectDB(): Promise<void> {
    try {
        await db.authenticate();
        db.sync();
        // console.log('Conexión exitosa a la base de datos ✅✅✅✅')
    } catch (error) {
        // console.log('Hubo en error ')
    }
}

connectDB();

//Routing
server.get("/", (req: Request, res: Response) => {
    res.json('Hola Mundo')
});

server.use('/api/products', productsRoutes);


//Docs 
server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUiOptions))


export default server;