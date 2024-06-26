
//operaciones logicas del CRUD USUARIO

//funcion clasica
// async function obtenerUsuarios(){
//     return 'TODOS LOS USUARIOS';
// }

//funcion flecha
const obtenerUsuarios = (async (req, res)=>{
    return res.send('TODOS LOS USUARIOS');
})

const registrarUsuario = ((req, res)=>{
    return res.send( 'REGISTRAR USUARIO');
})

const buscarUsuarioId = ((req, res)=>{
    const { id } = req.params;
    return res.send( 'BUSCAR POR ID' + id);
})

const modificarUsuario = ((req, res)=>{
    const { id } = req.params;
    return res.send( `MODIFICAR USUARIO CON ID ${id}`);
})

const borrarUsuario = ((req, res)=>{
    const { id } = req.params;
    return res.send( 'BORRAR USUARIO CON ID ' + id);
})





export const usuarioControlador = {
    obtenerUsuarios, registrarUsuario, buscarUsuarioId, 
    modificarUsuario, borrarUsuario
}