import express from 'express';
import { eventoControlador } from '../controllers/eventoControlador.js';
import { checkRol } from '../middlewares/auth.js';

const publicRouter = express.Router();
const protectedRouter = express.Router();

//defino rutas

publicRouter.get('/lista', eventoControlador.obtenerEventos);
protectedRouter.post('/', checkRol('Organizador'), eventoControlador.crearEvento);
protectedRouter.get('/eventosOrganizador', eventoControlador.buscarEventosOrganizador)

protectedRouter.route('/:id')
    .get(eventoControlador.buscarEventoId)
    .put(checkRol('Organizador'), eventoControlador.modificarEvento)
    .delete(checkRol('Administrador','Organizador'), eventoControlador.eliminarEvento)

export default {
    public: publicRouter,
    protected: protectedRouter
};