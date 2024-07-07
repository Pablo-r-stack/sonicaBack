import { ejecutarConsulta } from "../utils/queries.js";

const crearEntradaEvento = (async (parametros) => {
    // INSERT INTO `sonica`.`evento` (`titulo`, `fecha`, `lugar`, `hora`, `imagen`, `descripcion`, `direccion`, `coordenadas`, `numEntradas`, `idOrganizador`) VALUES ('La Konga', '2024-09-23', 'Mendoza', '23:00', 'https://pablo-r-stack.github.io/sonica/img/foto/konga.jpg', 'Septiembre será un mes para recordar: la agrupación de cuarteto más convocante de Argentina hará temblar Mendoza al ritmo de todos los clásicos de sus dos décadas de éxitos.', 'Estadio Malvinas argentinas', 'https://www.google.com/maps?ll=-32.889664,-68.880096&z=15&t=m&hl=es-419&gl=AR&mapclient=embed&cid=7514978007226677027', '200', '12');
    const consulta = 'INSERT INTO entrada (precio, cantidadTotal, disponibles, vendidas, eventoId) VALUES (?, ?, ?, ?, ?)';
    return await ejecutarConsulta(consulta, parametros);
});

const obtenerEntradaEvento = (async(id) =>{
    const consulta = 'SELECT * FROM entrada WHERE eventoId = ?'
    return await ejecutarConsulta(consulta, id);
})

const obtenerEntradaId = (async(id) =>{
    const consulta = 'SELECT * FROM entrada WHERE id = ?'
    return await ejecutarConsulta(consulta, id);
})

const modificarEntradas = (async(parametros) =>{
    const consulta = 'UPDATE entrada SET cantidadTotal = ?, disponibles = ? WHERE id = ?';
    return await ejecutarConsulta(consulta, parametros);

})

const comprarEntradas = (async(parametros)=>{
    const consulta = 'UPDATE entrada SET disponibles = ?, vendidas = ? WHERE id = ? ';
    return await ejecutarConsulta(consulta, parametros);
})

export const entradaServicio = {
    crearEntradaEvento, obtenerEntradaEvento, modificarEntradas, obtenerEntradaId, comprarEntradas
}
