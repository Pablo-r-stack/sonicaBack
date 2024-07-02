import { createPool } from "mysql2/promise.js";

//seteo parametros de la base de datos
const pool = createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'sonica',
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