// // Vinculación entre Controladores - Servicio: El controlador dirige la información al servicio correspondiente

// Importación del servicio de autorización
import * as Auth from '../services/auth.service.js'

// Función de registro
export async function register(req, res, next) {
    try {
        const result = await Auth.register(req.body);
        res.status(201).json(result);
    } catch (e) {next(e);}
}

// Función de inicio de sesión
export async function login(req, res, next) {
    try {
        const result = await Auth.login(req.body);
        res.json(result);
    } catch (e) {next(e);}
}

// Función de recuperación de información del usuario
export async function me(req, res, next) {
    try {
        const data = await Auth.me(req.user.sub);
        res.json({ user: data})
    } catch (e) {next(e);}
}