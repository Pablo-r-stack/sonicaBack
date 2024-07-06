import { eventoServicio } from "../service/eventoServicio.js";

// function obtenerEventos() {
//     return 'obteniendo todos los eventos';
// }
const obtenerEventos = (async (req, res) => {
    try {
        const eventos = await eventoServicio.listarEventos();
        if(!eventos.length>0){
            res.status(404)({message: 'No se encontraron eventos'});
        }else{
            res.status(200).json(eventos);
        }
    } catch (error) {
        console.error('Error al ejecutar consulta SQL', error);
        res.sendStatus(500);
    }
});

const crearEvento = (async(req, res) => {
    try {
        const {titulo, fecha, lugar, hora, imagen, descripcion, direccion, coordenadas, numEntradas, idOrganizador} = req.body;
        const parametros = [titulo, fecha, lugar, hora, imagen, descripcion, direccion, coordenadas, numEntradas, idOrganizador];
        const evento = await eventoServicio.crearEvento(parametros);
        res.status(201).json({message: 'Evento creado con exito '  + evento.insertId});
    } catch (error) {
        console.error('Error al ejecutar consulta SQL', error);
        res.sendStatus(500);
    }
});

const buscarEventoId = (async(req, res) => {
    const { id } = req.params;
    try {
        const evento = await eventoServicio.buscarEventoId([id]);
        if(! evento.length > 0){
            res.status(404).json({message: 'No se encontro el evento deseado'});
        }else{
            res.status(200).json(evento);
        }
    } catch (error) {
        console.error('Error al ejecutar consulta SQL', error);
        res.sendStatus(500);
    }
});

const buscarEventosOrganizador = (async(req, res) => {
    const { id } = req.session.user;
    console.log('Obteniendo datos del usuario id ' + id);
    try {
        const evento = await eventoServicio.listaEventosOrganizador([id]);
        if(! evento.length > 0){
            res.status(404).json({message: 'No se encontro el evento deseado'});
        }else{
            res.status(200).json(evento);
        }
    } catch (error) {
        console.error('Error al ejecutar consulta SQL', error);
        res.status(500);
    }
});

const modificarEvento = (async(req, res) => {
    const { id } = req.params;
    const {titulo, fecha, lugar, hora, imagen, descripcion, direccion, coordenadas, numEntradas, idOrganizador} = req.body;
        const parametros = [titulo, fecha, lugar, hora, imagen, descripcion, direccion, coordenadas, numEntradas, idOrganizador, id];
    try {
        const resultado = await eventoServicio.modificarEvento(parametros);
        if(!resultado.affectedRows === 0){
            res.status(404).json({message: 'No se encontro el evento deseado'})
        }else{
            res.status(200).json({message: 'Evento actualizado con exito'});
        }
    } catch (error) {
        console.error('Error al ejecutar consulta SQL', error);
        res.sendStatus(500);
    }
});

const eliminarEvento = (async(req, res) => {
    const { id } = req.params;
    try {
        const resultado = await eventoServicio.eliminarEvento([id]);
        if(!resultado.affectedRows === 0){
            res.send(404).json({message:'No se encontro el usuario a borrar'});
        }else{
            res.status(200).json({message: 'Evento Borrado con exito'});
        }
    } catch (error) {
        console.error('Error al ejecutar consulta SQL', error);
        res.sendStatus(500);
    }
});

export const eventoControlador = {
    obtenerEventos, crearEvento, modificarEvento, buscarEventoId, eliminarEvento, buscarEventosOrganizador
};

