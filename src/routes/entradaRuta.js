import express from 'express';
import { entradaControlador } from '../controllers/entradaControlador.js';
import { checkRol } from '../middlewares/auth.js';

const publicRouter = express.Router();
const protectedRouter = express.Router();

//defino rutas

publicRouter.get('/:id', entradaControlador.buscarEntradaEvento);

protectedRouter.put('/compra/:id',checkRol('Cliente'), entradaControlador.comprarEntrada);

protectedRouter.route('/org/:id')
    .put(checkRol('Organizador'), entradaControlador.ModificarEntradaEvento)
    .delete()

export default {
    public: publicRouter,
    protected: protectedRouter
};