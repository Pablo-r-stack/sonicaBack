import { createPool } from "mysql2/promise.js";
import dotenv from 'dotenv';

dotenv.config();

//seteo parametros de la base de datos
const pool = createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: 5,
    waitForConnections: true,
    queueLimit: 0
});

pool.getConnection()
    .then(connection => {
        pool.releaseConnection(connection);
        console.log('Conectado a la base de datos');
    })
    .catch(error => console.error('No se ha podido conectar a la base de datos: ', error));

export default pool;