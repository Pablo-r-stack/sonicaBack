import express from 'express';
import { eventoControlador } from '../controllers/eventoControlador.js';

const publicRouter = express.Router();
const protectedRouter = express.Router();

//defino rutas

publicRouter.get('/lista', eventoControlador.obtenerEventos);
protectedRouter.post('/', eventoControlador.crearEvento);
protectedRouter.get('/eventosOrganizador', eventoControlador.buscarEventosOrganizador)

protectedRouter.route('/:id')
    .get(eventoControlador.buscarEventoId)
    .put(eventoControlador.modificarEvento)
    .delete(eventoControlador.eliminarEvento)

export default {
    public: publicRouter,
    protected: protectedRouter
};