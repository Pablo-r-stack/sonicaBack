import express from 'express';
import { usuarioControlador } from '../controllers/usuarioControlador.js';

//
const publicRouter = express.Router();
const protectedRouter = express.Router();

//Rutas publicas
publicRouter.post('/register',usuarioControlador.registrarUsuario);
publicRouter.post('/login', usuarioControlador.login);


//Rutas privadas
protectedRouter.get('/',usuarioControlador.obtenerUsuarios);

//rutas con parametro id
protectedRouter.route('/:id')
    .get(usuarioControlador.buscarUsuarioId)
    .put(usuarioControlador.modificarUsuario)
    .delete(usuarioControlador.borrarUsuario)

protectedRouter.post('/logout', (req, res)=>{
    res
    .clearCookie('access_token')
    .json({message: 'Deslogueado con exito'})
});

export default{
    public: publicRouter,
    protected: protectedRouter
};