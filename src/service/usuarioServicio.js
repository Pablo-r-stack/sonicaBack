import { ejecutarConsulta } from "../utils/queries.js";
import bcrypt from 'bcrypt';

const listarUsuarios = (async () => {
    const consulta = 'SELECT * FROM usuario';

    return await ejecutarConsulta(consulta);
})

const registrarUsuario = (async (body) => {
    // const [result] = await connection.query('INSERT INTO usuarios SET ?', [
    //     req.body
    //   ]);
    try{

        let { nombre, apellido, email, password, pais, dni, rol } = body;
        if (rol == null) rol = 'Cliente';
        const usuario = await buscarUsuarioporEmail([email]);
        
        if (usuario) throw new Error('El email ingresado ya se encuentra registrado, intenta otra vez');
        
        const hashedPassword = await bcrypt.hash(password, 10);
        const parametros = [nombre, apellido, email, hashedPassword, pais, dni, rol];
        const consulta = 'INSERT INTO usuario (nombre, apellido, email, password, pais, dni, rol ) VALUES (?, ?, ?, ?, ?, ?, ?)';
        return await ejecutarConsulta(consulta, parametros);
    }catch(error){
        throw new Error(error.message);
    }
})

const buscarUsuarioporId = (async (parametros) => {
    const consulta = 'SELECT * FROM usuario WHERE id = ?';
    return await ejecutarConsulta(consulta, parametros);
})
const buscarUsuarioporEmail = (async (parametros) => {
    const consulta = 'SELECT * FROM usuario WHERE email = ?';
    return await ejecutarConsulta(consulta, parametros);
})

const modificarUsuario = (async (parametros) => {
    const consulta = 'UPDATE usuario SET nombre = ?, apellido = ?, email = ?, pais = ?, dni = ?, tipo = ? WHERE id = ?';
    return await ejecutarConsulta(consulta, parametros);
})

const borrarUsuario = (async (parametros) => {
    const consulta = 'DELETE FROM usuario WHERE id = ?';
    return await ejecutarConsulta(consulta, parametros);
})

const login = (async (body) => {
    try {
        const { email, password } = body;
        const usuario = await buscarUsuarioporEmail([email]);
        if (!usuario) throw new Error('Usuario o contraseña invalidos');
        const passValid = await bcrypt.compareSync(password, usuario[0].password);
        if (!passValid) throw new Error('Usuario o contraseña incorrectos');

        const usuarioPublic = {
            id: usuario[0].id,
            nombre: usuario[0].nombre,
            email: usuario[0].email
        };

        return usuarioPublic
    } catch (error) {
        throw new Error(error.message);
    }

})

export const usuarioServicio = {
    listarUsuarios, registrarUsuario, buscarUsuarioporId, modificarUsuario, borrarUsuario, login
}