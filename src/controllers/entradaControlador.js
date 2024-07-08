import { entradaServicio } from "../service/entradaServicio.js";

const buscarEntradaEvento = (async (req, res) => {
    const { id } = req.params;
    try {
        const entrada = await entradaServicio.obtenerEntradaEvento([id]);
        if (!entrada.length > 0) {
            res.status(404).json({ message: 'No se encontro el evento deseado' });
        } else {
            res.status(200).json(entrada[0]);
        }
    } catch (error) {
        console.error('Error al ejecutar consulta SQL', error);
        res.status(500);
    }
})
const ModificarEntradaEvento = async (req, res) => {
    const { id } = req.params;  // Asegúrate de obtener el 'id' de 'req.params'
    const { agregarEntradas } = req.body;  // Obtener 'agregarEntradas' de 'req.body'
    try {
        const entrada = await entradaServicio.obtenerEntradaId([id]);
        if (entrada.length === 0) {  // Verifica si no hay entradas
            return res.status(404).json({ message: 'No se encontró el evento deseado' });
        }

        // Asegúrate de que 'agregarEntradas' es un número
        const agregarEntradasNumero = parseInt(agregarEntradas);
        if (isNaN(agregarEntradasNumero)) {
            return res.status(400).json({ message: 'El valor de agregarEntradas debe ser un número' });
        }

        const cantTotal = parseInt(entrada[0].cantidadTotal) + agregarEntradasNumero;
        const disponibles = cantTotal - parseInt(entrada[0].vendidas);
        console.log('CANTIDAD TOTAL: ' + cantTotal);

        const parametros = [cantTotal, disponibles, id];
        const resultado = await entradaServicio.modificarEntradas(parametros);

        if (resultado.affectedRows === 0) {
            return res.status(404).json({ message: 'No se encontró el evento deseado' });
        } else {
            return res.status(200).json({ message: 'Entrada actualizada con éxito' });
        }
    } catch (error) {
        console.error('Error al ejecutar consulta SQL', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

const comprarEntrada = async (req, res) => {
    const { id } = req.params;  // Asegúrate de obtener el 'id' de 'req.params'
    const { cantidadEntradas } = req.body;  // Obtener 'agregarEntradas' de 'req.body'

    
    try {
        const entrada = await entradaServicio.obtenerEntradaEvento([id]);
        console.log(entrada);
        if (entrada.length === 0) {  // Verifica si no hay entradas
            return res.status(404).json({ message: 'No se encontró el evento deseado' });
        }

        // Asegúrate de que 'agregarEntradas' es un número
        if (entrada[0].disponibles > 0 && cantidadEntradas <= entrada[0].disponibles) {

            const disponibles = parseInt(entrada[0].disponibles - cantidadEntradas);
            const vendidas = parseInt(entrada[0].vendidas) + parseInt(cantidadEntradas);
            const parametros = [disponibles, vendidas, entrada[0].id];
            const resultado = await entradaServicio.comprarEntradas(parametros);

            if (resultado.affectedRows === 0) {
                return res.status(404).json({ message: 'No se encontró el evento deseado' });
            } else {
                return res.status(200).json({ message: 'Entrada compradas con éxito' });
            }

        }else{
            return res.status(400).json({message: 'No hay esa cantidad de entradas disponibles'});
        }

    } catch (error) {
        console.error('Error al ejecutar consulta SQL', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

const borrarEntradaEvento = (async (req, res) => {

})





export const entradaControlador = {
    buscarEntradaEvento, ModificarEntradaEvento, borrarEntradaEvento,comprarEntrada
}