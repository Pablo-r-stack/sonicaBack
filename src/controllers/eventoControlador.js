// function obtenerEventos() {
//     return 'obteniendo todos los eventos';
// }

const obtenerEventos = ((req, res) => {
    res.send('obteniendo todos los eventos');
})

const crearEvento = ((req, res) => {
    res.send('creando un evento');
})

const buscarEventoId = ((req, res) => {
    const { id } = req.params;
    return res.send('busco evento por id ' + id)
})
const modificarEvento = ((req, res) => {
    const { id } = req.params;
    return res.send('modificando el evento por id ' + id)
})

const eliminarEvento = ((req, res) => {
    const { id } = req.params;
    return res.send('eliminado evento por id ' + id)
})

export const eventoControlador = {
    obtenerEventos, crearEvento, modificarEvento, buscarEventoId, eliminarEvento
}

