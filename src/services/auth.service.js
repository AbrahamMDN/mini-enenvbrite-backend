// Importación de modelo de usuario
import { User } from "../models/User.js";
import { signAccessToken, signRefreshToken } from "../utils/jwt.js";
import { AppError } from "../utils/errors.js";

// Roles permitidos
const allowedRoles = ['user','organizer','staff','admin'];

// Lógica de Función de Registro
export async function register({ name, email, password, role}) {
    const exist = await User.findOne({email});
    if (exist) throw new AppError('Email already registered', 409, 'INVALID_CREDENTIALS');
    const passwordHash = await User.hashPassword(password);
    const safeRole = (role && allowedRoles.includes(role)) ? role : undefined;
    const payload = { name, email, passwordHash, ...(safeRole ? { role: safeRole } : {}) };
    const user = await User.create(payload);
    const accessToken = signAccessToken({sub: user.id, role: user.role});
    const refreshToken = signRefreshToken({sub: user.id});
    return { user: scrub(user), accessToken, refreshToken}
}

// Lógica de Función de Inicio de Sesión
export async function login({email, password}) {
    const user = await User.findOne({email});
    if (!user) throw new AppError('Invalid credentials', 401, 'INVALID_CREDENTIALS');
    const ok = await user.checkPassword(password);
    if (!ok) throw new AppError('Invalid credentials', 401, 'INVALID_CREDENTIALS');
    const accessToken = signAccessToken({sub: user.id, role: user.role});
    const refreshToken = signRefreshToken({sub: user.id});
    return { user: scrub(user), accessToken, refreshToken}
}

// Lógica de Función de Recuperación de Información del Usuario
export async function me(userId) {
    // Devuelve la información del usuario, excepto el password hasheado 
    const user = await User.findById(userId).select('-passwordHash');
    if (!user) throw new AppError('User not found', 404, 'USER_NOT_FOUND');
    return user
}

// Lógica de Función Scrub: Devuelve datos limpios sin revelar información sensible (contraseña hasheada)
function scrub(u) {
    const { passwordHash, ...rest } = u.toObject();
    return rest;
}