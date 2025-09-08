// Vinculación entre Controladores - Autorización
import { unauthorized, forbidden } from "../utils/errors.js";
import { verifyAccessToken } from "../utils/jwt.js";

// Middleware de Autorización requerida: Existencia del Header de Autorización
export function requireAuth(req, _res, next){
    const header = req.headers.authorization;
    const token = header?.startsWith('Bearer ') ? header.slice(7) : null
    if (!token) return next(unauthorized('Missing Bearer token'));
    try{
        // Si se autoriza el acceso, la información del usuario pasa a evaluarse en el controlador correspondiente
        const payload = verifyAccessToken(token);
        req.user = payload;
        next();
    }catch{
        next(unauthorized('Invalid or expired token'));
    }
}

// Middleware de Rol requerida
export function requireRole(...roles){
    return (req,_res, next) => {
        // Si no existe un rol no hay autorización de acceso
        if (!req.user) return next(unauthorized());
        // Si el rol no es el mismo que el del usuario con acceso permitido, el acceso se clasifica como prohibido
        if (!roles.includes(req.user.role)) return next(forbidden('Insufficient role'));
        next();
    }
}