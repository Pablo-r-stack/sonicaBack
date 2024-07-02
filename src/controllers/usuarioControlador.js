import { usuarioServicio } from "../service/usuarioServicio.js";
import jwt from "jsonwebtoken";
//operaciones logicas del CRUD USUARIO

//funcion clasica
// async function obtenerUsuarios(){
//     return 'TODOS LOS USUARIOS';
// }

//funcion flecha
const obtenerUsuarios = (async (req, res) => {
    try {
        const usuarios = await usuarioServicio.listarUsuarios();
        if (!usuarios.length > 0) {
            res.status(404).json({ message: 'No se encontraron usuarios' });
        } else {
            res.status(200).json(usuarios);
        }
    } catch (error) {
        console.error('Error al ejecutar consulta SQL', error);
        res.sendStatus(500);
    }
});

const registrarUsuario = (async (req, res) => {
    try {
        //Desestructurar el formulario en variables.

        const resultado = await usuarioServicio.registrarUsuario(req.body);
        res
            .status(201)
            .json({ message: 'Usuario creado exitosamente: ' + resultado.insertId });
    } catch (error) {
        console.error('Error al ejecutar consulta SQL', error);
        res.status(500).json(error.message);
    }
});

const buscarUsuarioId = (async (req, res) => {
    const { id } = req.params;
    try {
        const resultado = await usuarioServicio.buscarUsuarioporId([id]);

        if (!resultado.length > 0) {
            res.status(404).json({ message: 'No se encontro el usuario deseado' });
        } else {
            res.status(200).json(resultado);
        }
    } catch (error) {
        console.error('Error al ejecutar consulta SQL', error);
        res.sendStatus(500);
    }
});

const modificarUsuario = (async (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, email, pais, dni, tipo } = req.body;
    const parametros = [nombre, apellido, email, pais, dni, tipo, id];
    try {
        const resultado = usuarioServicio.modificarUsuario(parametros);

        if (!resultado.affectedRows === 0) {
            res.status(404).json({ message: 'No se encontro el usuario deseado' });
        } else {
            res.status(200).json({ message: 'Usuario actualizado con exito' });
        }
    } catch (error) {
        console.error('Error al ejecutar consulta SQL', error);
        res.sendStatus(500);
    }
});

const borrarUsuario = (async (req, res) => {
    const { id } = req.params;
    try {
        const resultado = usuarioServicio.borrarUsuario([id]);

        if (resultado.affectedRows === 0) {
            res.status(404).json({ message: 'No se encontro el usuario a borrar' });
        } else {
            res.status(200).json({ message: 'Usuario Borrado exitosamente' });
        }
    } catch (error) {
        console.error('Error al ejecutar consulta SQL', error);
        res.sendStatus(500);
    }
});

const login = async (req, res) => {
    try {
        const usuario = await usuarioServicio.login(req.body);
        if (!usuario) {
            res.status(404).json({ message: "Usuario o contraseña inválidos" });
        } else {
            const token = jwt.sign({ id: usuario.id, nombre: usuario.nombre, email: usuario.email }, "SECRET_KEY",
                {
                    expiresIn: '1h'
                });

            res.cookie('access_token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'Lax',
                maxAge: 1000 * 60 * 60 // 1 hora de duración
            });

            console.log('Login exitoso');
            return res.status(200).json({access_token: token});
        }
    } catch (error) {
        console.error('Error al ejecutar consulta SQL', error);
        res.sendStatus(500);
    }
};




export const usuarioControlador = {
    obtenerUsuarios, registrarUsuario, buscarUsuarioId,
    modificarUsuario, borrarUsuario, login
};