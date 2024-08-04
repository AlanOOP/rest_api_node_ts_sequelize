import express from 'express';
import db from './config/db';

const server = express();


async function connectDB() {
    try {
        await db.authenticate();
        db.sync();
        console.log('Conexión exitosa a la base de datos ✅✅✅✅')
    } catch (error) {
        console.log('Hubo en error ')
    }
}

connectDB();

//Routing
server.get("/", (req, res) => {
    res.json({
        MSG: "desde GET"
    })
});

export default server;