import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const verificarSesion = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Usar el token del encabezado

    req.session = { user: null };

    if (!token) {
        return res.status(403).json({ message: 'Prohibido' });
    }

    try {
        const data = jwt.verify(token, process.env.JWT_SECRET);
        req.session.user = data;
        next(); // Solo llama a next() si la verificación del token es exitosa
    } catch (error) {
        console.error('Token verification failed:', error);
        return res.status(401).json({ message: 'Token inválido' }); // Envía una respuesta de error si la verificación falla
    }
};

// checkRol debe recibir el rol requerido como argumento
const checkRol = (...roles) => {
    return (req, res, next) => {
        if (req.session.user && roles.includes(req.session.user.rol)) {
            return next();
        } else {
            return res.status(403).json({ message: 'Acceso no autorizado' });
        }
    };
};

export { verificarSesion, checkRol };
