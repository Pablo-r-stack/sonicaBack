import express from 'express';
import { eventoControlador } from '../controllers/eventoControlador.js';

const router = express.Router();

//defino rutas

router.get('/', eventoControlador.obtenerEventos);
router.post('/', eventoControlador.crearEvento);

router.route('/:id')

    .get(eventoControlador.buscarEventoId)
    .put(eventoControlador.modificarEvento)
    .delete(eventoControlador.eliminarEvento)


export default router;