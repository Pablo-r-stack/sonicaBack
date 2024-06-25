import express from 'express';
import { usuarioControlador } from '../controllers/usuarioControlador.js';

//
const router = express.Router();

//defino rutas
router.get('/',usuarioControlador.obtenerUsuarios);
router.post('/',usuarioControlador.registrarUsuario);

//rutas con parametro id
router.route('/:id')

    .get(usuarioControlador.buscarUsuarioId)
    .put(usuarioControlador.modificarUsuario)
    .delete(usuarioControlador.borrarUsuario)

export default router;