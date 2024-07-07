import express from 'express';
import { entradaControlador } from '../controllers/entradaControlador.js';

const publicRouter = express.Router();
const protectedRouter = express.Router();

//defino rutas

publicRouter.get('/:id', entradaControlador.buscarEntradaEvento);

protectedRouter.put('/compra/:id', entradaControlador.comprarEntrada);

protectedRouter.route('/org/:id')
    .put(entradaControlador.ModificarEntradaEvento)
    .delete()

export default {
    public: publicRouter,
    protected: protectedRouter
};