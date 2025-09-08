import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

/* Configuración propia del JWT */

// Función de Acceso
export function signAccessToken(payload){
    return jwt.sign(payload, env.jwt.accessSecret, { expiresIn: env.jwt.accessTtl });
}

// Función de Refresh del Token 
export function signRefreshToken(payload){
    return jwt.sign(payload, env.jwt.refreshSecret, { expiresIn: env.jwt.refreshTtl });
}

// Verificación del Token de Acceso: Comparación con llave del proyecto
export function verifyAccessToken(token){
    return jwt.verify(token, env.jwt.accessSecret)
}

// Verificación del Token de Refresh
export function verifyRefreshToken(token){
    return jwt.verify(token, env.jwt.refreshSecret)
}