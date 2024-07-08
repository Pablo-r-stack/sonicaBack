import express from 'express';
import { usuarioControlador } from '../controllers/usuarioControlador.js';
import { usuarioServicio } from '../service/usuarioServicio.js';
import { checkRol } from '../middlewares/auth.js';
//
const publicRouter = express.Router();
const protectedRouter = express.Router();

//Rutas publicas
publicRouter.post('/register', usuarioControlador.registrarUsuario);
publicRouter.post('/login', usuarioControlador.login);


//Rutas privadas
protectedRouter.get('/lista', checkRol('Administrador'), usuarioControlador.obtenerUsuarios);
protectedRouter.get('/datosSesion', async (req, res) => {
    const publicUsuario = await usuarioServicio.buscarUsuarioporId(req.session.user.id);
    delete publicUsuario[0].password;
    console.log(publicUsuario);
    return res.json(publicUsuario[0]);
})



protectedRouter.put('/modificarRol', checkRol('Administrador'), usuarioControlador.modificarRol);
protectedRouter.post('/cambiarPass', usuarioControlador.cambiarPass);

protectedRouter.post('/logout', (req, res) => {
    res
    .clearCookie('access_token')
    .json({ message: 'Deslogueado con exito' })
});

//rutas con parametro id
protectedRouter.route('/:id')
.get(usuarioControlador.buscarUsuarioId)
.put(usuarioControlador.modificarUsuario)
.delete(checkRol('Administrador'), usuarioControlador.borrarUsuario)

export default {
    public: publicRouter,
    protected: protectedRouter
};