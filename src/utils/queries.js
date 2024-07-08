import pool from "../config/db.js";

const ejecutarConsulta  = async (consulta, parametros) =>{
    try {
        const conexion = await pool.getConnection();
        let resultados;

        if (parametros) {
            [resultados] = await conexion.query(consulta, parametros);
        } else {
            [resultados] = await conexion.query(consulta);
        }

        conexion.release();
        return resultados;
    } catch (error) {
        console.error('Ocurrió un error al ejecutar la consulta SQL', error);
        throw error;
    }
};

export {ejecutarConsulta} ;