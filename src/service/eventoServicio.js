import { ejecutarConsulta } from "../utils/queries.js";

//crud de eventos hacia base de datos.

const listarEventos = (async () => {
    // const consulta = 'SELECT * FROM evento';
    const consulta = `
    SELECT *,
            DATE_FORMAT(fecha, '%Y-%m-%d') AS fecha,
            DATE_FORMAT(hora, '%H:%i') AS hora
        FROM evento
`;
    return await ejecutarConsulta(consulta);
});

const crearEvento = (async (parametros) => {
    // INSERT INTO `sonica`.`evento` (`titulo`, `fecha`, `lugar`, `hora`, `imagen`, `descripcion`, `direccion`, `coordenadas`, `numEntradas`, `idOrganizador`) VALUES ('La Konga', '2024-09-23', 'Mendoza', '23:00', 'https://pablo-r-stack.github.io/sonica/img/foto/konga.jpg', 'Septiembre será un mes para recordar: la agrupación de cuarteto más convocante de Argentina hará temblar Mendoza al ritmo de todos los clásicos de sus dos décadas de éxitos.', 'Estadio Malvinas argentinas', 'https://www.google.com/maps?ll=-32.889664,-68.880096&z=15&t=m&hl=es-419&gl=AR&mapclient=embed&cid=7514978007226677027', '200', '12');
    const consulta = 'INSERT INTO evento (titulo, fecha, lugar, hora, imagen, descripcion, direccion, coordenadas, numEntradas, idOrganizador) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    return await ejecutarConsulta(consulta, parametros);
});

const buscarEventoId = (async (parametros) => {
    const consulta = 'SELECT * FROM evento WHERE id = ?'
    return await ejecutarConsulta(consulta, parametros);
});

const modificarEvento = (async (parametros) => {
    const consulta = 'UPDATE evento SET titulo = ?, fecha = ?, lugar = ?, hora = ?, imagen = ?, descripcion = ?, direccion = ?, coordenadas = ?, numEntradas = ?, idOrganizador = ? WHERE id = ?';
    return await ejecutarConsulta(consulta, parametros);
});

const eliminarEvento = (async (parametros) => {
    const consulta = 'DELETE FROM evento WHERE id = ?';
    return await ejecutarConsulta(consulta, parametros);
});





export const eventoServicio = {
    listarEventos, crearEvento, modificarEvento, eliminarEvento, buscarEventoId
}