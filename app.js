import express from "express";
import usuarioRouter from "./src/routes/usuarioRuta.js";

//inicializamos el servidor de express.
const app = express();
const port = 3000;

//middlewares
app.use(express.json());

//index por defecto
app.get('/', (req, res) => res.send('Hello World!'));

//rutas
app.use('/usuarios', usuarioRouter);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));