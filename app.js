import express from "express";
import usuarioRouter from "./src/routes/usuarioRuta.js";
import eventoRouter from "./src/routes/eventoRuta.js";
import cors from 'cors';
import jwt from 'jsonwebtoken'
import cookieParser from "cookie-parser";

//inicializamos el servidor de express.
const app = express();
const port = 3000;

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());

const corsOptions = {
    origin: 'http://127.0.0.1:5501', // Reemplaza con el dominio permitido
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};

app.use(cors(corsOptions));

const authMiddleware = (req, res, next) => {
    const token = req.cookies.access_token;
    req.session = { user: null };

    if(!token){res.status(403).json({message: 'Prohibido'})};

        try {
            const data = jwt.verify(token, 'SECRET_KEY');
            req.session.user = data;
        } catch (error) {
            console.error('Token verification failed:', error);
        }

    next();
};

// app.use((req, res, next)=>{
//     const token = req.cookies.access_token;
//     let data = null;
//     req.session = {user: null}
//     try {
//         data = jwt.verify(token, 'SECRET_KEY')
//         req.session.user = data;
//     } catch (error) {
//         req.session.user = null;
//     }
//     next();
// })

//index por defecto
app.get('/', (req, res) => res.send('index.html'));

//rutas

app.use('/usuario', usuarioRouter.public);
app.use('/evento', eventoRouter.public);


app.use('/usuarios', authMiddleware, usuarioRouter.protected);
app.use('/eventos', authMiddleware, eventoRouter.protected);
app.listen(port, () => console.log(`Example app listening on port ${port}!`));